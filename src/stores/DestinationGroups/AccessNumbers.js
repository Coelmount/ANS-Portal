import { decorate, observable, action, computed } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import { toJS } from 'mobx'

export class AccessNumbers {
  mainNumber = null
  secondaryNumbers = []
  availableNumbers = []
  countries = []
  isMainNumberLoading = true
  isSecondaryNumbersLoading = true
  isAvailableNumbersLoading = true
  totalPages = 0
  currentGroupId = ''

  getMainNumber = ({ customerId, groupId, destinationGroupName }) => {
    this.accessNumbers = []
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
            this.secondaryNumbers = numbers.map(({ phoneNumber }) => {
              return {
                value: phoneNumber,
                country: getCountryNameFromNumber(phoneNumber)
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
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${rowsPerPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=advanced&country_code=${countryCodeField}`
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

  deleteSecondaryNumber = () => {
    console.log('del access')
  }

  postSecondaryNumbers = ({ customerId, groupId }) => {
    // this.isSecondaryNumbersLoading = true
    const checkedNumbers = this.availableNumbers.filter(
      item => item.checked === true
    )
    const numbersToAdd = checkedNumbers.map(
      ({ id, country_code, nsn }, index) => {
        return {
          id,
          cc_number: country_code,
          number: nsn
        }
      }
    )
    console.log(toJS(numbersToAdd), 'checkedNumbers')
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/secondary_numbers`,
        {
          secondary_numbers: numbersToAdd
        }
      )
      .then(res => {
        const numbers = res.data.secondaryNumbers
        this.secondaryNumbers = numbers.map(({ phoneNumber }) => {
          return {
            value: phoneNumber,
            country: getCountryNameFromNumber(phoneNumber)
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch secondary numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // this.isSecondaryNumbersLoading = false
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
  getMainNumber: action,
  getSecondaryNumbers: action,
  getAvailableNumbers: action,
  deleteSecondaryNumber: action,
  postSecondaryNumbers: action
})

export default new AccessNumbers()
