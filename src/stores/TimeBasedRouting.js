import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class TimeBasedRouting {
  timeBaseRoutes = []
  isLoadingTBR = true
  isTimeBasedRoutePosting = false

  getTimeBasedRoutes = ({ customerId, groupId }) => {
    this.timeBaseRoutes = []
    this.isLoadingTBR = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`
      )
      .then(res => {
        this.timeBaseRoutes = res.data.time_based_routes.map(item => {
          return {
            ...item,
            checked: false,
            hover: false
          }
        })
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

  postTimeBasedRoute = ({ customerId, groupId, name, closeModal }) => {
    this.isTimeBasedRoutePosting = true
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`,
        {
          name,
          defaultDestination: '+3201234568'
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: `Time based routing instance successfully created`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to create time based routing instance`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isTimeBasedRoutePosting = false
      })
  }
}

decorate(TimeBasedRouting, {
  timeBaseRoutes: observable,
  isLoadingTBR: observable,
  isTimeBasedRoutePosting: observable,
  getTimeBasedRoutes: action,
  postTimeBasedRoute: action
})

export default new TimeBasedRouting()
