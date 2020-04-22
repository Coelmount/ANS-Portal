import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class CreateSubaccountStore {
  step = 1
  closeModal = false

  customer = {
    type: '',
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

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.customer = {
      type: '',
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
    const data = { ...this.customer }
    return axios
      .post(`/tenants/${customerId}/groups/`, removeEmpty(data))
      .then(res => (this.createdCustomerStore = res.data))
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create subaccaunt',
          options: {
            variant: 'error'
          }
        })
      )
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
