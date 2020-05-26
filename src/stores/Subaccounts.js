import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class SubaccountsStore {
  rows = []
  step = 1
  customer = {
    groupId: '',
    groupName: '',
    defaultDomain: '',
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
  addUpdateCustomer = false
  selectGroups = []

  getSubaccounts = tenantId => {
    this.isLoadingSubaccounts = true
    axios
      .get(`/tenants/${tenantId}/groups`)
      .then(res => {
        const result = res.data.groups.map((item, index) => {
          return { id: index, hover: false, checked: false, ...item }
        })
        this.rows = result

        this.selectGroups = res.data.groups.map(group => ({
          value: group.groupId,
          label: group.groupName
        }))
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch subaccounts',
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
      .get(`/tenants/${customerId}/groups/${groupId}`)
      .then(res => {
        if (res.status === 200) {
          merge(this.customer, res.data)
          this.isLoadingSubaccount = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch subaccount',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isLoadingSubaccount = false))
  }

  deleteSubaccount = ({ tenantId, groupId, callback }) => {
    this.isDeletingSubaccount = true
    axios
      .delete(`/tenants/${tenantId}/groups/${groupId}/`)
      .then(res => {
        if (res.status === 200) {
          this.getSubaccounts(tenantId)
          callback()
          this.isDeletingSubaccount = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete subaccount',
          options: {
            variant: 'error'
          }
        })
      )
  }

  updateCustomer = (tenantId, groupId, handleClose) => {
    this.addUpdateCustomer = true
    return axios
      .put(`/tenants/${tenantId}/groups/${groupId}`, this.customer)
      .then(res => {
        merge(this.customer, res.data)
        handleClose()
        SnackbarStore.enqueueSnackbar({
          message: 'Subaccount updated successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update subaccount',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.addUpdateCustomer = false
      })
  }

  changeStep = step => {
    this.step = step
  }

  changeCustomer = (variable, value) => {
    set(this.customer, variable, value)
  }
}

decorate(SubaccountsStore, {
  step: observable,
  rows: observable,
  customer: observable,
  isLoadingSubaccounts: observable,
  isDeletingSubaccount: observable,
  isLoadingSubaccount: observable,
  selectGroups: observable,
  addUpdateCustomer: observable,
  getSubaccounts: action,
  getSubaccount: action,
  deleteSubaccount: action,
  changeStep: action,
  changeCustomer: action,
  updateCustomer: action,
  getDefaultValues: action
})

export default new SubaccountsStore()
