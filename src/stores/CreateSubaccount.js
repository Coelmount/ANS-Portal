import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { set } from 'lodash'

import axios from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import SubaccountStore from 'stores/Subaccounts'

export class CreateSubaccountStore {
  step = 1
  closeModal = false
  addUpdateCustomer = false

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
      },
      timeZone: ''
    }
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }

  createCustomer = (customerId, callback) => {
    this.addUpdateCustomer = true
    const data = { ...this.customer }
    return axios
      .post(`/tenants/${customerId}/groups`, removeEmpty(data))
      .then(res => {
        this.createdCustomerStore = res.data.apio.body
        SnackbarStore.enqueueSnackbar({
          message: 'Subaccaount successfully created',
          options: {
            variant: 'success'
          }
        })
        callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create subaccount',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        SubaccountStore.getSubaccounts(customerId)
        this.addUpdateCustomer = false
      })
  }
}

decorate(CreateSubaccountStore, {
  addUpdateCustomer: observable,
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  changeStep: action,
  changeCustomer: action
})

export default new CreateSubaccountStore()
