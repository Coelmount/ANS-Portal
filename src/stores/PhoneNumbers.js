import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbers/rangeFilter'
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
  }

  getPhoneNumbers = (customerId, groupId, page, perPage, filterValues) => {
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
    this.isPhoneNumbersLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type","connected_to"]&country_code=${countryCode}&type=${type}&in_use=${status} `
      )
      // .get(
      //   `/tenants/ans0001/groups/ans0001_grp2522/numbers?sorting=[{"field":"id","direction":"desc"}]&paging={"page_number": 1, "page_size": 50}&cols=["nsn","type","state", "country_code","connected_to"]&type=geo&country_code=+966&in_use=false&number_like=811`
      // )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers
        // -> this push part time solution for test range logic and state col colors(delete it when backend provide more data)
        // requestResult.push(
        //   {
        //     country_code: '+966',
        //     id: 1,
        //     nsn: '77777777',
        //     connected_to: 'testaccount1',
        //     type: 'geo'
        //   },
        //   {
        //     country_code: '+966',
        //     id: 2,
        //     nsn: '888888888',
        //     connected_to: null,
        //     type: 'local'
        //   }
        // )
        // <-
        const transformedNumbers = requestResult.map(item => {
          const countryName = getCountryNameFromNumber(
            `${item.country_code}${item.nsn}`
          )

          return {
            ...item,
            status: item.connected_to ? 'used' : 'free',
            countryName: countryName,
            phoneNumber: `${item.country_code} ${item.nsn}`,
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
    // this.getPhoneNumbers()
    // console.log(country, type, status)
  }

  deleteSearchParam = field => {
    this.filterValues[field] = ''
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
  deleteSearchParam: action
})

export default new PhoneNumbers()
