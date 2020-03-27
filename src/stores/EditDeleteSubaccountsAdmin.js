import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class EditDeleteSubaccountAdminStore {
  isLoadingData = true

  updatedSubaccountAdmin = {
    firstName: '',
    lastName: '',
    language: ''
  }
  isDeletingSubaccountAdmin = false
  sentSubaccountAdmin = {}
  updateSubaccountAdminInfo = (valueKey, value) => {
    for (let key in this.updatedSubaccountAdmin) {
      if (valueKey === key) {
        this.updatedSubaccountAdmin[key] = value
        this.sentSubaccountAdmin[key] = value
      }
    }
  }

  getSubaccountAdminInfo = ({ id, userId, groupId }) => {
    this.isLoadingData = true

    axios.get(`tenants/${id}/groups/${groupId}/admins/${userId}`).then(res => {
      if (res.status === 200) {
        this.updateSubaccountAdminInfo('firstName', res.data.firstName)
        this.updateSubaccountAdminInfo('lastName', res.data.lastName)
        this.updateSubaccountAdminInfo('language', res.data.language)
        this.isLoadingData = false
      } else {
        console.log(res, 'error')
      }
    })
  }
  updateSubaccountAdmin = ({ id, closeModal, userId, getUsers, groupId }) => {
    this.isLoadingData = true
    axios
      .put(
        `/tenants/${id}/groups/${groupId}/admins/${userId}`,
        this.sentSubaccountAdmin
      )
      .then(res => {
        if (res.status === 200) {
          this.isLoadingData = false
          closeModal()
          getUsers({ id, groupId })
        } else {
          console.log(res, 'error')
        }
      })
  }
  deleteSubaccountAdmin = ({ id, closeModal, userId, getUsers, groupId }) => {
    this.isDeletingSubaccountAdmin = true
    axios
      .delete(`/tenants/${id}/groups/${groupId}/admins/${userId}`)
      .then(res => {
        if (res.status === 200) {
          getUsers({ id, groupId })
          closeModal()
          this.isDeletingSubaccountAdmin = false
        } else {
          console.log(res, 'error')
        }
      })
  }
}
decorate(EditDeleteSubaccountAdminStore, {
  isLoadingData: observable,
  isDeletingSubaccountAdmin: observable,
  updatedSubaccountAdmin: observable,
  updateSubaccountAdminInfo: action,
  Subaccount: action,
  updateSubaccountAdmin: action,
  deleteSubaccountAdmin: action
})

export default createContext(new EditDeleteSubaccountAdminStore())