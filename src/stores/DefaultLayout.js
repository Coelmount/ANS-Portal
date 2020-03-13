import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

export class DefaultLayoutStore {
  activeParentNav = null
  activeChildNav = null
  activeSubChild = 'destinations'

  handleActiveParentNav = parent => {
    if (this.activeParentNav === parent) {
      this.activeParentNav = null
    } else {
      this.activeParentNav = parent
      this.activeChildNav = null
    }
  }

  handleActiveChildNav = child => {
    if (this.activeSubChild === 'destination_groups' && child === 'advanced') {
      this.activeChildNav = child
      this.activeSubChild = 'destinations'
    } else if (this.activeChildNav === child) {
      this.activeChildNav = null
    } else {
      this.activeChildNav = child
      this.activeSubChild = 'destinations'
    }
  }

  handleActiveSubChildNav = subChild => {
    this.activeSubChild = subChild
  }
}

decorate(DefaultLayoutStore, {
  activeParentNav: observable,
  activeChildNav: observable,
  activeSubChild: observable,
  handleActiveParentNav: action,
  handleActiveChildNav: action,
  handleActiveSubChildNav: action
})

export default createContext(new DefaultLayoutStore())
