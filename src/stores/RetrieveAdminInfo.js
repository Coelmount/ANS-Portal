import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class RetrieveAdminStore {
  isLoading = true

  admin = {
    firstName: '',
    lastName: '',
    language: ''
  }
  isDeletingAdmin = false

  setAdminInfo = (valueKey, value) => {
    for (let key in this.admin) {
      if (valueKey === key) {
        this.admin[key] = value
      }
    }
  }

  getAdminInfo = (id, userId) => {
    this.isLoading = true

    axios.get(`tenants/${id}/admins/${userId}`).then(res => {
      if (res.status === 200) {
        this.setAdminInfo('firstName', res.data.firstName)
        this.setAdminInfo('lastName', res.data.lastName)
        this.setAdminInfo('language', res.data.language)
        this.isLoading = false
      } else {
        console.log(res, 'error')
      }
    })
  }
  updateCustomerAdmin = (id, userId, handleClose, getCustomerAdmins) => {
    this.isLoading = true
    axios
      .put(`/tenants/${id}/admins/${userId}`, {
        firstName: this.admin.firstName,
        lastName: this.admin.lastName,
        language: this.admin.language
      })
      .then(res => {
        if (res.status === 200) {
          console.log('updated')
          this.isLoading = false
          handleClose()
          getCustomerAdmins(id)
        } else {
          console.log(res, 'error')
        }
      })
  }
  deleteAdmin = ({ id, closeModal, userId, getCustomerAdmins }) => {
    this.isDeletingAdmin = true
    axios.delete(`/tenants/${id}/admins/${userId}`).then(res => {
      if (res.status === 200) {
        getCustomerAdmins(id)
        closeModal()
        this.isDeletingAdmin = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}
decorate(RetrieveAdminStore, {
  isLoading: observable,
  isDeletingAdmin: observable,
  admin: observable,
  setAdminInfo: action,
  getAdminInfo: action,
  updateCustomerAdmin: action,
  deleteAdmin: action
})

export default createContext(new RetrieveAdminStore())
