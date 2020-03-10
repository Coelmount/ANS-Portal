import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'

export class CreateCustomerStore {
  step = 1
  closeModal = false

  customer = {
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

  createdCustomer = {}

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
      .then(res => (this.createdCustomer = res.data))
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
