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
    console.log(number, 'numb in store')
  }
}

decorate(BasicTranslations, {
  step: observable,
  changeStep: action,
  updateSelectedPhoneNumber: action
})

export default new BasicTranslations()
