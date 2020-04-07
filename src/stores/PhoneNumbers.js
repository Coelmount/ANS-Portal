import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class PhoneNumbers {
  step = 1
  closeModal = false
  phoneNumbers = []
  selectedPhoneNumber = {}
  uniqueCountries = []

  createdCustomerStore = {}

  changeStep = (step) => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
  }

  setPhoneNumbers = (phoneNumbers) => {
    this.phoneNumbers = phoneNumbers
    const countries = phoneNumbers.map((item) => item.country)
    this.uniqueCountries = [...new Set(countries)]
  }

  setSelectedPhoneNumber = (phoneNumber) => {
    this.selectedPhoneNumber = phoneNumber
  }

  postPhoneNumbers = (number, amount) => {
    console.log(number, amount, 'to post')
    this.changeStep(3)
  }
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  uniqueCountries: observable,
  phoneNumbers: observable,
  changeStep: action,
  setPhoneNumbers: action,
  setSelectedPhoneNumber: action,
  postPhoneNumbers: action
})

export default new PhoneNumbers()
