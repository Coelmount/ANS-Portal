import { decorate, observable, action, computed } from 'mobx'

import SnackbarStore from './Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import extendTimeFormat from 'utils/schedules/extendTimeFormat'
import {
  FULL_DAYS,
  PARTIAL_DAYS
} from 'components/HolidaySchedule/periodTypes.js'
import getFullCountryNameFromCode from 'utils/schedules/getFullCountryNameFromCode'
import { toJS } from 'mobx'

const defaultStartTime = '00:00'
const defaultStopTime = '01:00'
const defaultImportData = {
  country: {
    code: '',
    label: '',
    phone: ''
  },
  year: ''
}

export class HolidaySchedules {
  schedules = []
  periods = []
  modalPeriod = {}
  importCountriesList = []
  importYearsList = []
  importData = defaultImportData

  isSchedulesLoading = true
  isDeletingSchedule = false
  isSchedulePosting = false
  isHolidayScheduleLoading = true
  isPeriodPosting = false
  isPeriodPuting = false
  isPeriodDeleting = false
  isImportCountriesListLoading = true
  isImportYearsListLoading = true
  isHolidaysImporting = false

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
    this.modalPeriod = {
      id: performance.now().toString(36),
      type: PARTIAL_DAYS,
      startTime: defaultStartTime,
      stopTime: defaultStopTime
    }
  }

  updatePeriod = ({ field, value }) => {
    this.modalPeriod[field] = value
  }

  updatePeriodType = isFullDayPeriod => {
    this.modalPeriod.type = isFullDayPeriod ? FULL_DAYS : PARTIAL_DAYS
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
    } = this.modalPeriod

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
    } = this.modalPeriod

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

  setPeriodToEdit = event => {
    this.modalPeriod = {
      startDate: event.start,
      stopDate: event.end,
      name: event.title,
      ...event
    }
  }

  // CLEAR DATA AFTER MODALS CLOSE
  setDefaultPeriods = () => {
    this.periods = []
    this.initPeriods = []
  }

  putPeriod = ({ customerId, groupId, holidayScheduleName, closeModal }) => {
    this.isPeriodPuting = true
    const {
      name,
      startDate,
      stopDate,
      type,
      startTime,
      stopTime
    } = this.modalPeriod

    const periodToSend = {
      startDay: startDate,
      stopDay: stopDate,
      name,
      type
    }
    if (type === PARTIAL_DAYS) {
      periodToSend.startTime = startTime
      periodToSend.stopTime = stopTime
    }
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${holidayScheduleName}/${name}/`,
        { ...periodToSend }
      )
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
        this.isPeriodPuting = false
      })
  }

  deletePeriod = ({
    customerId,
    groupId,
    holidayScheduleName,
    periodId,
    closeModal
  }) => {
    this.isPeriodDeleting = true

    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${holidayScheduleName}/${periodId}/`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Period successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete period',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isPeriodDeleting = false
      })
  }

  updateImportData = ({ field, value }) => {
    this.importData[field] = value
  }

  getImportCountriesList = () => {
    this.isImportCountriesListLoading = true
    axios
      .get(`/generic/holidays/countries`)
      .then(res => {
        this.importCountriesList = res.data.countries.map(countryCode => {
          return {
            code: countryCode,
            label: getFullCountryNameFromCode(countryCode)
          }
        })
      })
      .finally(() => {
        this.isImportCountriesListLoading = false
      })
  }

  getImportYearsList = () => {
    this.isImportYearsListLoading = true
    const country = this.importData.country.code
    axios
      .get(`/generic/holidays/countries/SA/years`)
      .then(res => {
        this.importYearsList = res.data.years.map(year => {
          return {
            label: year,
            value: year
          }
        })
      })
      .finally(() => (this.isImportYearsListLoading = false))
  }

  importPublicHolidays = ({
    customerId,
    groupId,
    holidayScheduleName,
    closeModal
  }) => {
    this.isHolidaysImporting = true
    const {
      year,
      country: { code }
    } = this.importData

    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/calendar_schedules/${holidayScheduleName}/public_holidays/`,
        {
          country: code,
          year: Number(year),
          type: 'public'
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Public holidays successfully imported',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to import public holidays',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => (this.isHolidaysImporting = false))
  }

  get isImportButtonActive() {
    const { year, country } = this.importData
    return Boolean(year && country)
  }

  // Clear input data on close import modal
  clearImportData = () => {
    this.importData = defaultImportData
  }
}

decorate(HolidaySchedules, {
  isImportButtonActive: computed,
  schedules: observable,
  isSchedulesLoading: observable,
  isDeletingSchedule: observable,
  isSchedulePosting: observable,
  isHolidayScheduleLoading: observable,
  isPeriodPosting: observable,
  isPeriodPuting: observable,
  isPeriodDeleting: observable,
  isImportCountriesListLoading: observable,
  isImportYearsListLoading: observable,
  periods: observable,
  modalPeriod: observable,
  importData: observable,
  isHolidaysImporting: observable,
  importCountriesList: observable,
  importYearsList: observable,
  getSchedules: action,
  deleteSchedule: action,
  postSchedule: action,
  getHolidaySchedule: action,
  setPeriodToAdd: action,
  updatePeriod: action,
  postPeriod: action,
  setPeriodToEdit: action,
  setDefaultPeriods: action,
  putPeriod: action,
  deletePeriod: action,
  postImport: action,
  updateImportData: action,
  importPublicHolidays: action,
  clearImportData: action,
  getImportCountriesList: action,
  getImportYearsList: action
})

export default new HolidaySchedules()
