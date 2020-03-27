import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class Entitlements {
  step = 1
  closeModal = false

  changeStep = step => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  getEntitlements = () => {
    // this.isLoadingCustomer = true
    axios.get(`/entitlement_types/`).then(res => {
      if (res.status === 200) {
        console.log(res, 'res')
        // this.isLoadingCustomer = false
      } else {
        console.log(res, 'error')
      }
    })
  }
}

decorate(Entitlements, {
  step: observable,
  closeModal: observable,
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action
})

export default createContext(new Entitlements())
