import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbersRangeFilter'

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

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
  }

  getPhoneNumbers = (customerId, groupId, page, perPage) => {
    this.isPhoneNumbersLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number": ${page}, "page_size": ${perPage}}&cols=["country_code","nsn","type","state"] `
      )
      .then(res => {
        const requestResult = res.data.numbers
        // this push part time solution for test range logic(delete it when backend provide more data)
        requestResult.push({
          country_code: '+966',
          id: 10983,
          nsn: '115050982',
          state: 'assigned',
          type: 'geo'
        })

        const transformedNumbers = phoneNumbersRangeFilter(requestResult).map(
          item => {
            return {
              ...item,
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

  setDefaultValues = () => {
    this.changeStep(1)
    this.addedPhoneNumbers = []
    this.rejectedPhoneNumbers = []
    this.selectedPhoneNumber = {}
  }
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  transformedPhoneNumbers: observable,
  uniqueCountries: observable,
  phoneNumbers: observable,
  changeStep: action,
  setPhoneNumbers: action,
  setSelectedPhoneNumber: action,
  postPhoneNumbers: action,
  createGroupsSinglePhone: action,
  setDefaultValues: action,
  getPhoneNumbers: action
})

export default new PhoneNumbers()
