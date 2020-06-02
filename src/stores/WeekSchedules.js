import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import transformWeekDateFormat from 'utils/schedules/transformWeekDateFormat'

export class WeekSchedules {
  schedules = []
  weekSchedulePeriods = []
  currentPeriods = []
  period = {
    weekDays: {
      monday: true,
      tuesday: false,
      wednesday: false
    }
  }
  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isWeekScheduleLoading = true

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
      .post(`/tenants/${customerId}/groups/${groupId}/time_schedules/`, {
        name,
        periods: [
          {
            name: 'APIO Test Group Period 1',
            type: 'Day of the week',
            dayOfWeek: 'Wednesday',
            startTime: '15:30',
            stopTime: '17:30'
          },
          {
            name: 'APIO Test Group Period 2',
            type: 'Day of the week',
            dayOfWeek: 'Thursday',
            startTime: '15:30',
            stopTime: '17:30'
          }
          // {
          //   name: 'APIO Test Group Period 1',
          //   type: 'Day of the week',
          //   dayOfWeek: 'Friday',
          //   startTime: '10:30',
          //   stopTime: '12:30'
          // }
        ]
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

  getWeekSchedule = (customerId, groupId, scheduleName) => {
    this.isWeekScheduleLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/time_schedules/${scheduleName}`,
        {
          params: { full_list: true }
        }
      )
      .then(res => {
        const periods = res.data.periods
        this.weekSchedulePeriods = periods.map((item, index) => {
          return {
            id: index,
            title: item.name,
            start: transformWeekDateFormat(item.dayOfWeek, item.startTime),
            end: transformWeekDateFormat(item.dayOfWeek, item.stopTime)
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch week schedule',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isWeekScheduleLoading = false))
  }

  changePeriod = (day, status) => {
    const newWeekDays = { ...this.period.weekDays }
    newWeekDays[day] = status
    this.period.weekDays = newWeekDays
  }
}

decorate(WeekSchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  weekSchedulePeriods: observable,
  isWeekScheduleLoading: observable,
  period: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getWeekSchedule: action,
  changePeriod: action
})

export default new WeekSchedules()
