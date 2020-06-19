import { decorate, observable, action, computed } from 'mobx'

import SnackbarStore from './Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import extendTimeFormat from 'utils/schedules/extendTimeFormat'
import {
  FULL_DAYS,
  PARTIAL_DAYS
} from 'components/HolidaySchedule/periodTypes.js'

const defaultStartTime = '00:00'
const defaultStopTime = '01:00'

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
          ({ name, type, startDay, stopDay, startTime, stopTime }) => {
            const generatedKey = performance.now().toString(36)
            const transformedPeriod = {
              id: generatedKey,
              title: name,
              type: type,
              start: startDay,
              end: stopDay
            }
            if (startTime)
              transformedPeriod.startTime = extendTimeFormat(startTime)
            if (stopTime)
              transformedPeriod.stopTime = extendTimeFormat(stopTime)

            return {
              ...transformedPeriod
            }
          }
        )
        this.periods = transformedPeriods
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
      type: PARTIAL_DAYS,
      startTime: defaultStartTime,
      stopTime: defaultStopTime
    }
  }

  updatePeriod = ({ field, value }) => {
    this.periodToAdd[field] = value
  }

  updatePeriodType = isFullDayPeriod => {
    this.periodToAdd.type = isFullDayPeriod ? FULL_DAYS : PARTIAL_DAYS
  }

  // computed: Period is valid if all fields exist for PARTIAL_DAYS type or name and dates exist for FULL_DAYS type
  get isPeriodValid() {
    const {
      name,
      type,
      startDate,
      stopDate,
      startTime,
      stopTime
    } = this.periodToAdd

    return Boolean(
      (type === PARTIAL_DAYS &&
        name &&
        startDate &&
        stopDate &&
        startTime &&
        stopTime) ||
        (type === FULL_DAYS && name && startDate && stopDate)
    )
  }

  postPeriod = ({ customerId, groupId, holidayScheduleName, closeModal }) => {
    this.isPeriodPosting = true
    const {
      name,
      type,
      startDate,
      stopDate,
      startTime,
      stopTime
    } = this.periodToAdd

    const periodToPost =
      type === FULL_DAYS
        ? {
            name: name,
            type: FULL_DAYS,
            startDay: startDate,
            stopDay: stopDate
          }
        : {
            name: name,
            type: PARTIAL_DAYS,
            startDay: startDate,
            stopDay: stopDate,
            startTime,
            stopTime
          }

    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${holidayScheduleName}/`,
        { ...periodToPost }
      )
      .then(() => {
        closeModal()
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
      })
  }
}

decorate(HolidaySchedules, {
  isPeriodValid: computed,
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  isHolidayScheduleLoading: observable,
  isPeriodPosting: observable,
  periods: observable,
  periodToAdd: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getHolidaySchedule: action,
  setPeriodToAdd: action,
  updatePeriod: action,
  postPeriod: action
})

export default new HolidaySchedules()
