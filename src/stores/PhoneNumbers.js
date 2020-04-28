import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class PhoneNumbers {
  step = 1
  closeModal = false
  initialPhoneNumbers = []
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

  getPhoneNumbers = (customerId, groupId) => {
    this.isPhoneNumbersLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/numbers/ `)
      .then(res => {
        this.initialPhoneNumbers = res.data.numbers
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
  initialPhoneNumbers: observable,
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
