import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CustomerAdminsStore {
  rows = []
  isLoading = true

  getCustomerAdmins = id => {
    this.isLoading = true
    axios.get(`tenants/${id}/admins/`).then(res => {
      if (res.status === 200) {
        this.rows = res.data.admins
        this.isLoading = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}
decorate(CustomerAdminsStore, {
  rows: observable,
  isLoading: observable,
  getCustomerAdmins: action
})

export default createContext(new CustomerAdminsStore())
