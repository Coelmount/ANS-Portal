import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class HolidaySchedules {
  schedules = []
  isSchedulesLoading = true

  getSchedules = (customerId, groupId) => {
    this.isSchedulesLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/calendar_schedules/`)
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

  // getSchedules = (customerId, groupId) => {
  //   this.isSchedulesLoading = true
  //   axios
  //     .post(`/tenants/${customerId}/groups/${groupId}/calendar_schedules/`, {
  //       name: 'APIO Test Calendar Schedule',
  //       periods: [
  //         {
  //           name: 'APIO Test Group Period 1',
  //           type: 'Full days',
  //           startDay: '2018-05-01',
  //           stopDay: '2018-05-05'
  //         },
  //         {
  //           name: 'APIO Test Group Period 2',
  //           type: 'Partial days',
  //           startDay: '2018-05-07',
  //           stopDay: '2018-05-12',
  //           startTime: '10:30',
  //           stopTime: '18:30'
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

decorate(HolidaySchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  getSchedules: action
})

export default new HolidaySchedules()
