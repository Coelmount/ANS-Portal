import { decorate, observable, action } from 'mobx'

import axios, { PROXY_P6 } from 'utils/axios'

export class BasicTranslations {
  step = 1
  selectedPhoneNumber = null
  selectedInstance = null

  changeStep = (step) => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.selectedPhoneNumber = null
  }

  updateSelectedPhoneNumber = (number) => {
    this.selectedPhoneNumber = number
  }

  postDestinationNumber = (country, number) => {
    console.log(country, number, 'to post')
    this.changeStep(3)
  }

  updateSelectedInstance = (instance) => {
    this.selectedInstance = instance
  }

  postAccessNumber = (callback) => {
    console.log(
      this.selectedInstance.accessCountry,
      this.selectedInstance.accessNumber,
      'to post'
    )
    callback && callback()
  }
}

decorate(BasicTranslations, {
  step: observable,
  selectedInstance: observable,
  changeStep: action,
  setDefaultValues: action,
  updateSelectedPhoneNumber: action,
  postDestinationNumber: action,
  updateSelectedInstance: action,
  postAccessNumber: action
})

export default new BasicTranslations()
