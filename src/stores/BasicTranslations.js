import { decorate, observable, action } from 'mobx'
import set from 'lodash/set'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

export class BasicTranslations {
  step = 1
  selectedPhoneNumber = null
  selectedInstance = null
  isBasicTranslationsNumbersLoading = true
  isAvailableNumbersForAddInstanceLoading = true
  isPostingInstance = false
  basicTranslationsNumbers = []
  multipleCounter = { success: 0, refused: 0, error: 0, total: 0, count: 0 }
  successAdded = []
  refusedAdded = []
  errorAdded = []
  resultMultipleAddANSBasic = []
  totalPagesAvailableNumbers = 0
  currentPage = 1
  availableNumbersForAddInstance = []

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

  postAccessNumber = callback => {
    callback && callback()
  }

  getBasicTranslationsNumbers = (customerId, groupId) => {
    this.isBasicTranslationsNumbersLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_basic`)
      .then(res => {
        const transformedNumbers = res.data.ans_basic.map((item, index) => {
          return {
            id: item.id || index,
            checked: false,
            hover: false,
            enabled: true,
            accessCountry:
              item.access_number &&
              getCountryNameFromNumber(item.access_number),
            destinationCountry:
              item.destination_number &&
              item.destination_number.length > 7 &&
              getCountryNameFromNumber(item.destination_number),
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

  postAddMultipleANSBasic = (tenantId, groupId, data) => {
    axios
      .post(`/tenants/${tenantId}/groups/${groupId}/services/ans_basic`, data)
      .then(res => {
        this.setMultipleCounter('success', this.multipleCounter.success + 1)
        this.successAdded = [...this.successAdded, data]
      })
      .catch(e => {
        this.setMultipleCounter('error', this.multipleCounter.error + 1)
        this.errorAdded = [
          ...this.errorAdded,
          data
          // {
          //   access_number: `${e.config.data.cc_access_number}${e.config.data.access_number}`,
          //   destination_number: `${e.config.data.cc_destination_number}${e.config.data.destination_number}`
          // }
        ]
      })
      .finally(() => {
        this.setMultipleCounter('count', this.multipleCounter.count + 1)
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
    numberLike
  ) => {
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
    const numberLikeField = numberLike || ''

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=basic&in_use=false&number_like=${numberLikeField} `
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
}

decorate(BasicTranslations, {
  step: observable,
  selectedInstance: observable,
  isBasicTranslationsNumbersLoading: observable,
  basicTranslationsNumbers: observable,
  multipleCounter: observable,
  resultMultipleAddANSBasic: observable,
  isAvailableNumbersForAddInstanceLoading: observable,
  totalPagesAvailableNumbers: observable,
  availableNumbersForAddInstance: observable,
  isPostingInstance: observable,
  currentPage: observable,
  changeStep: action,
  setDefaultValues: action,
  updateSelectedPhoneNumber: action,
  postInstance: action,
  updateSelectedInstance: action,
  postAccessNumber: action,
  getBasicTranslationsNumbers: action,
  postAddMultipleANSBasic: action,
  setMultipleCounter: action,
  getAvailableNumbersForAddInstance: action
})

export default new BasicTranslations()
