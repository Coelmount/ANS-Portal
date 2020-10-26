import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class Entitlements {
  entitlements = []
  entitlementsIdArr = []
  entitlementTypes = []
  checkedArr = []
  totalEntitlements = []
  step = 1
  closeModal = false
  isLoadingEntitlements = true
  isLoadingEntitlementTypes = true
  isSending = false

  changeStep = step => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  setDefaultTableValues = () => {
    this.entitlements = []
    this.entitlementsIdArr = []
    this.entitlementTypes = []
    this.checkedArr = []
    this.totalEntitlements = []
    this.closeModal = false
    this.isLoadingEntitlements = true
    this.isLoadingEntitlementTypes = true
    this.isSending = false
  }

  setDefaultEntitlementTypes = () => {
    const newEntitlementTypes = this.entitlementTypes.map(item => {
      let result = { ...item, hover: false, checked: false }
      return result
    })
    this.entitlementTypes = newEntitlementTypes
  }

  updateCheckedArr = selected => {
    this.checkedArr = selected
  }

  getEntitlements = id => {
    this.isLoadingEntitlements = true
    this.entitlements = []
    this.entitlementsIdArr = []
    axios
      .get(`/tenants/${id}/entitlements`)
      .then(res => {
        this.entitlements = res.data.entitlements ? res.data.entitlements : []
        this.entitlementsIdArr = res.data.entitlements.map(
          item => item.license_model_id
        )
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch entitlements',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingEntitlements = false
      })
  }

  getEntitlementTypes = isFilterNeeded => {
    this.isLoadingEntitlementTypes = true
    this.entitlementTypes = []
    axios
      .get(`/entitlement_types`)
      .then(res => {
        // filter for customer level OR full result for system level
        const result = isFilterNeeded
          ? res.data.customer_licenses.filter(item => {
              return !this.entitlementsIdArr.some(
                entitlementId => entitlementId === item.id
              )
            })
          : res.data.customer_licenses
        this.entitlementTypes = result.map(item => {
          return { checked: false, hover: false, ...item }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch entitlement types',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingEntitlementTypes = false
      })
  }

  postEntitlements = (id, entitlements, callback) => {
    this.isSending = true
    entitlements.forEach(item => {
      axios
        .post(`/tenants/${id}/entitlements`, {
          license_model_id: item.id,
          entitlement: item.entitlement
        })
        .then(() => {
          callback && callback()
          SnackbarStore.enqueueSnackbar({
            message: 'Entitlements added successfully',
            options: {
              variant: 'success'
            }
          })
        })
        .catch(e =>
          SnackbarStore.enqueueSnackbar({
            message: getErrorMessage(e) || 'Failed to create entitlements',
            options: {
              variant: 'error'
            }
          })
        )
        .finally(() => {
          this.isSending = false
        })
    })
  }

  putTotalEntitlements = (tenantId, entitlementId, total) => {
    axios
      .put(`/tenants/${tenantId}/entitlements/${entitlementId}`, {
        entitlement: total
      })
      .then(() =>
        SnackbarStore.enqueueSnackbar({
          message: 'Entitlement updated successfully',
          options: {
            variant: 'success'
          }
        })
      )
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update entitlement',
          options: {
            variant: 'error'
          }
        })
      )
  }

  deleteEntitlements = (tenantId, entitlementId) => {
    return axios
      .delete(`/tenants/${tenantId}/entitlements/${entitlementId}`)
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete entitlement',
          options: {
            variant: 'error'
          }
        })
      )
  }
}

decorate(Entitlements, {
  step: observable,
  closeModal: observable,
  entitlements: observable,
  entitlementTypes: observable,
  totalEntitlements: observable,
  isLoadingEntitlements: observable,
  isLoadingEntitlementTypes: observable,
  isSending: observable,
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action,
  getEntitlementTypes: action,
  setDefaultEntitlementTypes: action,
  postEntitlements: action,
  updateCheckedArr: action,
  putTotalEntitlements: action,
  deleteEntitlements: action,
  setDefaultTableValues: action
})

export default new Entitlements()
