import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'

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

  createdCustomerStore = {}

  changeStep = (step) => {
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

  createCustomer = (customerId) => {
    const data = { ...this.customer }
    return axios
      .post(`${PROXY_P6}/tenants/${customerId}/groups/`, removeEmpty(data))
      .then((res) => (this.createdCustomerStore = res.data))
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

export default new CreateSubaccountStore()
