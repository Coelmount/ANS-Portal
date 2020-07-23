import { decorate, observable, action } from 'mobx'
import axios from 'utils/axios'
import basicAxios from 'axios'
import { BASE_URL } from 'utils/axios'

import SnackbarStore from './Snackbar'

import getErrorMessage from 'utils/getErrorMessage'

export class UserStore {
  updatePasswordLowAdmin = (data, callback) => {
    axios
      .put(`/session/change_password/`, data)
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: 'Password updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to change password',
          options: {
            variant: 'error'
          }
        })
      })
  }
  updatePasswordSuperAdmin = (data, callback) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
    basicAxios
      .put(`${BASE_URL}/system/users/local`, data, config)
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: 'Password updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to change password',
          options: {
            variant: 'error'
          }
        })
      })
  }
}

decorate(UserStore, {
  //   notifications: observable,
  updatePasswordLowAdmin: action,
  updatePasswordSuperAdmin: action
})

export default new UserStore()
