import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'

const defaultCustomerValue = {
  id: '',
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

export class CustomersStore {
  rows = []
  step = 1
  customer = defaultCustomerValue
  isLoadingCustomers = true
  isLoadingCustomer = true
  isDeletingCustomer = false
  isAddingCustomer = false

  getCustomers = () => {
    this.isLoadingCustomers = true
    axios
      .get(`${PROXY_P6}/tenants`)
      .then((res) => {
        if (res.status === 200) {
          this.rows = res.data.customers
          this.isLoadingCustomers = false
        } else {
          console.log(res, 'error')
        }
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch customers',
          options: {
            variant: 'error'
          }
        })
      )
  }

  getCustomer = (id) => {
    this.isLoadingCustomer = true
    axios
      .get(`${PROXY_P6}/tenants/${id}/`)
      .then((res) => {
        // merge(this.customer, res.data.customers[0])
        merge(this.customer, res.data)
        this.isLoadingCustomer = false
      })
      .catch((e) => {
        this.isLoadingCustomer = false

        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch customer',
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
      .delete(`${PROXY_P6}/tenants/${id}`)
      .then(() => {
        this.getCustomers()
        callback()
        this.isDeletingCustomer = false
      })
      .catch((e) => {
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to delete customer',
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

  updateCustomer = (tenantId) => {
    this.isAddingCustomer = true
    return axios
      .put(`${PROXY_P6}/tenants/${tenantId}`, this.customer)
      .then((res) => {
        if (res.status === 200) {
          merge(this.customer, res.data)
          this.isAddingCustomer = false
        }
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to update customer',
          options: {
            variant: 'error'
          }
        })
      )
  }

  changeStep = (step) => {
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
  isAddingCustomer: observable,
  getCustomers: action,
  getCustomer: action,
  deleteCustomer: action,
  addCustomer: action,
  changeStep: action,
  changeCustomer: action,
  getCustomerDefaultValues: action
})

export default new CustomersStore()
