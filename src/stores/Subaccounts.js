import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'

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
  isAddingCustomer = false
  selectGroups = []

  getSubaccounts = (tenantId) => {
    this.isLoadingSubaccounts = true
    axios
      .get(`${PROXY_P6}/tenants/${tenantId}/groups`)
      .then((res) => {
        this.rows = res.data.groups

        this.selectGroups = res.data.groups.map((group) => ({
          value: group.groupId,
          label: group.groupName
        }))
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch subaccounts',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingSubaccounts = false
      })
  }

  getDefaultValues = () => {
    this.rows = []
  }

  getSubaccount = (customerId, groupId) => {
    this.isLoadingSubaccount = true
    axios
      .get(`${PROXY_P6}/tenants/${customerId}/groups/${groupId}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, 'res.data')
          merge(this.subaccount, res.data)
          this.isLoadingSubaccount = false
        } else {
          console.log(res, 'error')
        }
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch subaccount',
          options: {
            variant: 'error'
          }
        })
      )
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
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to delete subaccount',
          options: {
            variant: 'error'
          }
        })
      )
  }

  updateCustomer = (tenantId, groupId) => {
    this.isAddingCustomer = true
    return axios
      .put(`${PROXY_P6}/tenants/${tenantId}/groups/${groupId}`, this.subaccount)
      .then((res) => {
        if (res.status === 200) {
          merge(this.customer, res.data)
          this.isAddingCustomer = false
        }
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to update subaccounts',
          options: {
            variant: 'error'
          }
        })
      )
  }

  changeStep = (step) => {
    this.step = step
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
  isAddingCustomer: observable,
  getSubaccounts: action,
  getSubaccount: action,
  deleteSubaccount: action,
  changeStep: action,
  changeCustomer: action,
  updateCustomer: action,
  getDefaultValues: action
})

export default new SubaccountsStore()
