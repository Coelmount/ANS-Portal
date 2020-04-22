import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import SnackbarStore from './Snackbar'

export class CustomerAdminsStore {
  admins = []
  isLoading = true
  isLanguagesLoading = true
  admin = {
    userId: '',
    firstName: '',
    lastName: '',
    language: '',
    password: ''
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

  getCustomerAdmins = (id) => {
    this.isLoading = true
    axios
      .get(`${PROXY_P6}/tenants/${id}/admins/`)
      .then((res) => {
        this.admins = res.data.admins
        this.isLoading = false
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch admins',
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
    axios
      .get(`${PROXY_P6}/system/languages/`)
      .then((res) => {
        this.languagesList = res.data.availableLanguages
        this.isLanguagesLoading = false
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch languages',
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

  addCustomerAdmin = ({ id, closeModal, getUsers }) => {
    this.isLoading = true
    axios
      .post(`${PROXY_P6}/tenants/${id}/admins/`, this.sentAdmin)
      .then((res) => {
        if (res.status === 201) {
          this.isLoading = false
          getUsers(id)
          closeModal()
        } else {
          console.log(res, 'error')
        }
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to add admins',
          options: {
            variant: 'error'
          }
        })
      )
  }
}
decorate(CustomerAdminsStore, {
  admins: observable,
  isLoading: observable,
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
