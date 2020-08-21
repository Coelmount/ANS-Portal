import { decorate, observable, action } from 'mobx'
import pick from 'lodash/pick'

const DEFAULT_VALUES = {
  phoneNumber: '',
  country_code: '',
  nsn: '',
  type: ''
}

class PhoneNumber {
  constructor(phoneNumber) {
    Object.assign(this, {
      ...DEFAULT_VALUES,
      ...pick(phoneNumber, Object.keys(DEFAULT_VALUES))
    })
    this.phoneNumber = `${phoneNumber.country_code}${phoneNumber.nsn}`
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

decorate(PhoneNumber, {
  checked: observable,
  hover: observable,
  setChecked: action,
  setHover: action
})

export default PhoneNumber
