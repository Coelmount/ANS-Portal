import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import { PROXY_P5 } from 'utils/axios'

import axios from 'utils/axios'

export class EditDeleteAdminStore {
  isLoadingData = true

  updatedAdmin = {
    firstName: '',
    lastName: '',
    language: ''
  }
  isDeletingAdmin = false
  sentAdmin = {}
  updateAdminInfo = (valueKey, value) => {
    for (let key in this.updatedAdmin) {
      if (valueKey === key) {
        this.updatedAdmin[key] = value
        this.sentAdmin[key] = value
      }
    }
  }

  getAdminInfo = ({ id, userId }) => {
    this.isLoadingData = true

    axios.get(`${PROXY_P5}/tenants/${id}/admins/${userId}`).then(res => {
      if (res.status === 200) {
        this.updateAdminInfo('firstName', res.data.firstName)
        this.updateAdminInfo('lastName', res.data.lastName)
        this.updateAdminInfo('language', res.data.language)
        this.isLoadingData = false
      } else {
        console.log(res, 'error')
      }
    })
  }
  updateCustomerAdmin = ({ id, closeModal, userId, getUsers }) => {
    this.isLoadingData = true
    axios
      .put(`${PROXY_P5}/tenants/${id}/admins/${userId}`, this.sentAdmin)
      .then(res => {
        if (res.status === 200) {
          console.log('updated')
          this.isLoadingData = false
          closeModal()
          getUsers(id)
        } else {
          console.log(res, 'error')
        }
      })
  }
  deleteAdmin = ({ id, closeModal, userId, getUsers }) => {
    this.isDeletingAdmin = true
    axios.delete(`${PROXY_P5}/tenants/${id}/admins/${userId}`).then(res => {
      if (res.status === 200) {
        getUsers(id)
        closeModal()
        this.isDeletingAdmin = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}
decorate(EditDeleteAdminStore, {
  isLoadingData: observable,
  isDeletingAdmin: observable,
  updatedAdmin: observable,
  updateAdminInfo: action,
  getAdminInfo: action,
  updateCustomerAdmin: action,
  deleteAdmin: action
})

export default createContext(new EditDeleteAdminStore())
