import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P1 } from 'utils/axios'

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
  selectGroups = []

  getSubaccounts = id => {
    this.isLoadingSubaccounts = true
    axios.get(`${PROXY_P1}/tenants/${id}/groups`).then(res => {
      if (res.status === 200) {
        this.selectGroups = res.data.groups.map(group => ({
          value: group.groupId,
          label: group.groupName
        }))
        this.rows = res.data.groups
        this.isLoadingSubaccounts = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  getSubaccount = (customerId, groupId) => {
    this.isLoadingSubaccount = true
    axios
      .get(`${PROXY_P1}/tenants/${customerId}/groups/${groupId}`)
      .then(res => {
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
    axios
      .delete(`${PROXY_P1}/tenants/${tenantId}/groups/${groupId}/`)
      .then(res => {
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
  selectGroups: observable,
  getSubaccounts: action,
  getSubaccount: action,
  deleteSubaccount: action
})

export default new SubaccountsStore()
