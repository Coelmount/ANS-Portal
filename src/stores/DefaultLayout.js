import { decorate, observable, action } from 'mobx'

export class DefaultLayoutStore {
  activeParentNav = null
  activeChildNav = null
  activeBasicSubChild = null
  isChildNavClosed = false

  setDefaultValues = () => {
    this.activeParentNav = null
  }

  handleActiveParentNav = parent => {
    if (this.activeParentNav === parent) {
      this.activeParentNav = null
    } else if (parent === 'schedules') {
      this.activeParentNav = parent
      this.activeChildNav = 'week_schedules'
    } else {
      this.activeParentNav = parent
      this.activeChildNav = null
    }
  }

  handleCloseNav = () => (this.activeParentNav = null)

  handleActiveChildNav = child => {
    if (this.activeBasicSubChild === 'bulk_jobs' && child === 'basic') {
      this.activeChildNav = child
      this.activeBasicSubChild = 'translations'
    } else if (this.activeChildNav === child) {
      this.activeChildNav = null
      this.isChildNavClosed = true
    } else {
      this.activeChildNav = child
      this.activeBasicSubChild = 'translations'
    }
  }

  handleActiveSubChildNav = (subChild, child) => {
    if (child === 'basic') {
      this.activeBasicSubChild = subChild
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
    } else if (urlArr[6] === 'ivr') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'ivr'
    } else if (urlArr[6] === 'time_based_routing') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'time_based_routing'
    } else if (urlArr[6] === 'basic') {
      this.activeParentNav = 'ans_instances'
      this.activeChildNav = 'basic'
    } else if (urlArr[6] === 'week_schedules') {
      this.activeParentNav = 'schedules'
      this.activeChildNav = 'week_schedules'
    } else if (urlArr[6] === 'holiday_schedules') {
      this.activeParentNav = 'schedules'
      this.activeChildNav = 'holiday_schedules'
    }
  }
}

decorate(DefaultLayoutStore, {
  activeParentNav: observable,
  activeChildNav: observable,
  activeBasicSubChild: observable,
  handleActiveParentNav: action,
  handleActiveChildNav: action,
  handleActiveSubChildNav: action,
  handleCloseNav: action,
  getActiveNavsAfterUpdate: action,
  setDefaultValues: action
})

export default new DefaultLayoutStore()
