import { decorate, observable, action } from 'mobx'
import TotalNumbers from './TotalNumbers'

import axios from 'utils/axios'

export class Entitlements {
  entitlements = []
  selectedEntitlements = []
  filteredArr = []
  checkedArr = []
  totalEntitlements = []
  step = 1
  closeModal = false
  isLoadingEntitlements = true
  isSending = false
  newTotalNumbers = new TotalNumbers()
  isTotalEmpty = true
  arrTotals = []
  objTotals = {}
  resLength = 0

  changeStep = step => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  updateFilteredArr = idArr => {
    this.filteredArr = idArr
    this.updateSelectedArr()
  }
  updateCheckedArr = idArr => {
    this.checkedArr = idArr
    this.updateSelectedArr()
  }

  updateSelectedArr = () => {
    let resultArr = []
    this.entitlements.forEach(obj => {
      if (
        this.checkedArr.includes(obj.id) &&
        this.filteredArr.includes(obj.id)
      ) {
        resultArr.push(obj)
      }
    })
    this.selectedEntitlements = resultArr
    this.resLength = resultArr.length
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
    console.log(this.newTotalNumbers.arr, 'post it')
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
  //     .get(`/p5/tenants/bury/group/buryGROUP01/numbers`)
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
  resLength: observable,
  changeStep: action,
  setDefaultEntitlementsValues: action,
  getEntitlements: action,
  postEntitlements: action,
  updateSelectedArr: action,
  updateFilteredArr: action,
  updateCheckedArr: action,
  updateTotalEntitlements: action
  // selectedEntitlements: observable
})

export default new Entitlements()
