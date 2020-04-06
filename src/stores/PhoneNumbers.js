import { decorate, observable, action } from 'mobx'
import set from 'lodash/set'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class PhoneNumbers {
  step = 1
  closeModal = false
  phoneNumbers = []
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
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  uniqueCountries: observable,
  phoneNumbers: observable,
  changeStep: action,
  setPhoneNumbers: action
})

export default new PhoneNumbers()
