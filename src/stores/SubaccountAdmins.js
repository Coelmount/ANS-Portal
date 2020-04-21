import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

export class SubaccountAdminsStore {
  subaccountAdmins = []
  isLoading = true
  subaccountAdmin = {
    userId: '',
    firstName: '',
    lastName: '',
    language: '',
    password: ''
  }
  sentSubaccountAdmin = {}

  clearFields = () => {
    this.subaccountAdmin = {
      userId: '',
      firstName: '',
      lastName: '',
      language: '',
      password: ''
    }
  }

  getSubaccountAdmins = ({ id, groupId }) => {
    this.isLoading = true
    axios
      .get(`${PROXY_P6}/tenants/${id}/groups/${groupId}/admins/`)
      .then(res => {
        if (res.status === 200) {
          this.subaccountAdmins = res.data.admins
          this.isLoading = false
        } else {
          console.log(res, 'error')
        }
      })
  }

  setSubaccountAdminInfo = (valueKey, value) => {
    for (let key in this.subaccountAdmin) {
      if (valueKey === key) {
        this.subaccountAdmin[key] = value
        this.sentSubaccountAdmin[key] = value
      }
    }
  }

  addSubaccountAdmin = ({ id, closeModal, getUsers, groupId }) => {
    this.isLoading = true

    axios
      .post(
        `${PROXY_P6}/tenants/${id}/groups/${groupId}/admins/`,
        this.sentSubaccountAdmin
      )
      .then(res => {
        if (res.status === 201) {
          this.isLoading = false
          getUsers({ id: id, groupId: groupId })
          this.subaccountAdmin = {
            userId: '',
            firstName: '',
            lastName: '',
            language: '',
            password: ''
          }
          closeModal()
        } else {
          console.log(res, 'error')
        }
      })
  }
}
decorate(SubaccountAdminsStore, {
  subaccountAdmins: observable,
  isLoading: observable,
  sentSubaccountAdmin: observable,
  subaccountAdmin: observable,
  getSubaccountAdmins: action,
  addSubaccountAdmin: action,
  setSubaccountAdminInfo: action,
  clearFields: action
})

export default new SubaccountAdminsStore()
