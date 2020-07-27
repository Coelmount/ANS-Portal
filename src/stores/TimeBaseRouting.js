import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class TimeBaseRouting {
  timeBaseRouting = []
  isLoadingTBR = false

  getTimeBaseRouting = (tenantId, groupId) => {
    this.timeBaseRouting = []
    this.isLoadingTBR = true
    axios
      .get(`/tenants/${tenantId}/groups/${groupId}/services/time_based_routing`)
      .then(res => {
        this.timeBaseRouting = res.data.time_based_routes
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingTBR = false
      })
  }
}

decorate(TimeBaseRouting, {
  timeBaseRouting: observable,
  isLoadingTBR: observable,
  getTimeBaseRouting: action
})

export default new TimeBaseRouting()
