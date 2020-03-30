import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import axios from 'axios'
import { LOGIN_URL } from 'utils/axios'

export class AuthStore {
  token = localStorage.getItem('token')
  user = {}
  userLogin = {}
  isAuthorized = localStorage.getItem('isAuthorized', true)
    ? !!localStorage.getItem('isAuthorized', true)
    : false

  postLogin = (data, history) => {
    axios.post(`${LOGIN_URL}/auth/login`, data).then(res => {
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
  }

  getLocal = () => {
    axios
      .get(`${LOGIN_URL}/system/users/local`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      .then(res => {
        if (res.status === 200) {
          this.user = res.data
          localStorage.setItem('isAuthorized', true)
          this.isAuthorized = true
        } else {
          localStorage.removeItem('isAuthorized')
          this.isAuthorized = false
        }
      })
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
  postLogin: action,
  getLocal: action,
  logOut: action
})

export default createContext(new AuthStore())
