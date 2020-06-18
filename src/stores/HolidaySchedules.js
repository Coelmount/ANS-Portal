import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

const defaultTime = '00:00'

export class HolidaySchedules {
  schedules = []
  periods = []
  periodToAdd = {}
  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isHolidayScheduleLoading = true
  isPeriodPosting = false

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
        const periods = res.data.periods
        const transformedPeriods = periods.map(
          ({ name, startDay, stopDay }) => {
            const generatedKey = performance.now().toString(36)
            return {
              id: generatedKey,
              title: name,
              type: 'Full days',
              start: startDay,
              end: stopDay
            }
          }
        )
        this.periods = transformedPeriods
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

  // SET DAY ON EMPTY TIMESLOT SELECT
  setPeriodToAdd = () => {
    this.periodToAdd = {
      id: performance.now().toString(36),
      startTime: defaultTime,
      stopTime: defaultTime
    }
  }

  updatePeriodName = name => {
    this.periodToAdd.name = name
  }

  updatePeriodDate = (field, value) => {
    this.periodToAdd[field] = value
  }

  updatePeriodTime = ({ field, value }) => {
    this.periodToAdd[field] = value
  }

  postPeriod = ({ customerId, groupId, holidayScheduleName, closeModal }) => {
    this.isPeriodPosting = true
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${holidayScheduleName}/`,
        {
          name: this.periodToAdd.name,
          type: 'Full days',
          startDay: this.periodToAdd.startDate,
          stopDay: this.periodToAdd.stopDate
        }
      )
      .then(() => {
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
      .finally(() => {
        this.isPeriodPosting = false
        closeModal()
      })
  }
}

decorate(HolidaySchedules, {
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  isHolidayScheduleLoading: observable,
  periods: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getHolidaySchedule: action,
  setPeriodToAdd: action,
  updatePeriodName: action,
  updatePeriodDate: action,
  updatePeriodTime: action,
  postPeriod: action
})

export default new HolidaySchedules()
