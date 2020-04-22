import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_CUSTOM_ANS, PROXY_P6 } from 'utils/axios'
import SnackbarStore from '../Snackbar'

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

  changeStep = (step) => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  setDefaultEntitlementTypes = () => {
    const newEntitlementTypes = this.entitlementTypes.map((item) => {
      let result = { ...item, hover: false, checked: false }
      return result
    })
    this.entitlementTypes = newEntitlementTypes
  }

  updateCheckedArr = (selected) => {
    this.checkedArr = selected
  }

  getEntitlements = (id) => {
    this.isLoadingEntitlements = true
    axios
      .get(`${PROXY_P6}/tenants/${id}/entitlements`)
      .then((res) => {
        this.entitlements = res.data.entitlments
        this.entitlementsIdArr = res.data.entitlments.map(
          (item) => item.license_model_id
        )
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch entitlements',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingEntitlements = false
      })
  }

  getEntitlementTypes = () => {
    this.isLoadingEntitlementTypes = true
    axios
      .get(`${PROXY_P6}/entitlement_types`)
      .then((res) => {
        const result = res.data.customer_licenses.filter((item) => {
          return !this.entitlementsIdArr.some(
            (entitlementId) => entitlementId === item.id
          )
        })
        this.entitlementTypes = result.map((item) => {
          return { checked: false, hover: false, ...item }
        })
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to fetch entitlement types',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingEntitlementTypes = false
      })
  }

  postEntitlements = (callback, id, entitlements) => {
    this.isSending = true
    entitlements.forEach((item) => {
      axios
        .post(`${PROXY_P6}/tenants/${id}/entitlements`, {
          license_model_id: item.id,
          entitlement: item.entitlement
        })
        .then(() => {
          this.isSending = false
          callback(3)
        })
        .catch((e) =>
          SnackbarStore.enqueueSnackbar({
            message: 'Failed to create entitlements',
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
      .put(`${PROXY_P6}/tenants/${tenantId}/entitlements/${entitlementId}`, {
        entitlement: total
      })
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to update entitlement',
          options: {
            variant: 'error'
          }
        })
      )
  }

  deleteEntitlements = (tenantId, entitlementId) => {
    return axios
      .delete(`${PROXY_P6}/tenants/${tenantId}/entitlements/${entitlementId}`)
      .catch((e) =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to delete entitlement',
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
  deleteEntitlements: action
})

export default new Entitlements()
