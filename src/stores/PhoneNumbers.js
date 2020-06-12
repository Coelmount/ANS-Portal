import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

export class PhoneNumbers {
  step = 1
  closeModal = false
  transformedPhoneNumbers = []
  phoneNumbers = []
  selectedPhoneNumber = {}
  uniqueCountries = []
  addedPhoneNumbers = []
  rejectedPhoneNumbers = []
  isPhoneNumbersLoading = true
  totalPages = 0
  filterValues = {
    country: '',
    type: '',
    status: ''
  }

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.closeModal = false
    this.transformedPhoneNumbers = []
    this.phoneNumbers = []
    this.selectedPhoneNumber = {}
    this.uniqueCountries = []
    this.addedPhoneNumbers = []
    this.rejectedPhoneNumbers = []
    this.isPhoneNumbersLoading = true
    this.totalPages = 0
    this.filterValues = {
      country: '',
      type: '',
      status: ''
    }
  }

  getPhoneNumbers = (
    customerId,
    groupId,
    page,
    perPage,
    filterValues,
    orderBy,
    order,
    numberLike
  ) => {
    this.isPhoneNumbersLoading = true
    const country = (filterValues && filterValues.country) || ''
    const type = (filterValues && filterValues.type) || ''
    const getStatus = () => {
      if (filterValues && filterValues.status === 'assigned') return true
      else if (filterValues && filterValues.status === 'available') return false
      else return ''
    }
    const status = getStatus()
    const countryCode =
      (filterValues &&
        filterValues.country &&
        filterValues.country.phone.replace('+', '%2B')) ||
      ''

    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = 'nsn'
        break
      }
      case 'status': {
        orderByField = 'connected_to'
        break
      }
      case 'countryName': {
        orderByField = 'country_code'
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
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&country_code=${countryCode}&type=${type}&in_use=${status}&number_like=${numberLikeField} `
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult.map(item => {
          const countryName = getCountryNameFromNumber(
            `${item.country_code}${item.nsn}`
          )

          return {
            ...item,
            status: item.connected_to ? 'used' : 'free',
            countryName: countryName,
            phoneNumber: `${item.country_code}${item.nsn}`,
            checked: false,
            hover: false
          }
        })

        this.transformedPhoneNumbers = transformedNumbers
        this.totalPages = pagination[2]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isPhoneNumbersLoading = false))
  }

  setFilterValues = (country, type, status) => {
    this.filterValues.country = country
    this.filterValues.type = type
    this.filterValues.status = status
  }

  deleteSearchParam = field => {
    this.filterValues[field] = ''
  }

  clearFilterParams = () => {
    this.filterValues = {
      country: '',
      type: '',
      status: ''
    }
  }

  setPhoneNumbers = phoneNumbers => {
    this.phoneNumbers = phoneNumbers
    const countries = phoneNumbers.map(item => item.country)
    this.uniqueCountries = [...new Set(countries)]
  }

  setSelectedPhoneNumber = phoneNumber => {
    this.selectedPhoneNumber = phoneNumber
  }

  postPhoneNumbers = (number, amount, startNumber) => {
    this.changeStep(3)
    this.createAddedAndRejectedGroups(number.phoneNumbers, amount, startNumber)
  }

  createAddedAndRejectedGroups = (range, amount, startNumber) => {
    const startNumberWithoutCountryCode = startNumber
      .split('')
      .splice(4, startNumber.length - 3)
      .join('')
    const startIndex = range.findIndex(
      item => item.phoneNumber === startNumberWithoutCountryCode
    )

    const addedPhoneNumbers = []
    const rejectedPhoneNumbers = []
    for (let i = 0; i < range.length; i++) {
      if (i >= startIndex)
        addedPhoneNumbers.push({ addStatus: 'added', ...range[i] })
      else rejectedPhoneNumbers.push({ addStatus: 'rejected', ...range[i] })
    }
    this.addedPhoneNumbers = addedPhoneNumbers
    this.rejectedPhoneNumbers = rejectedPhoneNumbers
  }

  createGroupsSinglePhone = addedPhone =>
    (this.addedPhoneNumbers = [addedPhone])

  clearPhoneNumbers = () => (this.transformedPhoneNumbers = [])
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  transformedPhoneNumbers: observable,
  uniqueCountries: observable,
  phoneNumbers: observable,
  totalPages: observable,
  isPhoneNumbersLoading: observable,
  filterValues: observable,
  changeStep: action,
  setPhoneNumbers: action,
  setSelectedPhoneNumber: action,
  postPhoneNumbers: action,
  createGroupsSinglePhone: action,
  setDefaultValues: action,
  getPhoneNumbers: action,
  setFilterValues: action,
  deleteSearchParam: action,
  clearFilterParams: action,
  clearPhoneNumbers: action
})

export default new PhoneNumbers()
