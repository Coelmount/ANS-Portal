import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

const defaultCustomerValue = {
  id: '',
  tenantId: '',
  name: '',
  defaultDomain: '',
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

export class CustomersStore {
  rows = []
  step = 1
  customer = defaultCustomerValue
  isLoadingCustomers = true
  isLoadingCustomer = true
  isDeletingCustomer = false
  isUpdatingCustomer = false

  getCustomers = () => {
    this.isLoadingCustomers = true
    axios
      .get(`/tenants`)
      .then(res => {
        this.rows = res.data.customers
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch customers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingCustomers = false
      })
  }

  getCustomer = id => {
    this.isLoadingCustomer = true
    axios
      .get(`/tenants/${id}/`)
      .then(res => {
        merge(this.customer, res.data)
        this.isLoadingCustomer = false
      })
      .catch(e => {
        this.isLoadingCustomer = false

        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch customer',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingCustomer = false
      })
  }

  getCustomerDefaultValues = () => {
    this.customer = defaultCustomerValue
  }

  deleteCustomer = ({ id, callback }) => {
    this.isDeletingCustomer = true
    axios
      .delete(`/tenants/${id}`)
      .then(() => {
        this.getCustomers()
        callback()
        this.isDeletingCustomer = false
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete customer',
          options: {
            variant: 'error'
          }
        })
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
      .finally(() => {
        this.isDeletingCustomer = false
      })
  }

  updateCustomer = (tenantId, handleClose) => {
    this.isUpdatingCustomer = true
    return axios
      .put(`/tenants/${tenantId}`, this.customer)
      .then(res => {
        if (res.status === 200) {
          merge(this.customer, res.data)
          this.isAddingCustomer = false
          handleClose()
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update customer',
          options: {
            variant: 'error'
          }
        })
      ).finally(() => {
        this.isUpdatingCustomer = false
      })
  }

  changeStep = step => {
    this.step = step
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }
}

decorate(CustomersStore, {
  step: observable,
  rows: observable,
  customer: observable,
  isLoadingCustomers: observable,
  isLoadingCustomer: observable,
  isDeletingCustomer: observable,
  isUpdatingCustomer: observable,
  getCustomers: action,
  getCustomer: action,
  deleteCustomer: action,
  addCustomer: action,
  changeStep: action,
  changeCustomer: action,
  getCustomerDefaultValues: action
})

export default new CustomersStore()
