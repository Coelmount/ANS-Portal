import { decorate, observable, action, computed, runInAction } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import getRandomColor from 'utils/schedules/getRandomColor'
import transformWeekDateFormat from 'utils/schedules/transformWeekDateFormat'
import { WEEK_PERIOD_TYPE } from 'utils/types/scheduleTypes'
import PhoneNumber from './substores/PhoneNumber'
import AnsInstance from './substores/AnsInstance'
import AnsDestination from './substores/AnsDestination'
import IvrInstance from './substores/IvrInstance'

export class TimeSchedules {
  step = 1
  totalPages = 0
  defaultDestination = ''
  destinationScheduleName = ''
  destinationName = ''
  scheduleNameToEdit = ''
  currentTimeSchedule = {}
  scheduleIndexToEdit = null
  schedules = []
  countries = []
  phoneNumbers = []
  ansIntances = []
  ansDestinations = []
  ivrList = []
  timeScheduleNames = []
  timeSchedulesWithPeriods = []
  allPeriods = []
  isEditMode = false
  isSchedulesLoading = true
  isPhoneNumbersLoading = true
  isAnsIntancesLoading = true
  isAnsDestinationsLoading = true
  isIvrListLoading = true
  isTimeScheduleAdding = false
  isTimeScheduleEditing = false
  isSchedulesPeriodsLoading = true

  setStep = value => (this.step = value)

  setIsEditMode = flag => (this.isEditMode = flag)

  setDestinationData = ({ destinationName, scheduleName }) => {
    this.destinationName = destinationName
    this.destinationScheduleName = scheduleName
  }

  setScheduleToEdit = scheduleToEdit => {
    this.scheduleNameToEdit = scheduleToEdit.name
    this.scheduleIndexToEdit =
      this.schedules.findIndex(
        schedule => schedule.name === scheduleToEdit.name
      ) + 1
  }

  clearLoading = () => {
    this.isPhoneNumbersLoading = true
  }

