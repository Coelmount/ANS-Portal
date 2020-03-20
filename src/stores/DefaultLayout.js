import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

export class DefaultLayoutStore {
  activeParentNav = null
  activeChildNav = null
  activeBasicSubChild = 'translations'
  activeAdvancedSubChild = 'destinations'

  handleActiveParentNav = parent => {
    if (this.activeParentNav === parent) {
      this.activeParentNav = null
    } else {
      this.activeParentNav = parent
      this.activeChildNav = null
    }
  }

  handleActiveChildNav = child => {
    if (
      this.activeAdvancedSubChild === 'destination_groups' &&
      child === 'advanced'
    ) {
      this.activeChildNav = child
      this.activeAdvancedSubChild = 'destinations'
    } else if (this.activeBasicSubChild === 'bulk_jobs' && child === 'basic') {
      this.activeChildNav = child
      this.activeBasicSubChild = 'translations'
    } else if (this.activeChildNav === child) {
      this.activeChildNav = null
    } else {
      this.activeChildNav = child
      this.activeAdvancedSubChild = 'destinations'
      this.activeBasicSubChild = 'translations'
    }
  }

  handleActiveSubChildNav = (subChild, child) => {
    if (child === 'basic') {
      this.activeBasicSubChild = subChild
      console.log('basic', subChild)
    } else if (child === 'advanced') {
      this.activeAdvancedSubChild = subChild
    }
  }
}

decorate(DefaultLayoutStore, {
  activeParentNav: observable,
  activeChildNav: observable,
  activeBasicSubChild: observable,
  activeAdvancedSubChild: observable,
  handleActiveParentNav: action,
  handleActiveChildNav: action,
  handleActiveSubChildNav: action
})

export default createContext(new DefaultLayoutStore())
