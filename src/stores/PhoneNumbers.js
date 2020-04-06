import { decorate, observable, action } from 'mobx'
import set from 'lodash/set'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class PhoneNumbers {
  step = 1
  closeModal = false

  createdCustomerStore = {}

  changeStep = (step) => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
  }
}

decorate(PhoneNumbers, {
  step: observable,
  closeModal: observable,
  changeStep: action
})

export default new PhoneNumbers()
