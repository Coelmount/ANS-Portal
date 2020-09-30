import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class EditDeleteAdminStore {
  isLoadingData = true

  updatedAdmin = {
    firstName: '',
    lastName: '',
    language: '',
    emailAddress: '',
    password: ''
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
    this.updatedAdmin = {
      firstName: '',
      lastName: '',
      language: '',
      emailAddress: '',
      password: ''
    }
    axios
      .get(`/tenants/${id}/admins/${userId}`)
      .then(res => {
        if (res.status === 200) {
          this.updateAdminInfo('firstName', res.data.firstName)
          this.updateAdminInfo('lastName', res.data.lastName)
          this.updateAdminInfo('language', res.data.language)
          this.updateAdminInfo('emailAddress', res.data.emailAddress)
          this.isLoadingData = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch admin',
          options: {
            variant: 'error'
          }
        })
      )
  }
  updateCustomerAdmin = ({ id, closeModal, userId, getUsers }) => {
    this.isLoadingData = true
    axios
      .put(`/tenants/${id}/admins/${userId}`, this.sentAdmin)
      .then(res => {
        closeModal()
        getUsers(id)
        SnackbarStore.enqueueSnackbar({
          message: 'Admin updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update admin',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingData = false
      })
  }

  deleteAdmin = ({ id, closeModal, userId, getUsers }) => {
    this.isDeletingAdmin = true
    axios
      .delete(`/tenants/${id}/admins/${userId}`)
      .then(res => {
        if (res.status === 200) {
          getUsers(id)
          closeModal()
          this.isDeletingAdmin = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete admin',
          options: {
            variant: 'error'
          }
        })
      )
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

export default new EditDeleteAdminStore()
