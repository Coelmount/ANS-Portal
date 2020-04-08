import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import set from 'lodash/set'

export class CustomersStore {
  rows = []
  step = 1
  customer = {
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
  isLoadingCustomers = true
  isLoadingCustomer = true
  isDeletingCustomer = false

  getCustomers = () => {
    this.isLoadingCustomers = true
    axios.get(`${PROXY_P6}/tenants`).then(res => {
      if (res.status === 200) {
        this.rows = res.data.tenants
        this.isLoadingCustomers = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  getCustomer = id => {
    this.isLoadingCustomer = true
    axios.get(`${PROXY_P6}/tenants/${id}/`).then(res => {
      if (res.status === 200) {
        merge(this.customer, res.data)
        this.isLoadingCustomer = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  deleteCustomer = ({ id, callback }) => {
    this.isDeletingCustomer = true
    axios
      .delete(`${PROXY_P6}/tenants/${id}/`)
      .then(res => {
        if (res.status === 200) {
          this.getCustomers()
          callback()
          this.isDeletingCustomer = false
        } else {
          console.log(res, 'error')
        }
      })
      .catch(e => {
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
  }

  updateCustomer = tenantId => {
    return axios
      .put(`${PROXY_P6}/tenants/${tenantId}`, this.customer)
      .then(res => {
        if (res.status === 200) {
          merge(this.customer, res.data)
        }
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
  getCustomers: action,
  getCustomer: action,
  deleteCustomer: action,
  addCustomer: action,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new CustomersStore())
