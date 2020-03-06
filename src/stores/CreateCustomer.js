import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'

export class CreateCustomerStore {
  step = 1

  customer = {
    tenantId: '',
    name: '',
    contact: {
      name: '',
      phoneNumber: '',
      emailAddress: ''
    },
    useTenantLanguage: '',
    address: {
      addressLine1: '',
      postalCode: '',
      city: '',
      country: ''
    }
  }

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }
}

decorate(CreateCustomerStore, {
  step: observable,
  customer: observable,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new CreateCustomerStore())
