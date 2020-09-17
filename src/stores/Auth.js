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
  twoFactorPayload = ''
  isAuthorized = localStorage.getItem('isAuthorized', true)
    ? !!localStorage.getItem('isAuthorized', true)
    : false
  username = ''
  isLogging = false

  handleSuccessfullAuth = ({ data, history }) => {
    const newJwtToken = data.access_token
    const newRefreshToken = data.refresh_token

    localStorage.setItem('jwtToken', newJwtToken)
    localStorage.setItem('refreshJwtToken', newRefreshToken)

    this.jwtToken = newJwtToken
    this.userLogin = data
    this.getLocal()

    if (data.ids) {
      localStorage.setItem('ids', JSON.stringify(data.ids))
      if (data.ids.tenant_id && data.ids.group_id) {
        history.push(
          `/customers/${data.ids.tenant_id}/subaccounts/${data.ids.group_id}/ans_instances`
        )
        return
      }
      if (data.ids.tenant_id) {
        history.push(`/customers/${data.ids.tenant_id}/access_numbers`)
        return
      }
    }
    localStorage.removeItem('ids')
  }

  postLogin = (data, history) => {
    this.jwtToken = localStorage.getItem('jwtToken')
    this.userLogin = {}
    this.isLogging = true
    axios
      .post(`${BASE_URL}/auth/login`, data)
      .then(res => {
        if (res.status === 200) {
          const twoFactorPayload = '2fa_payload'
          if (res.data[twoFactorPayload]) {
            this.twoFactorPayload = res.data[twoFactorPayload]
            history.push(`/2fa`)
            return
          }
          this.handleSuccessfullAuth({ data: res.data, history })
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

  postTwoFactorCode = ({ code, trust, history }) => {
    // this.isLogging = true

    const payload = {
      code,
      trust,
      '2fa_payload': this.twoFactorPayload
    }
    axios
      .post(`${BASE_URL}/auth/2fa`, payload)
      .then(res => {
        this.handleSuccessfullAuth({ data: res.data, history })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            'Failed to send two factor authentication code',
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

  postSendResetPasswordMail = (data, callback) => {
    axios
      .post(`${BASE_URL}/auth/reset-password`, data)
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to send reset password mail',
          options: {
            variant: 'error'
          }
        })
      )
  }

  putResetPassword = (token, data, callback) => {
    axios
      .put(`${BASE_URL}/auth/reset-password/${token}`, data)
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: 'Password successfully updated',
          options: {
            variant: 'success'
          }
        })
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update password',
          options: {
            variant: 'error'
          }
        })
      )
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
  postTwoFactorCode: action,
  getLocal: action,
  logOut: action,
  postSendResetPasswordMail: action,
  putResetPassword: action
})

export default new AuthStore()
