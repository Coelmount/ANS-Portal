import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class CreateCustomer {
  step = 1
}

decorate(CustomersStore, {
  step: observable,
  getCustomers: action
})

export default createContext(new CreateCustomer())
