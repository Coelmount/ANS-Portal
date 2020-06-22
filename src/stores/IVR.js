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
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}`,
        data
      )
      .then(() => {
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

  putUpdateIVRMenu = (tenantId, groupId, ivrId, menuType, data, callback) => {
    this.isUpdatingIVRMenu = true
    axios
      .put(
        `/tenants/${tenantId}/groups/${groupId}/services/ivrs/${ivrId}/menus/${menuType}/`,
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
  getIVRs: action,
  getCheckLicensesIVR: action,
  postAddIVR: action,
  putUpdateIVR: action,
  deleteIVR: action,
  getIVR: action,
  putUpdateIVRMenu: action
})

export default new IVR()
