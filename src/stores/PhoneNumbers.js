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

  getPhoneNumbers = (customerId, groupId, page, perPage) => {
    this.isPhoneNumbersLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type","state"] `
      )
      .then(res => {
        const requestResult = res.data.numbers
        // this push part time solution for test range logic and state col colors(delete it when backend provide more data)
        // requestResult.push(
        //   {
        //     country_code: '+966',
        //     id: 10983,
        //     nsn: '115050982',
        //     state: 'assigned',
        //     type: 'geo'
        //   },
        //   {
        //     country_code: '+966',
        //     id: 10982,
        //     nsn: '115050911',
        //     state: 'available',
        //     type: 'local'
        //   }
        // )

        const transformedNumbers = phoneNumbersRangeFilter(requestResult).map(
          item => {
            const countryName = getCountryNameFromNumber(
              `${item.country_code}${item.nsn}`
            )

            return {
              ...item,
              countryName: countryName,
              phoneNumber: `${item.country_code} ${item.nsn}`,
              rangeStart: item.rangeStart
                ? `${item.country_code} ${item.rangeStart}`
                : `${item.country_code} ${item.nsn}`,
              rangeEnd: `${item.country_code} ${item.rangeEnd}`,
              checked: false,
              hover: false
            }
          }
        )
        this.transformedPhoneNumbers = transformedNumbers
        const pagination = res.data.pagination
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

  setPhoneNumbers = phoneNumbers => {
    this.phoneNumbers = phoneNumbers
    const countries = phoneNumbers.map(item => item.country)
    this.uniqueCountries = [...new Set(countries)]
  }

  setSelectedPhoneNumber = phoneNumber => {
    this.selectedPhoneNumber = phoneNumber
  }

  postPhoneNumbers = (number, amount, startNumber) => {
    //console.log(number, amount, 'to post')
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
  changeStep: action,
  setPhoneNumbers: action,
  setSelectedPhoneNumber: action,
  postPhoneNumbers: action,
  createGroupsSinglePhone: action,
  setDefaultValues: action,
  getPhoneNumbers: action
})

export default new PhoneNumbers()
