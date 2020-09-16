import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'
import set from 'lodash/set'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import { removeEmpty } from 'utils/removeEmpty'
import { toJS } from 'mobx'

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
    this.rows = []
    this.selectGroups = []
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
    this.customer = {
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
    axios
      .get(`/tenants/${customerId}/groups/${groupId}`)
      .then(res => {
        if (res.status === 200) {
          this.customer.groupId = groupId
          merge(this.customer, res.data)
          this.getSubaccountStatus(customerId, groupId)
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
  }

  getSubaccountStatus = (customerId, groupId) => {
    this.isLoadingStatus = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/properties/suspension/`)
      .then(
        res =>
          (this.customer = {
            ...this.customer,
            status:
              res.data.suspensionStatus === ''
                ? 'Active'
                : res.data.suspensionStatus
          })
      )
      .finally(() => {
        this.isLoadingStatus = false
        this.isLoadingSubaccount = false
      })
  }

  deleteSubaccount = ({ tenantId, groupId, callback }) => {
    this.isDeletingSubaccount = true
    axios
      .delete(`/tenants/${tenantId}/groups/${groupId}/`)
      .then(res => {
        if (res.status === 200) {
          this.getSubaccounts(tenantId)
        }
        SnackbarStore.enqueueSnackbar({
          message: 'Subaccount deleted successfully',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete subaccount',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        callback && callback()
        this.isDeletingSubaccount = false
      })
  }

  updateCustomer = (tenantId, groupId, handleClose) => {
    this.addUpdateCustomer = true
    const customer = toJS(this.customer)
    const data = removeEmpty(customer)
    return axios
      .put(`/tenants/${tenantId}/groups/${groupId}`, data)
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
