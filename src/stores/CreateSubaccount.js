import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'

export class CreateSubaccountStore {
  step = 1
  closeModal = false

  customer = {
    groupId: '',
    groupName: '',
    contactInformation: {
      name: '',
      phoneNumber: '',
      emailAddress: ''
    },
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
      groupId: '',
      groupName: '',
      contactInformation: {
        name: '',
        phoneNumber: '',
        emailAddress: ''
      },
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

  createCustomer = customerId => {
    return axios
      .post(`/tenants/${customerId}/groups/`, this.customer)
      .then(res => (this.createdCustomer = res.data))
  }
}

decorate(CreateSubaccountStore, {
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new CreateSubaccountStore())
