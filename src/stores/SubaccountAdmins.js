import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

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
      .get(`/tenants/${id}/groups/${groupId}/admins/`)
      .then(res => {
        this.subaccountAdmins = res.data.admins
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch admins',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoading = false
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

  addSubaccountAdmin = ({
    id,
    closeModal,
    getUsers,
    groupId,
    defaultDomain
  }) => {
    this.isLoading = true

    axios
      .post(`/tenants/${id}/groups/${groupId}/admins/`, {
        ...this.sentSubaccountAdmin,
        userId: defaultDomain
          ? this.sentSubaccountAdmin.userId + `@${defaultDomain}`
          : this.sentSubaccountAdmin.userId
      })
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
          this.isLoading = false
          closeModal()
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add admin',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isLoading = false))
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
