import { decorate, observable, action, computed } from 'mobx'
import difference from 'lodash/difference'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import getCountryCodeFromNumber from 'utils/phoneNumbers/getCountryCodeFromNumber'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'
import DEFAULT_IDS from './utils/defaultIds'
import { toJS } from 'mobx'

export class AccessNumbers {
  mainNumber = null
  secondaryNumbers = []
  availableNumbers = []
  countries = []
  isMainNumberLoading = true
  isSecondaryNumbersLoading = true
  isAvailableNumbersLoading = true
  isSecondaryNumbersAdding = false
  isSecondaryNumberDeleting = false
  isAccessNumbersLoading = true
  isUpdatingMainNumber = false
  totalPages = 0
  currentGroupId = ''
  availableSecondaryIds = []

  clearLoadingStates = () => {
    this.isAvailableNumbersLoading = true
  }

  getMainNumber = ({ customerId, groupId, destinationGroupName }) => {
    this.mainNumber = null
    this.isMainNumberLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/main_number`
          )
          .then(res => {
            const number = res.data.mainNumber
            this.mainNumber = {
              country_code: `+${getCountryCodeFromNumber(number)}`,
              nsn: getNsnFromNumber(number),
              value: number,
              country: getCountryNameFromNumber(number)
            }
          })
          .catch(e => {
            SnackbarStore.enqueueSnackbar({
              message: getErrorMessage(e) || 'Failed to fetch access numbers',
              options: {
                variant: 'error'
              }
            })
          })
          .finally(() => {
            this.isMainNumberLoading = false
          })
      })
  }

  getSecondaryNumbers = ({ customerId, groupId, destinationGroupName }) => {
    this.secondaryNumbers = []
    this.isSecondaryNumbersLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )
        this.currentGroupId = currentGroup.ans_id

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/secondary_numbers`
          )
          .then(res => {
            const numbers = res.data.secondaryNumbers
            const busySecondaryIds = numbers.map(number => number.id)
            this.availableSecondaryIds = difference(
              DEFAULT_IDS,
              busySecondaryIds
            )

            this.secondaryNumbers = numbers.map(item => {
              return {
                ...item,
                value: item.phoneNumber,
                country: getCountryNameFromNumber(item.phoneNumber)
              }
            })
          })
          .catch(e => {
            SnackbarStore.enqueueSnackbar({
              message:
                getErrorMessage(e) || 'Failed to fetch secondary numbers',
              options: {
                variant: 'error'
              }
            })
          })
          .finally(() => {
            this.isSecondaryNumbersLoading = false
          })
      })
  }

  getAvailableNumbers = ({
    customerId,
    groupId,
    page,
    rowsPerPage,
    orderBy,
    order,
    countryCode
  }) => {
    this.availableNumbers = []
    this.isAvailableNumbersLoading = true

    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = 'nsn'
        break
      }
      case 'type': {
        orderByField = 'type'
        break
      }
      default: {
        orderByField = 'id'
      }
    }
    const orderField = order || 'asc'
    const countryCodeField = countryCode.length
      ? countryCode.replace('+', '%2B')
      : ''

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${rowsPerPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=advanced&in_use=false&country_code=${countryCodeField}`
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult.map(item => {
          return {
            ...item,
            phoneNumber: `${item.country_code} ${item.nsn}`,
            checked: false,
            hover: false
          }
        })

        this.availableNumbers = transformedNumbers
        this.totalPages = pagination[2]

        const countryCodes = requestResult.map(item => item.country_code)
        const uniqueCountryCodes = [...new Set(countryCodes)]
        this.countries = uniqueCountryCodes.map(countryCode => {
          return {
            phone: countryCode,
            code: getCountryTwoLetterCodeFromNumber(`${countryCode}11111`),
            label: getCountryNameFromNumber(`${countryCode}11111`)
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch available to add numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAvailableNumbersLoading = false
      })
  }

  postSecondaryNumbers = ({ customerId, groupId, closeModal, numbers }) => {
    this.isSecondaryNumbersAdding = true
    const checkedNumbers = numbers.filter(item => item.checked === true)

    const numbersToAdd = checkedNumbers.map(({ country_code, nsn }, index) => {
      return {
        id: this.availableSecondaryIds[index],
        cc_number: country_code,
        number: nsn
      }
    })

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/secondary_numbers`,
        {
          secondary_numbers: numbersToAdd
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: `Secondary number${
            numbersToAdd.length > 1 ? 's' : ''
          } added successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to add secondary number${
              numbersToAdd.length > 1 ? 's' : ''
            }`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isSecondaryNumbersAdding = false
      })
  }

  putUpdateMainNumber = (customerId, groupId, data, callback) => {
    this.isUpdatingMainNumber = true
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/main_number/`,
        data
      )
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: `Main number updated successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update main number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingMainNumber = false
      })
  }

  deleteSecondaryNumber = ({
    customerId,
    groupId,
    secondaryNumberId,
    closeModal
  }) => {
    this.isSecondaryNumberDeleting = true
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/secondary_numbers`,
        {
          secondary_numbers: [
            {
              id: secondaryNumberId,
              delete: true
            }
          ]
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Secondary number successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete secondary number',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isSecondaryNumberDeleting = false
      })
  }
}

decorate(AccessNumbers, {
  mainNumber: observable,
  secondaryNumbers: observable,
  availableNumbers: observable,
  totalPages: observable,
  countries: observable,
  isMainNumberLoading: observable,
  isSecondaryNumbersLoading: observable,
  isAvailableNumbersLoading: observable,
  isSecondaryNumbersAdding: observable,
  isSecondaryNumberDeleting: observable,
  isAccessNumbersLoading: observable,
  isUpdatingMainNumber: observable,
  getMainNumber: action,
  getSecondaryNumbers: action,
  getAvailableNumbers: action,
  deleteSecondaryNumber: action,
  postSecondaryNumbers: action,
  clearLoadingStates: action,
  putUpdateMainNumber: action
})

export default new AccessNumbers()
