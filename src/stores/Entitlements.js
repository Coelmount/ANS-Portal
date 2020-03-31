import { createContext } from 'react'
import { decorate, observable, action, values } from 'mobx'

import axios from 'utils/axios'

export class Entitlements {
  entitlements = []
  selectedEntitlements = []
  totalEntitlements = []
  step = 1
  closeModal = false
  isLoadingEntitlements = true

  changeStep = step => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  updateSelectedArr = indexesArr => {
    this.selectedEntitlements = indexesArr.map(entIndex => {
      return this.entitlements[entIndex]
    })
  }

  updateTotalEntitlements = (value, entitlementId) => {
    if (this.totalEntitlements.length > 0) {
      this.totalEntitlements.forEach((entitlement, index) => {
        if (entitlement.id === entitlementId) {
          entitlement.total = value
        } else if (
          entitlement.id !== entitlementId &&
          index === this.totalEntitlements.length - 1
        ) {
          this.totalEntitlements.push({ total: value, id: entitlementId })
        }
      })
    } else this.totalEntitlements.push({ total: value, id: entitlementId })
    console.log(this.totalEntitlements, 'arr mobx')
  }

  // postEntitlements = () => {
  //   // this.isLoadingCustomer = true
  //   axios
  //     .post(`/custom/ans/tenants/10440/entitlements`, {
  //       // id: 1,
  //       license_model_id: 2,
  //       // entitlements: 80,
  //       entitlement: 3
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         // this.entitlements = res.data.customer_licenses
  //         console.log(res)
  //       } else {
  //         console.log(res, 'error')
  //       }
  //     })
  // }

  getEntitlements = () => {
    this.isLoadingEntitlements = true
    axios.get(`/custom/ans/entitlement_types`).then(res => {
      if (res.status === 200) {
        this.entitlements = res.data.customer_licenses
        this.isLoadingEntitlements = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}

decorate(Entitlements, {
  step: observable,
  closeModal: observable,
  entitlements: observable,
  isLoadingEntitlements: observable,
  totalEntitlements: observable,
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action,
  postEntitlements: action,
  updateSelectedArr: action,
  updateTotalEntitlements: action
})

export default createContext(new Entitlements())
