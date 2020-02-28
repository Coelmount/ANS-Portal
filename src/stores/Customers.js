import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CustomersStore {
  rows = []
  isLoadingCustomers = true

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

  deleteCustomer = id => {
    this.isLoadingCustomers = true
    axios.delete(`/tenants/${id}/`).then(res => {
      if (res.status === 200) {
        this.getCustomers()
        this.isLoadingCustomers = false
      }
    })
  }
}

decorate(CustomersStore, {
  rows: observable,
  isLoadingCustomers: observable,
  getCustomers: action,
  deleteCustomer: action
})

export default createContext(new CustomersStore())
