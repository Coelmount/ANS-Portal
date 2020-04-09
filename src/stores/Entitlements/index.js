import { decorate, observable, action } from 'mobx'
import TotalNumbers from './TotalNumbers'

import axios from 'utils/axios'
import { PROXY_CUSTOM_ANS, PROXY_P6 } from 'utils/axios'

export class Entitlements {
  entitlements = []
  entitlementTypes = []
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

  changeStep = (step) => {
    this.step = step
  }

  setDefaultEntitlementsValues = () => {
    this.step = 1
  }

  updateFilteredArr = (idArr) => {
    this.filteredArr = idArr
    this.updateSelectedArr()
  }
  updateCheckedArr = (idArr) => {
    this.checkedArr = idArr
    this.updateSelectedArr()
  }

  getEntitlements = (id) => {
    this.isLoadingEntitlements = true
    axios.get(`${PROXY_P6}/tenants/${id}/entitlements`).then((res) => {
      if (res.status === 200) {
        console.log(res.data.entitlments, 'res.data.entitlment')
        this.entitlements = res.data.entitlments
        this.isLoadingEntitlements = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  getEntitlementTypes = () => {
    this.isLoadingEntitlements = true
    axios.get(`${PROXY_P6}/entitlement_types`).then((res) => {
      if (res.status === 200) {
        console.log(res.data, 'ent types res data')
        this.isLoadingEntitlements = false
        this.entitlementTypes = res.data.customer_licenses
      } else {
        console.log(res, 'error')
      }
    })
  }
  updateSelectedArr = () => {
    let resultArr = []
    this.entitlementTypes.forEach((obj) => {
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

  postEntitlements = (callback, id) => {
    this.isSending = true
    console.log(this.newTotalNumbers.arr, 'this.newTotalNumbers.arr')
    console.log(
      {
        id: this.newTotalNumbers.arr[0].id,
        entitlements: this.newTotalNumbers.arr[0].value
      },
      'to send ent'
    )
    axios
      .post(`${PROXY_P6}/tenants/${id}/entitlements`, {
        license_model_id: this.newTotalNumbers.arr[0].id,
        entitlements: this.newTotalNumbers.arr[0].value
      })
      .then(() => {
        this.isSending = false
        callback(3)
      })
      .finally(() => {
        this.isSending = false
      })
  }

  //mock request
  // postEntitlements = (callback) => {
  //   this.isSending = true
  //   axios.get(`${PROXY_P6}/entitlement_types`).then((res) => {
  //     if (res.status === 200) {
  //       this.isSending = false
  //       callback(3)
  //     } else {
  //       console.log(res, 'error')
  //     }
  //   })
  //   console.log(this.newTotalNumbers.arr, 'post it')
  // }
}

decorate(Entitlements, {
  step: observable,
  closeModal: observable,
  entitlements: observable,
  entitlementTypes: observable,
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
  getEntitlementTypes: action,
  postEntitlements: action,
  updateSelectedArr: action,
  updateFilteredArr: action,
  updateCheckedArr: action,
  updateTotalEntitlements: action
  // selectedEntitlements: observable
})

export default new Entitlements()
