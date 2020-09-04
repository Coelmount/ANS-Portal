import { decorate, observable, action } from 'mobx'
import axios from 'axios'
import { BASE_URL } from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import clearLocalStorage from 'utils/clearLocalStorage'

import SnackbarStore from './Snackbar'

export class AuthStore {
  jwtToken = localStorage.getItem('jwtToken')
  user = {}
  userLogin = {}
  isAuthorized = localStorage.getItem('isAuthorized', true)
    ? !!localStorage.getItem('isAuthorized', true)
    : false
  username = ''
  isLogging = false

  postLogin = (data, history) => {
    this.jwtToken = localStorage.getItem('jwtToken')
    this.userLogin = {}
    this.isLogging = true
    axios
      .post(`${BASE_URL}/auth/login`, data)
      .then(res => {
        if (res.status === 200) {
          const newJwtToken = res.data.access_token
          const newRefreshToken = res.data.refresh_token
          localStorage.setItem('jwtToken', newJwtToken)
          localStorage.setItem('refreshJwtToken', newRefreshToken)

          this.jwtToken = newJwtToken
          this.userLogin = res.data
          this.getLocal()

          if (res.data.ids) {
            localStorage.setItem('ids', JSON.stringify(res.data.ids))
            if (res.data.ids.tenant_id && res.data.ids.group_id) {
              history.push(
                `/customers/${res.data.ids.tenant_id}/subaccounts/${res.data.ids.group_id}/ans_instances`
              )
              return
            }
            if (res.data.ids.tenant_id) {
              history.push(
                `/customers/${res.data.ids.tenant_id}/access_numbers`
              )
              return
            }
          }
          localStorage.removeItem('ids')
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to login',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLogging = false
      })
  }

  changeUserLogin = () => {
    this.userLogin = {
      ...this.userLogin,
      profile: { ...this.userLogin.profile, is_first_login: false }
    }
  }

  getLocal = () => {
    this.user = {}
    this.username = ''
    axios
      .get(`${BASE_URL}/system/users/local`, {
        headers: { Authorization: `Bearer ${this.jwtToken}` }
      })
      .then(res => {
        if (res.status === 200) {
          this.user = res.data
          this.username = res.data.username
          localStorage.setItem('isAuthorized', true)
          this.isAuthorized = true
        } else {
          localStorage.removeItem('isAuthorized')
          this.isAuthorized = false
        }
      })
    // .catch(e =>
    //   SnackbarStore.enqueueSnackbar({
    //     message: getErrorMessage(e) || 'Failed to get user local data',
    //     options: {
    //       variant: 'error'
    //     }
    //   })
    // )
  }

  logOut = () => {
    clearLocalStorage()
    this.user = {}
    this.jwtToken = ''
    this.isAuthorized = false
  }
}

decorate(AuthStore, {
  userLogin: observable,
  jwtToken: observable,
  user: observable,
  isAuthorized: observable,
  username: observable,
  isLogging: observable,
  postLogin: action,
  getLocal: action,
  logOut: action
})

export default new AuthStore()
