import { decorate, observable, action } from 'mobx'
import pick from 'lodash/pick'

const DEFAULT_VALUES = {
  name: '',
  phoneNumber: ''
}

class AnsDestination {
  constructor(ansIntance) {
    Object.assign(this, {
      ...DEFAULT_VALUES,
      ...pick(ansIntance, Object.keys(DEFAULT_VALUES))
    })
    this.checked = false
    this.hover = false
  }

  setChecked = value => {
    this.checked = value
  }

  setHover = value => {
    this.hover = value
  }
}

decorate(AnsDestination, {
  checked: observable,
  hover: observable,
  setChecked: action,
  setHover: action
})

export default AnsDestination
