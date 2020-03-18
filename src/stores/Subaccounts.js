import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'

export class SubaccountsStore {
  rows = []
  subaccount = {
    groupId: '',
    groupName: '',
    contactInformation: {
      name: '',
      phoneNumber: '',
      emailAddress: ''
    },
    addressInformation: {
      addressLine1: '',
      postalCode: '',
      city: '',
      country: ''
    }
  }
  isLoadingSubaccounts = true
  isDeletingSubaccount = false
  isLoadingSubaccount = true

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

  getSubaccount = (customerId, groupId) => {
    this.isLoadingSubaccount = true
    axios.get(`/tenants/${customerId}/groups/${groupId}`).then(res => {
      if (res.status === 200) {
        merge(this.subaccount, res.data)
        this.isLoadingSubaccount = false
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
  subaccount: observable,
  isLoadingSubaccounts: observable,
  isDeletingSubaccount: observable,
  isLoadingSubaccount: observable,
  getSubaccounts: action,
  getSubaccount: action,
  deleteSubaccount: action
})

export default createContext(new SubaccountsStore())
