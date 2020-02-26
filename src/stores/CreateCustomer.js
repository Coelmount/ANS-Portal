import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CreateCustomerStore {
  step = 1

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
  }
}

decorate(CreateCustomerStore, {
  step: observable,
  changeStep: action
})

export default createContext(new CreateCustomerStore())
