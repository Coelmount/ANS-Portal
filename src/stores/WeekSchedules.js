import { decorate, observable, action, toJS, computed } from 'mobx'
import capitalize from 'lodash/capitalize'

import SnackbarStore from './Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import transformWeekDateFormat from 'utils/schedules/transformWeekDateFormat'
import transformTime from 'utils/schedules/transformTime'
import transformToCustomPeriodsFormat from 'utils/schedules/transformToCustomPeriodsFormat'

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
      id: performance.now().toString(36),
      startTime: defaultStartTime,
      stopTime: defaultStopTime,
      weekDays: defaultWeekDays
    }
  ]
  initPeriods = []
  initPeriod = []
  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isWeekScheduleLoading = true
  isPeriodPosting = false
  isScheduleEditing = false

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
        const transformedPeriods = periods.map((item, index) => {
          return {
            id: index,
            title: item.name,
            start: transformWeekDateFormat(item.dayOfWeek, item.startTime),
            end: transformWeekDateFormat(item.dayOfWeek, item.stopTime)
          }
        })
        this.weekSchedulePeriods = transformedPeriods
        const transformedToCustomFormatPeriods = transformToCustomPeriodsFormat(
          transformedPeriods
        )
        this.periods = transformedToCustomFormatPeriods
        this.initPeriods = transformedToCustomFormatPeriods
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

    // change time field and update periods array
    periodCopy[field] = value
    periodCopy.id = id
    periodsCopy[index] = periodCopy
    this.periods = periodsCopy
  }

  // computed: === TRUE IF time and at least 1 day are setted
  get isPeriodsValid() {
    return this.periods.every(period => {
      const weekDays = Object.values(period.weekDays)
      const isDaysValid = weekDays.some(day => day === true)
      return isDaysValid && period.startTime && period.stopTime
    })
  }

  // CLEAR DATA AFTER MODALS CLOSE
  setDefaultPeriods = () => {
    this.periods = [
      {
        id: performance.now().toString(36),
        startTime: defaultStartTime,
        stopTime: defaultStopTime,
        weekDays: defaultWeekDays
      }
    ]
    this.initPeriods = []
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

  postPeriod = (customerId, groupId, weekScheduleName, closeModal) => {
    this.isPeriodPosting = true
    const promiseArray = []

    this.periods.forEach(period => {
      const periodDays = Object.keys(period.weekDays)
      const checkedDays = periodDays.filter(
        day => period.weekDays[day] === true
      )
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

  putPeriods = (customerId, groupId, weekScheduleName, closeModal) => {
    this.isScheduleEditing = true
    let promiseArr = []
    const initPeriodsIds = this.periods.map(initPeriod => initPeriod.id)
    console.log(toJS(this.initPeriod), 'init periods')
    console.log(toJS(this.periods), 'periods')
    this.initPeriods.forEach(initPeriod => {
      const isPeriodActive = initPeriodsIds.some(id => id === initPeriod.id)
      // IF PERIOD REMOVED
      if (!isPeriodActive) {
        const weekDays = Object.keys(initPeriod.weekDays)
        weekDays.forEach(day => {
          if (initPeriod.weekDays[day] === true) {
            const periodName = `${initPeriod.id} ${day}`
            promiseArr.push(
              axios.delete(
                `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${periodName}/`
              )
            )
          }
        })
      }
    })

    this.initPeriods.forEach(initPeriod => {
      const weekDaysArr = Object.keys(initPeriod.weekDays)
      const updatedPeriod = this.periods.find(
        period => period.id === initPeriod.id
      )

      // NOT DELETED PERIOD SCENARIO
      if (updatedPeriod !== undefined) {
        // IF TIME UPDATED
        if (
          initPeriod.startTime !== updatedPeriod.startTime ||
          initPeriod.stopTime !== updatedPeriod.stopTime
        ) {
          weekDaysArr.forEach(day => {
            const periodName = `${initPeriod.id} ${day}`
            if (
              updatedPeriod !== undefined &&
              updatedPeriod.weekDays &&
              initPeriod.weekDays[day] === true &&
              updatedPeriod.weekDays[day] === true
            ) {
              promiseArr.push(
                axios.put(
                  `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${periodName}/`,
                  {
                    name: `${initPeriod.id} ${day}`,
                    type: 'Day of the week',
                    dayOfWeek: capitalize(day),
                    startTime: updatedPeriod.startTime,
                    stopTime: updatedPeriod.stopTime
                  }
                )
              )
            }
          })
        }

        weekDaysArr.forEach(day => {
          console.log(day, 'day')
          console.log(initPeriod.weekDays[day], 'initPeriod.weekDays[day]')
          console.log(
            updatedPeriod.weekDays[day],
            'updatedPeriod.weekDays[day]'
          )
          const periodName = `${updatedPeriod.id} ${day}`
          // IF NEW DAY CHECKED (ADDED)
          if (
            initPeriod.weekDays[day] === false &&
            updatedPeriod.weekDays[day] === true
          ) {
            promiseArr.push(
              axios.post(
                `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/`,
                {
                  name: periodName,
                  type: 'Day of the week',
                  dayOfWeek: capitalize(day),
                  startTime: updatedPeriod.startTime,
                  stopTime: updatedPeriod.stopTime
                }
              )
            )
          }
          // IF DAY UNCHECKED (DELETED)
          if (
            initPeriod.weekDays[day] === true &&
            updatedPeriod.weekDays[day] === false
          ) {
            promiseArr.push(
              axios.delete(
                `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${periodName}/`
              )
            )
          }
        })
      }
    })
    Promise.all(promiseArr)
      .then(() => {
        closeModal()
      })
      .finally(() => {
        this.isScheduleEditing = false
      })
  }

  findEventAndSetToEdit = event => {
    // console.log(event, 'event')
    const eventId = event.title.split(' ')[0]
    // console.log(toJS(this.initPeriods), 'init per')
    const eventInInitPeriods = this.initPeriods.find(
      initPeriod => initPeriod.id === eventId
    )
    this.periods = [eventInInitPeriods]
    // this.initPeriod = [eventInInitPeriods]
    // console.log(eventInInitPeriods, 'eventInInitPeriods')
  }
}
decorate(WeekSchedules, {
  isPeriodsValid: computed,
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  isPeriodPosting: observable,
  weekSchedulePeriods: observable,
  isWeekScheduleLoading: observable,
  periods: observable,
  initPeriods: observable,
  isScheduleEditing: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getWeekSchedule: action,
  updatePeriodDayStatus: action,
  pushPeriod: action,
  updatePeriodTime: action,
  postPeriod: action,
  setDefaultPeriods: action,
  putPeriods: action,
  findEventAndSetToEdit: action
})

export default new WeekSchedules()
