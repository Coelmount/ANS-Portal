import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class CustomerAdminsStore {
  admins = []
  isLoading = true
  isLanguagesLoading = true
  isAdding = false
  admin = {
    userId: '',
    firstName: '',
    lastName: '',
    language: '',
    password: '',
    emailAddress: ''
  }
  sentAdmin = {}
  languagesList = []

  clearFields = () => {
    this.admin = {
      userId: '',
      firstName: '',
      lastName: '',
      language: '',
      password: ''
    }
  }

  getCustomerAdmins = id => {
    this.isLoading = true
    this.admins = []
    axios
      .get(`/tenants/${id}/admins/`)
      .then(res => {
        if (res.status === 200) {
          this.admins = res.data.admins
          this.isLoading = false
        }
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

  getCustomerAdminsLanguages = () => {
    this.isLanguagesLoading = true
    this.languagesList = []
    axios
      .get(`/system/languages/`)
      .then(res => {
        this.languagesList = res.data.availableLanguages
        this.isLanguagesLoading = false
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch languages',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isLanguagesLoading = false))
  }

  setAdminInfo = (valueKey, value) => {
    for (let key in this.admin) {
      if (valueKey === key) {
        this.admin[key] = value
        this.sentAdmin[key] = value
      }
    }
  }

  addCustomerAdmin = ({ id, closeModal, getUsers, sendWelcomeMail }) => {
    this.isAdding = true
    if (sendWelcomeMail) {
      this.sentAdmin.ui_id = 'mtn'
      delete this.sentAdmin.password
    }
    axios
      .post(`/tenants/${id}/admins/`, this.sentAdmin)
      .then(res => {
        if (res.status === 201) {
          this.isLoading = false
          getUsers(id)
          closeModal()
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add admins',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isAdding = false
      })
  }
}
decorate(CustomerAdminsStore, {
  admins: observable,
  isLoading: observable,
  isAdding: observable,
  sentAdmin: observable,
  admin: observable,
  languagesList: observable,
  isLanguagesLoading: observable,
  getCustomerAdmins: action,
  addCustomerAdmin: action,
  setAdminInfo: action,
  getCustomerAdminsLanguages: action,
  clearFields: action
})

export default new CustomerAdminsStore()
