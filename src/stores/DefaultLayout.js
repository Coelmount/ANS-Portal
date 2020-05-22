import { decorate, observable, action } from 'mobx'

export class DefaultLayoutStore {
  activeParentNav = null
  activeChildNav = null
  activeBasicSubChild = null
  activeAdvancedSubChild = null
  isChildNavClosed = false

  setDefaultValues = () => {
    this.activeParentNav = null
  }

  handleActiveParentNav = parent => {
    if (this.activeParentNav === parent) {
      this.activeParentNav = null
    } else {
      this.activeParentNav = parent
      this.activeChildNav = null
    }
  }

  handleCloseNav = () => (this.activeParentNav = null)

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
      this.isChildNavClosed = true
    } else {
      this.activeChildNav = child
      this.activeAdvancedSubChild = 'destinations'
      this.activeBasicSubChild = 'translations'
    }
  }

  handleActiveSubChildNav = (subChild, child) => {
    if (child === 'basic') {
      this.activeBasicSubChild = subChild
    } else if (child === 'advanced') {
      this.activeAdvancedSubChild = subChild
    }
  }

  getActiveNavsAfterUpdate = url => {
    const urlArr = url.split('/')
    if (urlArr[7] === 'translations') {
      this.activeParentNav = 'ans_instances'
      if (this.isChildNavClosed === false) {
        this.activeChildNav = 'basic'
        this.activeBasicSubChild = 'translations'
      }
    } else if (urlArr[7] === 'bulk_jobs') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'basic'
      this.activeBasicSubChild = 'bulk_jobs'
    } else if (urlArr[7] === 'destinations') {
      this.activeParentNav = 'ans_instances'
      if (this.isChildNavClosed === false) {
        this.activeChildNav = 'advanced'
        this.activeAdvancedSubChild = 'destinations'
      }
    } else if (urlArr[7] === 'destination_groups') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'advanced'
      this.activeAdvancedSubChild = 'destination_groups'
    } else if (urlArr[6] === 'ivr') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'ivr'
    } else if (urlArr[6] === 'time_based_routing') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'time_based_routing'
    } else if (urlArr[6] === 'basic') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'basic'
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
  handleActiveSubChildNav: action,
  handleCloseNav: action,
  getActiveNavsAfterUpdate: action,
  setDefaultValues: action
})

export default new DefaultLayoutStore()
