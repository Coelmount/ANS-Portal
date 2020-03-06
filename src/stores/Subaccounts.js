import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class SubaccountsStore {
  rows = []
  isLoadingSubaccounts = true
  isDeletingSubaccount = false

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

  deleteSubaccount = ({ tenantId, groupId, callback }) => {
    this.isDeletingSubaccount = true
    axios.delete(`/tenants/${tenantId}/groups/${groupId}/`).then(res => {
      if (res.status === 200) {
        this.getSubaccounts(tenantId)
        callback()
        this.isDeletingSubaccount = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}

decorate(SubaccountsStore, {
  rows: observable,
  isLoadingSubaccounts: observable,
  isDeletingSubaccount: observable,
  getSubaccounts: action,
  deleteSubaccount: action
})

export default createContext(new SubaccountsStore())