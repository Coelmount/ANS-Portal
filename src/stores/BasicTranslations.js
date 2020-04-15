import { decorate, observable, action } from 'mobx'

import axios, { PROXY_P6 } from 'utils/axios'

export class BasicTranslations {
  step = 1

  changeStep = (step) => {
    this.step = step
  }
}

decorate(BasicTranslations, {
  step: observable,
  changeStep: action
})

export default new BasicTranslations()
