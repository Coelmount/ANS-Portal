import { decorate, observable, action } from 'mobx'

class TimeBasedRoute {
  constructor(route, index) {
    const { name, defaultDestination } = route
    console.log(index, name, defaultDestination)
    this.id = index
    this.name = name
    this.defaultDestination = defaultDestination
    this.checked = false
    this.hover = false
  }
}

export default TimeBasedRoute
