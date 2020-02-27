import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class SubaccountsStore {
  rows = []
  isLoadingSubaccounts = true

  getSubaccounts = id => {
    this.isLoadingSubaccounts = true
    axios.get(`/tenants/${id}/groups`).then(res => {
      if (res.status === 200) {
        this.rows = res.data.groups
        this.isLoadingSubaccounts = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  deleteSubaccount = id => {
    axios.delete(`/tenants/${id}/groups`)
  }
}

decorate(SubaccountsStore, {
  rows: observable,
  isLoadingSubaccounts: observable,
  getSubaccounts: action,
  deleteSubaccount: action
})

export default createContext(new SubaccountsStore())
