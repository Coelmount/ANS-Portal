import { decorate, observable, action } from 'mobx'

class TimeBasedRoute {
  constructor({ name, defaultDestination }, index) {
    this.id = index
    this.name = name
    this.defaultDestination = defaultDestination
    this.checked = false
    this.hover = false
  }

  handleReverseState = (field, newState) => {
    this[field] = newState
  }
}

decorate(TimeBasedRoute, {
  checked: observable,
  hover: observable,
  handleReverseState: action
})

export default TimeBasedRoute
