import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class HolidaySchedules {
  schedules = []
  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isHolidayScheduleLoading = true

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

  deleteSchedule = ({ customerId, groupId, closeModal, name }) => {
    this.isDeletingSchedule = true
    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${name}/`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Schedule successfully deleted',
          options: {
            variant: 'success'
          }
        })
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

  postSchedule = ({ customerId, groupId, closeModal, name }) => {
    this.isSchedulePosting = true
    axios
      .post(`/tenants/${customerId}/groups/${groupId}/calendar_schedules/`, {
        name
      })
      .then(res => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Schedule successfully created',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create schedule',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isSchedulePosting = false))
  }

  getHolidaySchedule = (customerId, groupId, scheduleName) => {
    this.isHolidayScheduleLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${scheduleName}/`,
        {
          params: { full_list: true }
        }
      )
      .then(res => {
        console.log(res.data, 'res.data')
        // const periods = res.data.periods
        // const transformedPeriods = periods.map((item, index) => {
        //   const generatedKey = performance.now().toString(36)
        //   return {
        //     id: index,
        //     title: `${generatedKey} ${item.dayOfWeek.toLowerCase()}`,
        //     start: transformWeekDateFormat(item.dayOfWeek, item.startTime),
        //     end: transformWeekDateFormat(item.dayOfWeek, item.stopTime),
        //     initName: item.name
        //   }
        // })
        // this.weekSchedulePeriods = transformedPeriods
        // const transformedToCustomFormatPeriods = transformToCustomPeriodsFormat(
        //   transformedPeriods
        // )
        // this.periods = transformedToCustomFormatPeriods
        // this.initPeriods = transformedToCustomFormatPeriods
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch holiday schedule',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isHolidayScheduleLoading = false))
  }
}

decorate(HolidaySchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  isHolidayScheduleLoading: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getHolidaySchedule: action
})

export default new HolidaySchedules()
