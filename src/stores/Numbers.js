import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'

import axios from 'utils/axios'

export class NumbersStore {
  availableNumbers = []
  isLoadingNumbers = false

  getAvailableNumbers = () => {
    axios.get(`/custom/ans/available_numbers/`).then(res => {
      console.log(res)
      this.isLoadingNumbers = false
    })
  }
}

decorate(NumbersStore, {
  availableNumbers: observable,
  isLoadingNumbers: observable,
  getAvailableNumbers: action
})

export default new NumbersStore()
