import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CustomersStore {
  rows = []
  customer = {}
  isLoadingCustomers = true
  isDeletingCustomer = false

  getCustomers = () => {
    this.isLoadingCustomers = true
    axios.get(`/tenants/`).then(res => {
      if (res.status === 200) {
        this.rows = res.data.tenants
        this.isLoadingCustomers = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  getCustomer = id => {
    axios.get(`/tenants/${id}/`).then(res => {
      if (res.status === 200) {
        this.customer = res.data
        // console.log(res.data, 'res')
      } else {
        console.log(res, 'error')
      }
    })
  }

  deleteCustomer = ({ id, callback }) => {
    this.isDeletingCustomer = true
    axios.delete(`/tenants/${id}/`).then(res => {
      if (res.status === 200) {
        this.getCustomers()
        callback()
        this.isDeletingCustomer = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}

decorate(CustomersStore, {
  rows: observable,
  customer: observable,
  isLoadingCustomers: observable,
  isDeletingCustomer: observable,
  getCustomers: action,
  getCustomer: action,
  deleteCustomer: action,
  addCustomer: action
})

export default createContext(new CustomersStore())
