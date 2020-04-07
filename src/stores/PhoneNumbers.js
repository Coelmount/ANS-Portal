import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class PhoneNumbers {
  step = 1
  closeModal = false
  phoneNumbers = []
  setSelectedPhoneNumber = {}
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
    console.log(phoneNumbers, 'phoneNumbers in store')
    const countries = phoneNumbers.map((item) => item.country)
    console.log(countries, 'countries')
    this.uniqueCountries = [...new Set(countries)]
    console.log(this.uniqueCountries, 'uniqueCountries')
  }

  setSelectedPhoneNumber = (phoneNumber) => {
    this.selectedPhoneNumber = phoneNumber
    console.log(phoneNumber, 'store')
  }
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  uniqueCountries: observable,
  phoneNumbers: observable,
  changeStep: action,
  setPhoneNumbers: action
  // setSelectedPhoneNumber: action
})

export default new PhoneNumbers()
