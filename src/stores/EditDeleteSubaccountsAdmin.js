import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class EditDeleteSubaccountAdminStore {
  isLoadingData = true

  updatedSubaccountAdmin = {
    firstName: '',
    lastName: '',
    language: ''
  }
  isDeletingSubaccountAdmin = false
  sentSubaccountAdmin = {}

  сlearFields = () => {
    this.updatedSubaccountAdmin = {
      firstName: '',
      lastName: '',
      language: ''
    }
  }

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

    axios
      .get(`/tenants/${id}/groups/${groupId}/admins/${userId}`)
      .then(res => {
        if (res.status === 200) {
          this.updateSubaccountAdminInfo('firstName', res.data.firstName)
          this.updateSubaccountAdminInfo('lastName', res.data.lastName)
          this.updateSubaccountAdminInfo('language', res.data.language)
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
  updateSubaccountAdmin = ({ id, closeModal, userId, getUsers, groupId }) => {
    this.isLoadingData = true
    axios
      .put(
        `/tenants/${id}/groups/${groupId}/admins/${userId}`,
        this.sentSubaccountAdmin
      )
      .then(res => {
        closeModal()
        getUsers({ id, groupId })
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
  deleteSubaccountAdmin = ({ id, closeModal, userId, getUsers, groupId }) => {
    this.isDeletingSubaccountAdmin = true
    axios
      .delete(`/tenants/${id}/groups/${groupId}/admins/${userId}`)
      .then(res => {
        if (res.status === 200) {
          getUsers({ id, groupId })
          closeModal()
          this.isDeletingSubaccountAdmin = false
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
decorate(EditDeleteSubaccountAdminStore, {
  isLoadingData: observable,
  isDeletingSubaccountAdmin: observable,
  updatedSubaccountAdmin: observable,
  сlearFields: action,
  updateSubaccountAdminInfo: action,
  Subaccount: action,
  updateSubaccountAdmin: action,
  deleteSubaccountAdmin: action
})

export default new EditDeleteSubaccountAdminStore()
