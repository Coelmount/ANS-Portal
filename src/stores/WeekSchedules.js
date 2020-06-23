import { decorate, observable, action, toJS, computed } from 'mobx'
import capitalize from 'lodash/capitalize'

import SnackbarStore from './Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import transformWeekDateFormat from 'utils/schedules/transformWeekDateFormat'
import transformTime from 'utils/schedules/transformTime'
import transformToCustomPeriodsFormat from 'utils/schedules/transformToCustomPeriodsFormat'
import getPromiseArrComparedPeriods from 'utils/schedules/getPromiseArrComparedPeriods'

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
  currentPeriodId = ''
  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isWeekScheduleLoading = true
  isPeriodPosting = false
  isScheduleEditing = false
  isPeriodDeleting = false
  isThisSlotDeleting = false
  isAllPeriodsDeleting = false

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
          message: getErrorMessage(e) || 'Failed to delete schedule',
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
          const generatedKey = performance.now().toString(36)
          return {
            id: index,
            title: `${generatedKey} ${item.dayOfWeek.toLowerCase()}`,
            start: transformWeekDateFormat(item.dayOfWeek, item.startTime),
            end: transformWeekDateFormat(item.dayOfWeek, item.stopTime),
            initName: item.name
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

  updatePeriod = ({ id, field, value }) => {
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

  // SET DAY ON EMPTY TIMESLOT SELECT
  setPeriodToAdd = (day, start, stop) => {
    const updatedWeekDays = {
      ...defaultWeekDays
    }
    updatedWeekDays[day] = true

    this.periods = [
      {
        id: performance.now().toString(36),
        startTime: start,
        stopTime: stop,
        weekDays: updatedWeekDays
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
              name: `blabla 12 ${period.id} ${day}`,
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

    this.initPeriods.forEach(initPeriod => {
      const isPeriodActive = initPeriodsIds.some(id => id === initPeriod.id)
      // IF PERIOD REMOVED
      if (!isPeriodActive) {
        const weekDays = Object.keys(initPeriod.weekDays)
        weekDays.forEach(day => {
          if (initPeriod.weekDays[day] === true) {
            const periodName = initPeriod.initName
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
      const updatedPeriod = this.periods.find(
        period => period.id === initPeriod.id
      )

      // NOT DELETED PERIOD SCENARIO
      if (updatedPeriod !== undefined) {
        const promiseArrComparedPeriods = getPromiseArrComparedPeriods(
          initPeriod,
          updatedPeriod,
          customerId,
          groupId,
          weekScheduleName
        )
        promiseArrComparedPeriods.forEach(period => promiseArr.push(period))
      }
    })
    Promise.all(promiseArr)
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Periods successfully edited',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to edit periods',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isScheduleEditing = false
      })
  }

  findPeriodAndSetToEdit = event => {
    const periodId = event.title.split(' ')[0]
    this.currentPeriodId = periodId
    const initPeriod = this.periods.find(
      initPeriod => initPeriod.id === periodId
    )
    this.periods = [initPeriod]
  }

  putPeriod = (customerId, groupId, weekScheduleName, closeModal) => {
    let promiseArr = []
    const updatedPeriod = this.periods[0]
    const initPeriod = this.initPeriods.find(
      initPeriod => initPeriod.id === this.currentPeriodId
    )

    // PERIOD DELETED
    if (!updatedPeriod) {
      const weekDays = Object.keys(initPeriod.weekDays)
      weekDays.forEach(day => {
        if (initPeriod.weekDays[day] === true) {
          const periodName = initPeriod.initName
          promiseArr.push(
            axios.delete(
              `/tenants/${customerId}/groups/${groupId}/time_schedule1s/${weekScheduleName}/${periodName}/`
            )
          )
        }
      })
    } else {
      // PERIOD UPDATED
      const promiseArrComparedPeriods = getPromiseArrComparedPeriods(
        initPeriod,
        updatedPeriod,
        customerId,
        groupId,
        weekScheduleName
      )
      promiseArrComparedPeriods.forEach(period => promiseArr.push(period))
    }

    Promise.all(promiseArr)
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Period successfully edited',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to edit period',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isScheduleEditing = false
      })
  }

  deletePeriod = (
    customerId,
    groupId,
    weekScheduleName,
    periodName,
    closeModal
  ) => {
    this.isPeriodDeleting = true
    let promiseArr = []

    this.periods.forEach(period => {
      if (period.id === periodName) {
        const weekDays = Object.keys(period.weekDays)
        weekDays.forEach(day => {
          if (period.weekDays[day] === true) {
            promiseArr.push(
              axios.delete(
                `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${period.initName}/`
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
        this.isPeriodDeleting = false
      })
  }

  deleteThisTimeSlot = (
    customerId,
    groupId,
    weekScheduleName,
    fullPeriodId,
    closeModal
  ) => {
    this.isThisSlotDeleting = true

    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${fullPeriodId}/`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Timeslot successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete timeslot',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isThisSlotDeleting = false
      })
  }

  deleteAllPeriods = (customerId, groupId, weekScheduleName, closeModal) => {
    this.isAllPeriodsDeleting = true
    let promiseArr = []

    this.periods.forEach(period => {
      const weekDays = Object.keys(period.weekDays)
      weekDays.forEach(day => {
        if (period.weekDays[day] === true) {
          promiseArr.push(
            axios.delete(
              `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${period.initName}/`
            )
          )
        }
      })
    })

    Promise.all(promiseArr)
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'All timeslots successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete all timeslots',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAllPeriodsDeleting = false
      })
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
  isPeriodDeleting: observable,
  isThisSlotDeleting: observable,
  isAllPeriodsDeleting: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getWeekSchedule: action,
  updatePeriodDayStatus: action,
  pushPeriod: action,
  updatePeriod: action,
  postPeriod: action,
  setDefaultPeriods: action,
  putPeriods: action,
  findPeriodAndSetToEdit: action,
  putPeriod: action,
  deletePeriod: action,
  deleteThisTimeSlot: action,
  deleteAllPeriods: action,
  setPeriodToAdd: action
})

export default new WeekSchedules()
