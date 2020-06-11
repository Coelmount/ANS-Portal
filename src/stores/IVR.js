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

  getIVRs = (tenantId, groupId) => {
    this.isLoadingIVRs = true
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/ivrs/`)
      .then(res => (this.ivrs = res.data.ivrs))
      .finally(() => (this.isLoadingIVRs = false))
  }

  getCheckLicensesIVR = (tenantId, groupId) => {
    this.isLoadingLicenses = true
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
    axios
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
}

decorate(IVR, {
  ivrs: observable,
  isLoadingIVRs: observable,
  isLoadingLicenses: observable,
  singleLvl: observable,
  multiLvl: observable,
  addIVR: observable,
  getIVRs: action,
  getCheckLicensesIVR: action,
  postAddIVR: action
})

export default new IVR()
