import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P1 } from 'utils/axios'

export class CustomerAdminsStore {
  admins = []
  isLoading = true
  admin = {
    userId: '',
    firstName: '',
    lastName: '',
    language: '',
    password: ''
  }
  sentAdmin = {}

  getCustomerAdmins = id => {
    this.isLoading = true
    axios.get(`${PROXY_P1}/tenants/${id}/admins/`).then(res => {
      if (res.status === 200) {
        this.admins = res.data.admins
        this.isLoading = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  setAdminInfo = (valueKey, value) => {
    for (let key in this.admin) {
      if (valueKey === key) {
        this.admin[key] = value
        this.sentAdmin[key] = value
      }
    }
  }

  addCustomerAdmin = ({ id, closeModal, getUsers }) => {
    this.isLoading = true
    axios
      .post(`${PROXY_P1}/tenants/${id}/admins/`, this.sentAdmin)
      .then(res => {
        if (res.status === 201) {
          console.log('added')
          this.isLoading = false
          getUsers(id)
          closeModal()
        } else {
          console.log(res, 'error')
        }
      })
  }
}
decorate(CustomerAdminsStore, {
  admins: observable,
  isLoading: observable,
  getCustomerAdmins: action,
  admin: observable,
  addCustomerAdmin: action,
  setAdminInfo: action,
  sentAdmin: observable
})

export default createContext(new CustomerAdminsStore())
