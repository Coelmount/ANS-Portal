import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import set from 'lodash/set'

export class SubaccountsStore {
  rows = []
  step = 1
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

  getSubaccounts = (id) => {
    this.isLoadingSubaccounts = true
    axios.get(`${PROXY_P6}/tenants/${id}/groups`).then((res) => {
      if (res.status === 200) {
        this.selectGroups = res.data.groups.map((group) => ({
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
      .get(`${PROXY_P6}/tenants/${customerId}/groups/${groupId}`)
      .then((res) => {
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
      .delete(`${PROXY_P6}/tenants/${tenantId}/groups/${groupId}/`)
      .then((res) => {
        if (res.status === 200) {
          this.getSubaccounts(tenantId)
          callback()
          this.isDeletingSubaccount = false
        } else {
          console.log(res, 'error')
        }
      })
  }

  updateSubaccount = (tenantId) => {
    return axios
      .put(`${PROXY_P6}/tenants/${tenantId}/groups/groupId/`, this.customer)
      .then((res) => {
        if (res.status === 200) {
          merge(this.customer, res.data)
        }
      })
  }

  changeStep = (step) => {
    this.step = step
    console.log(step, 'sub change step')
  }

  changeCustomer = (variable, value) => {
    set(this.subaccount, variable, value)
  }
}

decorate(SubaccountsStore, {
  step: observable,
  rows: observable,
  subaccount: observable,
  isLoadingSubaccounts: observable,
  isDeletingSubaccount: observable,
  isLoadingSubaccount: observable,
  selectGroups: observable,
  getSubaccounts: action,
  getSubaccount: action,
  deleteSubaccount: action,
  changeStep: action,
  changeCustomer: action
})

export default createContext(new SubaccountsStore())
