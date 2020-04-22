import { decorate, observable, action } from 'mobx'
import { createContext } from 'react'
import set from 'lodash/set'

import axios from 'utils/axios'
import { removeEmpty } from 'utils/removeEmpty'
import { CUSTOMER_TEMPLATE, CUSTOMER_TYPE } from 'source/config'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

const defaultCustomerValues = {
  templateName: CUSTOMER_TEMPLATE,
  type: CUSTOMER_TYPE,
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
  isCustomerAdding = false

  customer = defaultCustomerValues

  createdCustomerStore = {}

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.customer = defaultCustomerValues
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }

  createCustomer = () => {
    this.isCustomerAdding = true
    const data = { ...this.customer }
    return axios
      .post(`/tenants`, removeEmpty(data))
      .then(res => (this.createdCustomerStore = res.data))
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create customer',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isCustomerAdding = false
      })
  }
}

decorate(CreateCustomerStore, {
  step: observable,
  customer: observable,
  closeModal: observable,
  createdCustomer: observable,
  isCustomerAdding: observable,
  changeStep: action,
  changeCustomer: action
})

export default new CreateCustomerStore()