  getSchedules = ({ customerId, groupId, tbrName }) => {
    this.schedules = []
    this.isSchedulesLoading = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${tbrName}`
      )
      .then(res => {
        const schedules = res.data.schedules
        let timeScheduleNames = []

        const transferedSchedules = schedules.map(schedule => {
          const fixedTimeScheduleName = schedule.timeSchedule.split('(')[0]
          timeScheduleNames.push(fixedTimeScheduleName)

          return {
            ...schedule,
            timeSchedule: fixedTimeScheduleName,
            color: getRandomColor()
          }
        })

        const defaultDestination = res.data.defaultDestination
        runInAction(() => {
          this.schedules = transferedSchedules
          this.defaultDestination = defaultDestination
          this.timeScheduleNames = timeScheduleNames
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch time schedule list',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isSchedulesLoading = false
      })
  }

  getSchedulesPeriods = ({ customerId, groupId }) => {
    this.allPeriods = []
    this.timeSchedulesWithPeriods = []
    this.isSchedulesPeriodsLoading = true

    // To push get requests to every schedule
    let promiseArr = []

    this.schedules.forEach(({ timeSchedule, name, color }) => {
      promiseArr.push(
        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/time_schedules/${timeSchedule}`,
            {
              params: { full_list: true }
            }
          )
          .then(res => {
            const periods = res.data.periods
            this.timeSchedulesWithPeriods.push({
              destinationName: name,
              color: color,
              periods: periods.map(period => {
                return { ...period, color: color }
              })
            })
          })
      )
    })

    Promise.all(promiseArr)
      .then(() => {
        // Create general array with periods array items of each schedule item
        const allPeriods = this.timeSchedulesWithPeriods
          .map(({ periods }) => periods)
          .flat()

        const weekPeriods = allPeriods.filter(
          period => period.type === WEEK_PERIOD_TYPE
        )

        this.allPeriods = weekPeriods.map((item, index) => {
          const generatedKey = index
          return {
            id: index,
            title: `${generatedKey} ${item.dayOfWeek.toLowerCase()}`,
            start: transformWeekDateFormat(item.dayOfWeek, item.startTime),
            end: transformWeekDateFormat(item.dayOfWeek, item.stopTime),
            initName: item.name,
            color: item.color
          }
        })
      })
      .finally(() => {
        this.isSchedulesPeriodsLoading = false
      })
  }

  clearSchedulesPeriods = () => {
    this.allPeriods = []
    this.timeSchedulesWithPeriods = []
  }

  findTimeSchedule = () => {
    const { schedules, scheduleNameToEdit } = this
    this.currentTimeSchedule = schedules.find(
      schedule => schedule.name === scheduleNameToEdit
    )
  }

  getPhoneNumbers = ({
    customerId,
    groupId,
    page,
    rowsPerPage,
    orderBy,
    order,
    countryCode
  }) => {
    this.phoneNumbers = []
    this.isPhoneNumbersLoading = true

    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = 'nsn'
        break
      }
      case 'type': {
        orderByField = 'type'
        break
      }
      default: {
        orderByField = 'id'
      }
    }
    const orderField = order || 'asc'
    const countryCodeField = countryCode.length
      ? countryCode.replace('+', '%2B')
      : ''

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${rowsPerPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=tbr&in_use=false&country_code=${countryCodeField}`
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers
        const transformedNumbers = requestResult.map(
          phoneNumber => new PhoneNumber(phoneNumber)
        )
        const countryCodes = requestResult.map(item => item.country_code)
        const uniqueCountryCodes = [...new Set(countryCodes)]

        runInAction(() => {
          this.phoneNumbers = transformedNumbers
          this.totalPages = pagination[2]
          this.countries = uniqueCountryCodes.map(countryCode => ({
            phone: countryCode,
            code: getCountryTwoLetterCodeFromNumber(`${countryCode}11111`),
            label: getCountryNameFromNumber(`${countryCode}11111`)
          }))
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch available to add numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isPhoneNumbersLoading = false
      })
  }

  getAdvancedIntances = ({ customerId, groupId }) => {
    this.ansIntances = []
    this.isAnsIntancesLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const ansAdvancedIntances = res.data.ans_advanced
        ansAdvancedIntances.push({
          name: 'testpush',
          access_number: '+966423423'
        })
        runInAction(() => {
          this.ansIntances = ansAdvancedIntances.map(
            ansIntance => new AnsInstance(ansIntance)
          )
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch ANS advanced instances',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAnsIntancesLoading = false
      })
  }

  getAdvancedDestinations = ({ customerId, groupId }) => {
    this.ansDestinations = []
    this.isAnsDestinationsLoading = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations`
      )
      .then(res => {
        const ansAdvancedDestinations = res.data.destinations
        runInAction(() => {
          this.ansDestinations = ansAdvancedDestinations.map(
            ansIntance => new AnsDestination(ansIntance)
          )
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch ANS advanced destinations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAnsDestinationsLoading = false
      })
  }

  getIvrList = ({ customerId, groupId }) => {
    this.ivrList = []
    this.isIvrListLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ivrs/`)
      .then(res => {
        const ansIvrList = res.data.ivrs
        runInAction(() => {
          this.ivrList = ansIvrList.map(
            ivrInstance => new IvrInstance(ivrInstance)
          )
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ANS IVR data',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isIvrListLoading = false
      })
  }

  // @computed: ID for Add schedule view
  get scheduleIndexToAdd() {
    return this.schedules.length + 1
  }

  postTimeSchedule = ({ customerId, groupId, destination, closeModal }) => {
    this.isTimeScheduleAdding = true

    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${this.currentUserId}/criteria/`,
        {
          name: this.destinationName,
          destination: destination,
          timeSchedule: this.destinationScheduleName
        }
      )
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `Destination added successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to add destination`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isTimeScheduleAdding = false
        closeModal()
      })
  }

  putTimeSchedule = ({
    customerId,
    groupId,
    schedule,
    destination,
    isPhoneNumberChanged,
    closeModal
  }) => {
    this.isTimeScheduleEditing = true
    const { destinationName, destinationScheduleName } = this
    const payload = isPhoneNumberChanged
      ? {
          name: destinationName,
          timeSchedule: destinationScheduleName,
          destination
        }
      : schedule

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${this.currentUserId}/criteria/${this.scheduleNameToEdit}`,
        payload
      )
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `Destination updated successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to update destination`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isTimeScheduleEditing = false
        closeModal()
      })
  }

  deleteTimeSchedule = ({ customerId, groupId, name, closeModal }) => {
    this.isTimeScheduleDeleting = true

    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${this.currentUserId}/criteria/${name}`
      )
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `Time based destination deleted successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || `Failed to delete time based destination`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isTimeScheduleDeleting = false
        closeModal()
      })
  }
}

decorate(TimeSchedules, {
  scheduleIndexToAdd: computed,
  step: observable,
  schedules: observable,
  timeSchedule: observable,
  phoneNumbers: observable,
  ansIntances: observable,
  ansDestinations: observable,
  ivrList: observable,
  countries: observable,
  defaultDestination: observable,
  currentTimeSchedule: observable,
  scheduleIndexToEdit: observable,
  isEditMode: observable,
  isPhoneNumbersLoading: observable,
  isSchedulesLoading: observable,
  isAnsIntancesLoading: observable,
  isAnsDestinationsLoading: observable,
  isIvrListLoading: observable,
  isTimeScheduleAdding: observable,
  isTimeScheduleEditing: observable,
  isTimeScheduleDeleting: observable,
  isSchedulesPeriodsLoading: observable,
  timeSchedulesWithPeriods: observable,
  allPeriods: observable,
  setStep: action,
  clearLoading: action,
  setIsEditMode: action,
  setIsLoadingTrue: action,
  setDestinationData: action,
  setScheduleToEdit: action,
  getSchedules: action,
  findTimeSchedule: action,
  getPhoneNumbers: action,
  getAdvancedIntances: action,
  getAdvancedDestinations: action,
  getIvrList: action,
  postTimeSchedule: action,
  putTimeSchedule: action,
  deleteTimeSchedule: action,
  getSchedulesPeriods: action,
  clearSchedulesPeriods: action
})

export default new TimeSchedules()
