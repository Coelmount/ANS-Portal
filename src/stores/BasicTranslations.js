import { decorate, observable, action, computed } from 'mobx'
import set from 'lodash/set'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import types from 'utils/types/basicSearchParams'

const { NUMBER_LIKE, COUNTRY_CODE } = types

export class BasicTranslations {
  step = 1
  selectedPhoneNumber = null
  selectedInstance = null
  isBasicTranslationsNumbersLoading = true
  isAvailableNumbersForAddInstanceLoading = false
  isPostingInstance = false
  isPuttingInstance = false
  basicTranslationsNumbers = []
  multipleCounter = { success: 0, refused: 0, error: 0, total: 0, count: 0 }
  successAdded = []
  refusedAdded = []
  errorAdded = []
  totalPagesAvailableNumbers = 0
  availableNumbersForAddInstance = []
  isRedirectAfterPut = false
  isDeleting = false
  amountOfBasicInstances = 0
  searchParam = NUMBER_LIKE

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.selectedPhoneNumber = null
    this.multipleCounter = {
      success: 0,
      refused: 0,
      error: 0,
      total: 0,
      count: 0
    }
    this.successAdded = []
    this.refusedAdded = []
    this.errorAdded = []
    this.searchParam = NUMBER_LIKE
  }

  updateSelectedPhoneNumber = number => {
    this.selectedPhoneNumber = number
  }

  postInstance = (
    customerId,
    groupId,
    destinationCode,
    destinationNsn,
    closeModal
  ) => {
    this.isPostingInstance = true
    const accessCode = this.selectedPhoneNumber.country_code
    const accessNumber = this.selectedPhoneNumber.nsn
    const destinationCodeWithPlus = `+${destinationCode}`

    axios
      .post(`tenants/${customerId}/groups/${groupId}/services/ans_basic`, {
        cc_access_number: accessCode,
        access_number: accessNumber,
        cc_destination_number: destinationCodeWithPlus,
        destination_number: destinationNsn
      })
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: `${accessCode} ${accessNumber} => ${destinationCodeWithPlus} ${destinationNsn} ANS basic instance added successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to add ANS basic instance`,
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isPostingInstance = false
      })
  }

  updateSelectedInstance = instance => {
    this.selectedInstance = instance
  }

  putInstance = (
    customerId,
    groupId,
    ansId,
    destinationCode,
    destinationNsn
  ) => {
    this.isPuttingInstance = true
    const destinationCodeWithPlus = `+${destinationCode}`
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_basic/${ansId}`,
        {
          cc_destination_number: destinationCodeWithPlus,
          destination_number: destinationNsn
        }
      )
      .then(() => {
        this.isRedirectAfterPut = true
        SnackbarStore.enqueueSnackbar({
          message: 'ANS instance edited successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to edit ANS instance',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isPuttingInstance = false
      })
  }

  clearIsRedireactAfterPut = () => {
    this.isRedirectAfterPut = false
  }

  getBasicTranslationsNumbers = (customerId, groupId) => {
    this.isBasicTranslationsNumbersLoading = true
    this.amountOfBasicInstances = 0
    this.basicTranslationsNumbers = []
    return axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_basic`)
      .then(res => {
        const basicInstances = res.data.ans_basic
        const validBasicInstances = basicInstances.filter(
          basicInstance => basicInstance
        )
        this.amountOfBasicInstances = validBasicInstances.length

        const transformedNumbers = validBasicInstances.map((item, index) => {
          return {
            id: item.id || index,
            checked: false,
            hover: false,
            enabled: true,
            accessCountry:
              item.access_number &&
              getCountryNameFromNumber(
                item.access_number[0] === '+'
                  ? item.access_number
                  : `+${item.access_number}`
              ),
            destinationCountry:
              item.destination_number &&
              getCountryNameFromNumber(
                item.destination_number[0] === '+'
                  ? item.destination_number
                  : `+${item.destination_number}`
              ),
            destinationCountryTwoLetterCode:
              item.destination_number &&
              getCountryTwoLetterCodeFromNumber(
                item.destination_number[0] === '+'
                  ? item.destination_number
                  : `+${item.destination_number}`
              ),
            ...item
          }
        })
        this.basicTranslationsNumbers = transformedNumbers
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch basic translations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isBasicTranslationsNumbersLoading = false))
  }

  clearBasicNumbers = () => {
    this.basicTranslationsNumbers = []
  }

  postAddMultipleANSBasic = (tenantId, groupId, data) => {
    this.errorAdded = []
    this.successAdded = []
    this.refusedAdded = []
    this.multipleCounter.success = 0
    this.multipleCounter.error = 0
    this.multipleCounter.count = 0
    axios
      .post(`/tenants/${tenantId}/groups/${groupId}/services/ans_basic`, data)
      .then(res => {
        this.setMultipleCounter('success', this.multipleCounter.success + 1)
        if (res.data.status === 'success') {
          this.successAdded = [...this.successAdded, data]
        } else if (res.data.status === 'error') {
          this.refusedAdded = [...this.refusedAdded, data]
        }
      })
      .catch(e => {
        this.setMultipleCounter('error', this.multipleCounter.error + 1)
        this.errorAdded = [
          ...this.errorAdded,
          { ...data, errorMessage: getErrorMessage(e) }
        ]
      })
      .finally(() => {
        this.setMultipleCounter('count', this.multipleCounter.count + 1)
      })
  }

  putUpdateMultipleANSBasic = (tenantId, groupId, ans_id, data, accessObj) => {
    this.errorAdded = []
    this.successAdded = []
    this.refusedAdded = []
    this.multipleCounter.success = 0
    this.multipleCounter.error = 0
    this.multipleCounter.count = 0
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ans_basic/${ans_id}`,
        data
      )
      .then(res => {
        this.setMultipleCounter('success', this.multipleCounter.success + 1)
        if (res.data.status === 'success') {
          this.successAdded = [
            ...this.successAdded,
            { ...accessObj, ...data, ans_id: ans_id }
          ]
        } else if (res.data.status === 'error') {
          this.refusedAdded = [
            ...this.refusedAdded,
            { ...accessObj, ...data, ans_id: ans_id }
          ]
        }
      })
      .catch(e => {
        this.setMultipleCounter('error', this.multipleCounter.error + 1)
        this.errorAdded = [
          ...this.errorAdded,
          { ...accessObj, ...data, ans_id, errorMessage: getErrorMessage(e) }
        ]
      })
      .finally(() => {
        this.setMultipleCounter('count', this.multipleCounter.count + 1)
      })
  }

  deleteANSBasic = (tenantId, groupId, idArr, callback) => {
    this.isDeleting = true
    let promiseArr = []
    idArr.forEach(el => {
      promiseArr.push(
        axios.delete(
          `/tenants/${tenantId}/groups/${groupId}/services/ans_basic/${el}`
        )
      )
    })

    Promise.all(promiseArr)
      .then(() => {
        this.isRedirectAfterPut = true
        SnackbarStore.enqueueSnackbar({
          message: `Translation${
            idArr.length > 1 ? 's' : ''
          } deleted successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to delete translation${idArr.length > 1 ? 's' : ''}`,
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        if (callback) callback()
        this.isDeleting = false
      })
  }

  setMultipleCounter = (variable, value) => {
    set(this.multipleCounter, variable, value)
  }

  getAvailableNumbersForAddInstance = (
    customerId,
    groupId,
    page,
    perPage,
    orderBy,
    order,
    query
  ) => {
    if (this.isAvailableNumbersForAddInstanceLoading) return

    this.isAvailableNumbersForAddInstanceLoading = true
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
    const queryField = query || ''
    const searchValue =
      this.searchParam === COUNTRY_CODE && queryField.length > 1
        ? queryField.replace('+', '%2B')
        : queryField

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=basic&in_use=false&${this.searchParam}=${searchValue} `
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult.map(item => {
          return {
            ...item,
            phoneNumber: `${item.country_code}${item.nsn}`,
            country: getCountryNameFromNumber(
              `${item.country_code}${item.nsn}`
            ),
            status: 'free',
            service_capabilities: 'basic',
            checked: false,
            hover: false
          }
        })

        this.availableNumbersForAddInstance = transformedNumbers
        this.totalPagesAvailableNumbers = pagination[2]
        this.currentPage = pagination[0]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAvailableNumbersForAddInstanceLoading = false))
  }

  get isAnyAvailableNumbersSelected() {
    return this.availableNumbersForAddInstance.some(
      number => number.checked === true
    )
  }

  clearAvailableNumbersForAddInstance = () => {
    this.availableNumbersForAddInstance = []
  }

  updateSearchParam = value => {
    this.searchParam = value
  }
}

decorate(BasicTranslations, {
  isAnyAvailableNumbersSelected: computed,
  step: observable,
  selectedInstance: observable,
  isBasicTranslationsNumbersLoading: observable,
  basicTranslationsNumbers: observable,
  multipleCounter: observable,
  isAvailableNumbersForAddInstanceLoading: observable,
  totalPagesAvailableNumbers: observable,
  availableNumbersForAddInstance: observable,
  isPostingInstance: observable,
  isPuttingInstance: observable,
  successAdded: observable,
  refusedAdded: observable,
  errorAdded: observable,
  isRedirectAfterPut: observable,
  isDeleting: observable,
  amountOfBasicInstances: observable,
  searchParam: observable,
  changeStep: action,
  setDefaultValues: action,
  updateSelectedPhoneNumber: action,
  postInstance: action,
  updateSelectedInstance: action,
  putInstance: action,
  getBasicTranslationsNumbers: action,
  postAddMultipleANSBasic: action,
  setMultipleCounter: action,
  getAvailableNumbersForAddInstance: action,
  putUpdateMultipleANSBasic: action,
  deleteANSBasic: action,
  clearAvailableNumbersForAddInstance: action,
  clearBasicNumbers: action,
  updateSearchParam: action
})

export default new BasicTranslations()
