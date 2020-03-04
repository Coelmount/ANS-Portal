import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CustomersStore {
  rows = []
  isLoadingCustomers = true
  isDeletingCustomer = false

  getCustomers = () => {
    this.isLoadingCustomers = true
    axios.get(`/tenants/`).then(res => {
      if (res.status === 200) {
        this.rows = res.data.tenants
        this.isLoadingCustomers = false
      } else {
        console.log(res, 'error')
      }
    })
  }

  deleteCustomer = ({ id, callback }) => {
    this.isDeletingCustomer = true
    axios.delete(`/tenants/${id}/`).then(res => {
      if (res.status === 200) {
        this.getCustomers()
        callback()
        this.isDeletingCustomer = false
      } else {
        console.log(res, 'error')
      }
    })
  }
  // test methods ****
  // addCustomer = () => {
  //   axios
  //     .post(`/tenants/`, {
  //       tenantId: `my_tenant32`,
  //       name: 'Name007',
  //       type: 'Enterprise',
  //       defaultDomain: 'netaxis.be'
  //     })
  //     .then(res => {
  //       if (res.status === 200) {
  //         console.log('added')
  //       } else {
  //         console.log(res, 'error')
  //       }
  //     })
  // }

  addCustomer = () => {
    axios
      .post(`/tenants/ent0003/groups/`, {
        groupId: `my_grpup3212`,
        groupName: 'Group007',
        userLimit: 25
      })
      .then(res => {
        if (res.status === 200) {
          console.log('added')
        } else {
          console.log(res, 'error')
        }
      })
  }
}
decorate(CustomersStore, {
  rows: observable,
  isLoadingCustomers: observable,
  isDeletingCustomer: observable,
  getCustomers: action,
  deleteCustomer: action,
  addCustomer: action
})

export default createContext(new CustomersStore())
