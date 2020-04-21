import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import axios from 'axios'
import { LOGIN_URL } from 'utils/axios'

import SnackbarStore from './Snackbar'

export class AuthStore {
  token = localStorage.getItem('token')
  user = {}
  userLogin = {}
  isAuthorized = localStorage.getItem('isAuthorized', true)
    ? !!localStorage.getItem('isAuthorized', true)
    : false
  username = ''

  postLogin = (data, history) => {
    axios
      .post(`${LOGIN_URL}/auth/login`, data)
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.data.token)
          this.token = res.data.token
          this.userLogin = res.data
          this.getLocal()
          if (res.data.ids) {
            if (res.data.ids.group_id) {
              history.push(
                `/customers/${res.data.ids.tenant_id}/subaccounts/${res.data.ids.group_id}/ans_instances`
              )
              return
            }
            history.push(`/customers/${res.data.ids.tenant_id}/access_numbers`)
          }
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: 'Feiled to login',
          options: {
            variant: 'error'
          }
        })
      )
  }

  getLocal = () => {
    axios
      .get(`${LOGIN_URL}/system/users/local`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      .then(res => {
        if (res.status === 200) {
          this.user = res.data
          console.log(res.data)
          this.username = res.data.username
          localStorage.setItem('isAuthorized', true)
          this.isAuthorized = true
        } else {
          localStorage.removeItem('isAuthorized')
          this.isAuthorized = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: 'Feiled to get user local data',
          options: {
            variant: 'error'
          }
        })
      )
  }

  logOut = () => {
    localStorage.removeItem('isAuthorized')
    localStorage.removeItem('token')
    this.user = {}
    this.token = ''
    this.isAuthorized = false
  }
}

decorate(AuthStore, {
  userLogin: observable,
  token: observable,
  user: observable,
  isAuthorized: observable,
  username: observable,
  postLogin: action,
  getLocal: action,
  logOut: action
})

export default new AuthStore()
