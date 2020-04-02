import { createContext } from 'react'
import { decorate, observable, action, values, toJS } from 'mobx'
import TotalNumbers from './TotalNumbers'

import axios from 'utils/axios'

export class Entitlements {
  entitlements = []
  selectedEntitlements = []
  totalEntitlements = []
  step = 1
  closeModal = false
  isLoadingEntitlements = true
  isSending = false
  newTotalNumbers = new TotalNumbers()
  isTotalEmpty = true
  arrTotals = []
  objTotals = {}

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

  postEntitlements = callback => {
    this.isSending = true
    axios.get(`/custom/ans/entitlement_types`).then(res => {
      //mock request
      if (res.status === 200) {
        this.isSending = false
        callback(3)
      } else {
        console.log(res, 'error')
      }
    })
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

  // getEntitlements = () => {
  //   axios
  //     .get(`/custom/ans/tenants/bury/group/buryGROUP01/numbers`)
  //     .then(res => {
  //       console.log(res, 'post res')
  //     })
  //     .catch(error => {
  //       console.log(error, 'error')
  //     })
  // }
}

decorate(Entitlements, {
  step: observable,
  closeModal: observable,
  entitlements: observable,
  isLoadingEntitlements: observable,
  totalEntitlements: observable,
  isSending: observable,
  isTotalEmpty: observable,
  arrTotals: observable,
  objTotals: observable,
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action,
  postEntitlements: action,
  updateSelectedArr: action,
  updateTotalEntitlements: action
})

export default createContext(new Entitlements())
