import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class Entitlements {
  entitlements = []
  step = 1
  closeModal = false

  changeStep = step => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
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
    // this.isLoadingCustomer = true
    axios.get(`/custom/ans/entitlement_types`).then(res => {
      if (res.status === 200) {
        this.entitlements = res.data.customer_licenses
        console.log(res)
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
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action,
  postEntitlements: action
})

export default createContext(new Entitlements())
