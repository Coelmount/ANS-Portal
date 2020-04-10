import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import { PROXY_CUSTOM_ANS, PROXY_P6 } from 'utils/axios'

export class Entitlements {
  entitlements = []
  entitlementsIdArr = []
  entitlementTypes = []
  checkedArr = []
  totalEntitlements = []
  step = 1
  closeModal = false
  isLoadingEntitlements = true
  isSending = false

  changeStep = (step) => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  updateCheckedArr = (selected) => {
    this.checkedArr = selected
  }

  getEntitlements = (id) => {
    this.isLoadingEntitlements = true
    axios.get(`${PROXY_P6}/tenants/${id}/entitlements`).then((res) => {
      if (res.status === 200) {
        this.entitlements = res.data.entitlments
        this.entitlementsIdArr = res.data.entitlments.map(
          (item) => item.license_model_id
        )
        this.isLoadingEntitlements = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  getEntitlementTypes = () => {
    this.isLoadingEntitlementTypes = true
    axios.get(`${PROXY_P6}/entitlement_types`).then((res) => {
      if (res.status === 200) {
        this.isLoadingEntitlementTypes = false
        const result = res.data.customer_licenses.filter((item) => {
          return !this.entitlementsIdArr.some(
            (entitlementId) => entitlementId === item.id
          )
        })
        this.entitlementTypes = result.map((item) => {
          return { checked: false, hover: false, ...item }
        })
      } else {
        console.log(res, 'error')
      }
    })
  }

  updateTotalEntitlements = (value, entitlementId) => {
    this.newTotalNumbers.add(value, entitlementId)
    this.arrTotals = [...this.newTotalNumbers.arr]
    this.objTotals = this.arrTotals.reduce(
      (prev, { id, value }) => ({
        ...prev,
        [id]: value
      }),
      {}
    )
    if (this.newTotalNumbers.arr.length > 0) this.isTotalEmpty = false
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
        .finally(() => {
          this.isSending = false
        })
    })
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
  postEntitlements: action,
  updateCheckedArr: action
})

export default new Entitlements()
