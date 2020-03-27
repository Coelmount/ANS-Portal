import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

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

  getSubaccountAdmins = ({ id, groupId }) => {
    this.isLoading = true
    axios.get(`tenants/${id}/groups/${groupId}/admins/`).then(res => {
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
        `/tenants/${id}/groups/${groupId}/admins/`,
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
  getSubaccountAdmins: action,
  subaccountAdmin: observable,
  addSubaccountAdmin: action,
  setSubaccountAdminInfo: action,
  sentSubaccountAdmin: observable
})

export default createContext(new SubaccountAdminsStore())