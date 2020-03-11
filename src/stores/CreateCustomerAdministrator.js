import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CreateCustomerAdminStore {
  admin = {
    userId: '',
    firstName: '',
    lastName: '',
    language: '',
    password: ''
  }

  setAdminInfo = (valueKey, value) => {
    for (let key in this.admin) {
      if (valueKey === key) {
        this.admin[key] = value
      }
    }
  }

  addCustomerAdmin = ({ id, closeModal }) => {
    axios
      .post(`/tenants/${id}/admins/`, {
        userId: this.admin.userId,
        firstName: this.admin.firstName,
        lastName: this.admin.lastName,
        language: this.admin.language,
        password: this.admin.password
      })
      .then(res => {
        if (res.status === 201) {
          console.log('added')
          closeModal()
        } else {
          console.log(res, 'error')
        }
      })
  }
}
decorate(CreateCustomerAdminStore, {
  admin: observable,
  addCustomerAdmin: action,
  setAdminInfo: action
})
export default createContext(new CreateCustomerAdminStore())
