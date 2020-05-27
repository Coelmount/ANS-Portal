import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class WeekSchedules {
  schedules = []
  isSchedulesLoading = true

  getSchedules = (customerId, groupId) => {
    this.isSchedulesLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/time_schedules/`)
      .then(res => {
        this.schedules = res.data.schedules
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch schedules',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isSchedulesLoading = false))
  }

  deleteSchedule = ({ customerId, groupId, name, callback }) => {
    this.isDeletingSchedule = true
    axios
      .delete(`/tenants/${customerId}/groups/${groupId}/time_schedules/`, {
        data: {
          schedules: [{ name: name }]
        }
      })
      .then(() => {
        callback()
        this.isDeletingSchedule = false
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete event',
          options: {
            variant: 'error'
          }
        })
        if (e.response.status === 400) {
          this.isDeletingSchedule = false
        }
      })
      .finally(() => {
        this.isDeletingSchedule = false
      })
  }

  // getSchedules = (customerId, groupId) => {
  //   this.isSchedulesLoading = true
  //   axios
  //     .post(`/tenants/${customerId}/groups/${groupId}/time_schedules/`, {
  //       name: 'Call Test Time Schedule',
  //       periods: [
  //         {
  //           name: 'Call Task Period 4',
  //           type: 'Day of the week',
  //           dayOfWeek: 'Monday',
  //           startTime: '10:30',
  //           stopTime: '12:30'
  //         },
  //         {
  //           name: 'Call Task Period 5',
  //           type: 'Day of the month',
  //           dayOfMonth: 12,
  //           startTime: '12:45',
  //           stopTime: '15:15',
  //           active: false
  //         }
  //       ]
  //     })
  //     .then(res => {
  //       console.log('posted')
  //     })
  //     .catch(e => {
  //       SnackbarStore.enqueueSnackbar({
  //         message: getErrorMessage(e) || 'Failed to fetch schedules',
  //         options: {
  //           variant: 'error'
  //         }
  //       })
  //     })
  //     .finally(() => (this.isSchedulesLoading = false))
  // }
}

decorate(WeekSchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  getSchedules: action,
  deleteSchedule: action
})

export default new WeekSchedules()
