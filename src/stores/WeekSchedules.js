import { decorate, observable, action, toJS } from 'mobx'
import capitalize from 'lodash/capitalize'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import transformWeekDateFormat from 'utils/schedules/transformWeekDateFormat'

const defaultStartTime = '08:00'
const defaultStopTime = '09:00'
const defaultWeekDays = {
  sunday: false,
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false
}

export class WeekSchedules {
  schedules = []
  weekSchedulePeriods = []
  periods = [
    {
      id: 'default',
      startTime: defaultStartTime,
      stopTime: defaultStopTime,
      weekDays: defaultWeekDays
    }
  ]
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

  updatePeriodDayStatus = (id, day, status) => {
    // find period
    const periodsCopy = this.periods.slice(0)
    const index = this.periods.findIndex(period => period.id === id)
    const periodCopy = { ...this.periods[index] }
    // change period field and update periods array
    periodCopy.weekDays[day] = status
    periodsCopy[index] = periodCopy
    this.periods = periodsCopy
  }

  updatePeriodTime = (id, field, value) => {
    // find period
    const periodsCopy = this.periods.slice(0)
    const index = this.periods.findIndex(period => period.id === id)
    const periodCopy = { ...this.periods[index] }
    // changle time field and update periods array
    periodCopy[field] = value
    periodCopy.id = performance.now().toString(36)
    periodsCopy[index] = periodCopy
    this.periods = periodsCopy
  }

  removePeriod = id => {
    const periodsCopy = this.periods.slice(0)
    const index = this.periods.findIndex(period => period.id === id)
    periodsCopy.splice(index, 1)
    this.periods = periodsCopy
  }

  pushPeriod = () => {
    const periodsCopy = this.periods.slice(0)
    const key = performance.now().toString(36)
    periodsCopy.push({
      id: key,
      startTime: defaultStartTime,
      stopTime: defaultStopTime,
      weekDays: defaultWeekDays
    })
    this.periods = periodsCopy
  }

  postPeriod = (customerId, groupId, weekScheduleName) => {
    const promiseArray = []
    console.log(toJS(this.periods), 'periods')
    this.periods.forEach(period => {
      const periodDays = Object.keys(period.weekDays)
      const checkedDays = periodDays.filter(
        day => period.weekDays[day] === true
      )
      console.log(checkedDays, 'checkedDays')
      checkedDays.forEach(day => {
        promiseArray.push(
          axios.post(
            `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/`,
            {
              name: `${period.id} ${day}`,
              type: 'Day of the week',
              dayOfWeek: capitalize(day),
              startTime: period.startTime,
              stopTime: period.stopTime,
              active: true
            }
          )
        )
      })
    })
    Promise.all(promiseArray)
      .then(res => {
        // closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Period successfully created',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create period',
          options: {
            variant: 'error'
          }
        })
      })
    // .finally(() => (this.isSchedulePosting = false))
  }
}

decorate(WeekSchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  weekSchedulePeriods: observable,
  isWeekScheduleLoading: observable,
  periods: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getWeekSchedule: action,
  updatePeriodDayStatus: action,
  pushPeriod: action,
  updatePeriodTime: action,
  postPeriod: action
})

export default new WeekSchedules()
