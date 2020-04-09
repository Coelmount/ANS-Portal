import { decorate, observable, action } from 'mobx'
import { createContext } from 'react'
import set from 'lodash/set'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'

export class CreateCustomerStore {
  step = 1
  closeModal = false

  customer = {
    type: 'ServiceProvider',
    external_id: '',
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

  changeStep = (step) => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.customer = {
      type: 'ServiceProvider',
      external_id: '',
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
    const data = { ...this.customer }
    return axios
      .post(`${PROXY_P6}/tenants`, removeEmpty(data))
      .then((res) => (this.createdCustomerStore = res.data))
  }
}

decorate(CreateCustomerStore, {
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new CreateCustomerStore())
