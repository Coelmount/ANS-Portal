import { decorate, observable, action } from 'mobx'
import { createContext } from 'react'
import set from 'lodash/set'

import axios from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'
import { CUSTOMER_TEMPLATE, CUSTOMER_TYPE } from 'source/config'
import SnackbarStore from './Snackbar'
import ConfigStore from './Config'
import getErrorMessage from 'utils/getErrorMessage'

const defaultCustomerValues = {
  templateName: '',
  type: '',
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

export class CreateCustomerStore {
  step = 1
  closeModal = false
  addUpdateCustomer = false
  createSubaccountFunct = () => {}

  customer = defaultCustomerValues

  createdCustomerStore = {}

  changeStep = step => {
    this.step = step
  }

  setCreateSubaccaunt = data => {
    this.createSubaccountFunct = data
  }

  setDefaultValues = () => {
    this.step = 1
    this.customer = defaultCustomerValues
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }

  createCustomer = () => {
    this.addUpdateCustomer = true
    const data = { ...this.customer }
    return axios
      .post(`/tenants`, removeEmpty(data))
      .then(res => {
        this.createdCustomerStore = res.data.apio.body
        this.changeStep(3)
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create customer',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.addUpdateCustomer = false
      })
  }
}

decorate(CreateCustomerStore, {
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  addUpdateCustomer: observable,
  changeStep: action,
  changeCustomer: action,
  createSubaccountFunct: action
})

export default new CreateCustomerStore()
