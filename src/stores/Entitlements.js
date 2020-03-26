import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import set from 'lodash/set'

import axios from 'utils/axios'

export class Entitlements {
  step = 1
  closeModal = false

  customer = {
    type: 'ServiceProvider',
    tenantId: '',
    name: '',
    contactInformation: {
      name: '',
      phoneNumber: '',
      emailAddress: ''
    },
    useTenantLanguage: '',
    addressInformation: {
      addressLine1: '',
      postalCode: '',
      city: '',
      country: ''
    }
  }

  createdCustomerStore = {}

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.customer = {
      type: 'Enterprise',
      tenantId: '',
      name: '',
      contactInformation: {
        name: '',
        phoneNumber: '',
        emailAddress: ''
      },
      useTenantLanguage: '',
      addressInformation: {
        addressLine1: '',
        postalCode: '',
        city: '',
        country: ''
      }
    }
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }

  createCustomer = () => {
    return axios
      .post(`/tenants/`, this.customer)
      .then(res => (this.createdCustomerStore = res.data))
  }
}

decorate(Entitlements, {
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new Entitlements())
