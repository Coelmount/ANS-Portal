import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class PhoneNumbers {
  step = 1
  closeModal = false
  phoneNumbers = []
  selectedPhoneNumber = {}
  uniqueCountries = []
  addedPhoneNumbers = []
  rejectedPhoneNumbers = []

  changeStep = (step) => {
    console.log(step)
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
    const rangeCopy = [...number.phoneNumbers]
    this.createAddedAndRejectedGroups(rangeCopy, amount)
  }

  createAddedAndRejectedGroups = (range, amount) => {
    const addedPhoneNumbers = []
    const rejectedPhoneNumbers = []
    for (let i = 0; i < range.length; i++) {
      if (i < amount)
        addedPhoneNumbers.push({ addStatus: 'added', ...range[i] })
      else rejectedPhoneNumbers.push({ addStatus: 'rejected', ...range[i] })
    }
    this.addedPhoneNumbers = addedPhoneNumbers
    this.rejectedPhoneNumbers = rejectedPhoneNumbers
    console.log(addedPhoneNumbers, rejectedPhoneNumbers, 'data')
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
