import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbers/rangeFilter'

class IVR {
  ivrs = []
  isLoadingIVRs = false
  singleLvl = false
  multiLvl = false
  isLoadingLicenses = false
  addIVR = false
  isUpdatingIVR = false
  isDeletingIVR = false
  ivr = {}
  isUpdatingIVR = false
  isLoadingAnnouncement = false
  announcement = ''
  isLoadingWhiteBlackList = false
  whiteBlackList = {}
  menu = {}
  submenus = []
  isLoadingSubmenus = false
  isAddingSubmenu = false
  isDeletingSubmenu = false

  getIVRs = (tenantId, groupId) => {
    this.isLoadingIVRs = true
    this.ivrs = []
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/`)
      .then(res => (this.ivrs = res.data.ivrs))
      .finally(() => (this.isLoadingIVRs = false))
  }

  getCheckLicensesIVR = (tenantId, groupId) => {
    this.isLoadingLicenses = true
    this.singleLvl = false
    this.multiLvl = false
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/licenses/`)
      .then(res => {
        const basicAttendant = res.data.groupServices.filter(
          el => el.name === 'Auto Attendant'
        )[0]
        const standardAttendant = res.data.groupServices.filter(
          el => el.name === 'Auto Attendant - Standard'
        )[0]
        if (basicAttendant) {
          if (
            basicAttendant.allocated.unlimited === true ||
            (basicAttendant.allocated.unlimited === false &&
              basicAttendant.allocated.maximum > basicAttendant.inUse)
          ) {
            this.singleLvl = true
          } else {
            this.singleLvl = false
          }
        } else {
          this.singleLvl = false
        }
        if (standardAttendant) {
          if (
            standardAttendant.allocated.unlimited === true ||
            (standardAttendant.allocated.unlimited === false &&
              standardAttendant.allocated.maximum > standardAttendant.inUse)
          ) {
            this.multiLvl = true
          } else {
            this.multiLvl = false
          }
        } else {
          this.multiLvl = false
        }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ivrs',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isLoadingLicenses = false))
  }

  postAddIVR = (tenantId, groupId, data) => {
    this.addIVR = true
    return axios
      .post(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/`, data)
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.addIVR = false
      })
  }

  putUpdateIVR = (tenantId, groupId, ivrId, data, callback) => {
    this.isUpdatingIVR = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`,
        data
      )
      .then(res => {
        this.ivr = res.data.ivrInstance
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingIVR = false
      })
  }

  deleteIVR = (tenantId, groupId, ivrId, callback) => {
    this.isDeletingIVR = true
    axios
      .delete(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`)
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isDeletingIVR = false
      })
  }

  getIVR = (tenantId, groupId, ivrId) => {
    this.isLoadingIVR = true
    this.ivr = {}
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/`)
      .then(res => {
        this.ivr = res.data.ivrInstance
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingIVR = false
      })
  }

  putUpdateIVRMenu = (
    tenantId,
    groupId,
    ivrId,
    menuLvl,
    menuType,
    data,
    callback
  ) => {
    this.isUpdatingIVRMenu = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/${menuLvl}/${menuType}/`,
        data
      )
      .then(() => {
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update ivr menu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isUpdatingIVRMenu = false
      })
  }

  getGreetingAnnouncement = (tenantId, groupId, announcementName) => {
    this.isLoadingAnnouncement = true
    this.announcement = ''
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/announcements/content/${announcementName}/`
      )
      .then(res => {
        this.isLoadingAnnouncement = false
        this.announcement = `data:audio/mpeg;base64,${res.data.content}`
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch announcement',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingAnnouncement = false
      })
  }

  getWhiteBlackList = (tenantId, groupId, ivrId) => {
    this.isLoadingWhiteBlackList = true
    this.whiteBlackList = {}
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/call_blocking/`
      )
      .then(res => {
        this.isLoadingWhiteBlackList = false
        this.whiteBlackList = {
          ...res.data,
          allowed_numbers: res.data.allowed_numbers.map(el => ({
            phoneNumber: el,
            checked: false,
            hover: false
          }))
        }
        console.log(this.whiteBlackList)
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch announcement',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingWhiteBlackList = false
      })
  }

  getMenu = (tenantId, groupId, ivrId, menuLvl, typeMenu, route) => {
    if (route === 'main') {
      this.menu = {}
    }
    if (Object.keys(this.menu).some(el => el === route)) {
      if (this.menu[route].name === typeMenu) {
        return
      }
    }
    this.menu = { ...this.menu, [route]: { isLoading: true } }
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/${menuLvl}/${typeMenu}/`
      )
      .then(res => {
        const menuWithId = {
          ...res.data,
          keys: res.data.keys.map((el, i) => ({
            ...el,
            id: el.id ? el.id : i
          })),
          name: typeMenu,
          isLoading: false
        }
        this.menu = { ...this.menu, [route]: menuWithId }
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch menu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.menu[route].isLoading = false
      })
  }

  getSubmenus = (tenantId, groupId, ivrId) => {
    this.isLoadingSubmenus = true
    this.submenus = []
    axios
      .get(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/`
      )
      .then(res => {
        this.isLoadingSubmenus = false
        this.submenus = res.data.submenus
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch submenus',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingSubmenus = false
      })
  }

  postAddSubmenu = (tenantId, groupId, ivrId, data, callback) => {
    this.isAddingSubmenu = true
    axios
      .post(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/`,
        data
      )
      .then(() => {
        this.submenus.push(data)
        callback && callback()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create ivr',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAddingSubmenu = false))
  }

  deleteSubmenu = (tenantId, groupId, ivrId, submenuId, callback) => {
    this.isDeletingSubmenu = true
    axios
      .delete(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/submenus/${submenuId}/`
      )
      .then(() => callback && callback())
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete submenu',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isDeletingSubmenu = false))
  }
}

decorate(IVR, {
  ivrs: observable,
  isLoadingIVRs: observable,
  isLoadingLicenses: observable,
  singleLvl: observable,
  multiLvl: observable,
  addIVR: observable,
  isUpdatingIVR: observable,
  isDeletingIVR: observable,
  ivr: observable,
  isLoadingIVR: observable,
  announcement: observable,
  isLoadingAnnouncement: observable,
  isLoadingWhiteBlackList: observable,
  whiteBlackList: observable,
  isLoadingMenu: observable,
  menu: observable,
  isLoadingSubmenus: observable,
  submenus: observable,
  isAddingSubmenu: observable,
  isDeletingSubmenu: observable,
  getIVRs: action,
  getCheckLicensesIVR: action,
  postAddIVR: action,
  putUpdateIVR: action,
  deleteIVR: action,
  getIVR: action,
  putUpdateIVRMenu: action,
  getGreetingAnnouncement: action,
  getWhiteBlackList: action,
  getMenu: action,
  getSubmenus: action,
  postAddSubmenu: action,
  deleteSubmenu: action
})

export default new IVR()
