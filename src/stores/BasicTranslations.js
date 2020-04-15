import { decorate, observable, action } from 'mobx'

import axios, { PROXY_P6 } from 'utils/axios'

export class BasicTranslations {
  step = 1
  selectedPhoneNumber = null

  changeStep = (step) => {
    this.step = step
  }

  updateSelectedPhoneNumber = (number) => {
    this.selectedPhoneNumber = number
  }

  postDestinationNumber = (country, number) => {
    console.log(country, number, 'to post')
    this.changeStep(3)
  }
}

decorate(BasicTranslations, {
  step: observable,
  changeStep: action,
  updateSelectedPhoneNumber: action,
  postDestinationNumber: action
})

export default new BasicTranslations()
