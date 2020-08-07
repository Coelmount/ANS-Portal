import { decorate, observable, action } from 'mobx'
import pick from 'lodash/pick'

const DEFAULT_VALUES = {
  userId: '',
  name: '',
  defaultDestination: ''
}

class TimeBasedRoute {
  constructor(route, index) {
    // const defaultValuesKeys = Object.getOwnPropertyNames(DEFAULT_VALUES)
    // defaultValuesKeys.forEach(defaultKey => {
    //   // console.log(DEFAULT_VALUES, 'DEFAULT_VALUES')
    //   this[defaultKey] = route[defaultKey]
    // })

    Object.assign(this, {
      ...DEFAULT_VALUES,
      ...pick(route, Object.keys(DEFAULT_VALUES))
    })

    this.id = index
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

decorate(TimeBasedRoute, {
  checked: observable,
  hover: observable,
  setChecked: action,
  setHover: action
})

export default TimeBasedRoute
