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

  deleteSchedule = ({ customerId, groupId, closeModal, name }) => {
    this.isDeletingSchedule = true
    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/time_schedules/${name}/`
      )
      .then(() => {
        closeModal()
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete event',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDeletingSchedule = false
      })
  }

  // getSchedules = (customerId, groupId) => {
  //   this.isSchedulesLoading = true
  //   axios
  //     .post(`/tenants/${customerId}/groups/${groupId}/time_schedules/`, {
  //       name: 'Time Schedule 3'
  //       // periods: [
  //       //   {
  //       //     name: 'Call Task Period 4',
  //       //     type: 'Day of the week',
  //       //     dayOfWeek: 'Monday',
  //       //     startTime: '10:30',
  //       //     stopTime: '12:30'
  //       //   },
  //       //   {
  //       //     name: 'Call Task Period 5',
  //       //     type: 'Day of the month',
  //       //     dayOfMonth: 12,
  //       //     startTime: '12:45',
  //       //     stopTime: '15:15',
  //       //     active: false
  //       //   }
  //       // ]
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
