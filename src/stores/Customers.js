import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import set from 'lodash/set'

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
    axios.get(`${PROXY_P6}/tenants`).then((res) => {
      if (res.status === 200) {
        console.log('get custs', res.data.customers)
        this.rows = res.data.customers
        this.isLoadingCustomers = false
      } else {
        console.log(res, 'error')
      }
    })
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
      .catch(() => {
        this.isLoadingCustomer = false
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
      .delete(`${PROXY_P6}/tenants/${id}/`)
      .then((res) => {
        if (res.status === 200) {
          this.getCustomers()
          callback()
          this.isDeletingCustomer = false
        } else {
          console.log(res, 'error')
        }
      })
      .catch((e) => {
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
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

export default createContext(new CustomersStore())
