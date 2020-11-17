import { decorate, observable, action, computed, runInAction } from 'mobx'
import capitalize from 'lodash/capitalize'

import SnackbarStore from '../Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryTwoLetterCodeFromNumber from 'utils/phoneNumbers/getCountryTwoLetterCodeFromNumber'
import types from 'utils/types/basicSearchParams'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import TimeBasedRoute from './substores/TimeBasedRoute'
import PhoneNumber from './substores/PhoneNumber'

const { NUMBER_LIKE, COUNTRY_CODE } = types

export class TimeBasedRouting {
  timeBasedRoutes = []
  timeBasedRoute = {}
  availableNumbers = []
  ansNumbers = []
  countries = []
  totalPagesAvailableNumbers = 0
  totalPagesAnsNumbers = 0
  configureStep = 1
  searchParam = NUMBER_LIKE
  currentTbrName = ''
  selectedPhoneNumber = {}
  isLoadingTBR = true
  isLoadingSingleTBR = true
  isTimeBasedRoutePosting = false
  isAvailableNumbersLoading = false
  isAnsNumbersLoading = true
  isDeleting = false
  isConfiguredNumbersLoading = false
  configuredNumbers = []
  totalPagesConfiguredNumbers = 0

  setConfigureStep = value => {
    this.configureStep = value
  }

  clearConfigureStep = () => {
    this.configureStep = 1
  }

  getAvailableNumbers = (
    customerId,
    groupId,
    page,
    perPage,
    orderBy,
    order,
    query
  ) => {
    if (this.isAvailableNumbersLoading) return

    this.isAvailableNumbersLoading = true

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
    const queryField = query || ''
    const searchValue =
      this.searchParam === COUNTRY_CODE && queryField.length > 1
        ? queryField.replace('+', '%2B')
        : queryField

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=tbr&in_use=false&${this.searchParam}=${searchValue} `
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult.map(item => {
          return {
            ...item,
            phoneNumber: `${item.country_code}${item.nsn}`,
            country: getCountryNameFromNumber(
              `${item.country_code}${item.nsn}`
            ),
            status: 'free',
            service_capabilities: 'tbr',
            checked: false,
            hover: false
          }
        })

        this.availableNumbers = transformedNumbers
        this.totalPagesAvailableNumbers = pagination[2]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAvailableNumbersLoading = false))
  }

  getConfiguredNumbers = (
    customerId,
    groupId,
    page,
    perPage,
    orderBy,
    order,
    query
  ) => {
    if (this.isConfiguredNumbersLoading) return

    this.isConfiguredNumbersLoading = true

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
    const queryField = query || ''
    const searchValue =
      this.searchParam === COUNTRY_CODE && queryField.length > 1
        ? queryField.replace('+', '%2B')
        : queryField

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=tbr&in_use=true&${this.searchParam}=${searchValue} `
      )
      .then(res => {
        const pagination = res.data.pagination
        const requestResult = res.data.numbers

        const transformedNumbers = requestResult.map(item => {
          return {
            ...item,
            phoneNumber: `${item.country_code}${item.nsn}`,
            country: getCountryNameFromNumber(
              `${item.country_code}${item.nsn}`
            ),
            status: 'used',
            service_capabilities: 'tbr',
            checked: false,
            hover: false
          }
        })

        this.configuredNumbers = transformedNumbers
        this.totalPagesConfiguredNumbers = pagination[2]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isConfiguredNumbersLoading = false))
  }

  getAnsNumbers = ({
    customerId,
    groupId,
    page,
    rowsPerPage,
    orderBy,
    order,
    countryCode
  }) => {
    this.ansNumbers = []
    this.isAnsNumbersLoading = true

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
      case 'country': {
        orderByField = 'country_code'
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
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${rowsPerPage}}&cols=["country_code","nsn","type","connected_to","service_capabilities"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&in_use=true&country_code=${countryCodeField}`
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
          this.ansNumbers = transformedNumbers
          this.totalPagesAnsNumbers = pagination[2]
          this.countries = uniqueCountryCodes.map(countryCode => ({
            phone: countryCode,
            code: getCountryTwoLetterCodeFromNumber(`${countryCode}11111`),
            label: getCountryNameFromNumber(`${countryCode}11111`)
          }))
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch ANS numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAnsNumbersLoading = false
      })
  }

  clearAnsNumbersLoading = () => {
    this.isAnsNumbersLoading = true
  }

  updateSearchParam = value => {
    this.searchParam = value
  }

  getTimeBasedRoutes = ({ customerId, groupId }) => {
    this.timeBasedRoutes = []
    this.isLoadingTBR = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`
      )
      .then(res => {
        const transformedRoutes = res.data.time_based_routes.map(
          (route, index) => {
            return new TimeBasedRoute(route, index)
          }
        )
        runInAction(() => {
          this.timeBasedRoutes = transformedRoutes
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch phone numbers',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingTBR = false
      })
  }

  getTimeBasedRoute = ({ customerId, groupId, tbrName }) => {
    this.timeBasedRoute = {}
    this.isLoadingSingleTBR = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${tbrName}`
      )
      .then(res => {
        const timeBasedRouteData = res.data
        runInAction(() => {
          this.timeBasedRoute = timeBasedRouteData
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch time based route instance',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingSingleTBR = false
      })
  }

  putTimeBasedRoute = ({
    customerId,
    groupId,
    tbrName,
    name,
    defaultDestination,
    closeModal
  }) => {
    this.isTbrUpdating = true

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${tbrName}`,
        {
          name,
          defaultDestination
        }
      )
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `Time based routing instance successfully updated`,
          options: {
            variant: 'success'
          }
        })
      })
      .then(() => {
        this.getCurrentNameWithId({ customerId, groupId, tbrId: tbrName })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to update time based route instance',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        closeModal()
        this.isTbrUpdating = false
      })
  }

  getCurrentNameWithId = ({ customerId, groupId, tbrId }) => {
    this.currentTbrName = ''
    this.isLoadingTBR = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${tbrId}`
      )
      .then(res => {
        runInAction(() => {
          this.currentTbrName = res.data.name
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch time based routing instance',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingTBR = false
      })
  }

  setDefaultIsLoadingTBR = () => {
    this.isLoadingTBR = true
  }

  // @computed: check if checked field of every number === TRUE
  get areAllNumbersChecked() {
    return this.timeBasedRoutes.every(route => route.checked)
  }

  // @computed:
  get checkedNumbers() {
    const checkedNumbers = this.timeBasedRoutes.filter(route => route.checked)
    return checkedNumbers
  }

  // @computed
  get deleteString() {
    const checkedNumbers = this.timeBasedRoutes.filter(route => route.checked)
    return checkedNumbers.map(number => `'${number.name}'`).join(', ')
  }

  // change checked field of each number => TRUE
  handleCheckAll = () => {
    if (this.areAllNumbersChecked) {
      this.timeBasedRoutes.forEach(route => (route.checked = false))
    } else {
      this.timeBasedRoutes.forEach(route => (route.checked = true))
    }
  }

  updateSelectedPhoneNumber = number => {
    this.selectedPhoneNumber = number
  }

  postTimeBasedRoute = ({ customerId, groupId, history, name }) => {
    this.isTimeBasedRoutePosting = true

    const accessCode = this.selectedPhoneNumber.country_code
    const accessNumber = this.selectedPhoneNumber.nsn

    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`,
        {
          name,
          cc_access_number: accessCode,
          access_number: accessNumber
        }
      )
      .then(res => {
        if (
          res.data.apio &&
          res.data.apio.body.userId &&
          res.data.apio.body.userId.includes('@')
        ) {
          const createdTbrId = res.data.apio.body.userId.split('@')[0]
          history.push(
            `/customers/${customerId}/subaccounts/${groupId}/ans_instances/time_based_routing/${createdTbrId}`
          )
        } else {
          history.push(
            `/customers/${customerId}/subaccounts/${groupId}/ans_instances/time_based_routing#translations`
          )
        }

        SnackbarStore.enqueueSnackbar({
          message: `Time based routing instance successfully created`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to create time based routing instance`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isTimeBasedRoutePosting = false
      })
  }

  deleteTimeBasedRoutes = ({
    customerId,
    groupId,
    callback,
    singleDeleteItem
  }) => {
    this.isDeleting = true

    const deleteSubject = `translation${singleDeleteItem ? '' : 's'}`
    const numbersToDelete = singleDeleteItem.userId
      ? [singleDeleteItem]
      : this.checkedNumbers

    let promiseArr = []
    numbersToDelete.forEach(number => {
      promiseArr.push(
        axios.delete(
          `/tenants/${customerId}/groups/${groupId}/services/time_based_routing/${number.userId}`
        )
      )
    })

    Promise.all(promiseArr)
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `${capitalize(deleteSubject)} deleted successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to delete ${capitalize(deleteSubject)}`,
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        callback()
        this.isDeleting = false
      })
  }
}

decorate(TimeBasedRouting, {
  areAllNumbersChecked: computed,
  checkedNumbers: computed,
  deleteString: computed,
  setConfigureStep: action,
  clearConfigureStep: action,
  getTimeBasedRoutes: action,
  getTimeBasedRoute: action,
  putTimeBasedRoute: action,
  postTimeBasedRoute: action,
  getAvailableNumbers: action,
  updateSearchParam: action,
  updateSelectedPhoneNumber: action,
  handleCheckAll: action,
  deleteTimeBasedRoutes: action,
  getCurrentNameWithId: action,
  setDefaultIsLoadingTBR: action,
  getAnsNumbers: action,
  clearAnsNumbersLoading: action,
  getConfiguredNumbers: action,
  timeBasedRoutes: observable,
  timeBasedRoute: observable,
  searchParam: observable,
  totalPagesAvailableNumbers: observable,
  totalPagesAnsNumbers: observable,
  numberToConfigure: observable,
  ansNumbers: observable,
  currentTbrName: observable,
  configureStep: observable,
  isLoadingTBR: observable,
  isLoadingSingleTBR: observable,
  isTbrUpdating: observable,
  isTimeBasedRoutePosting: observable,
  isAvailableNumbersLoading: observable,
  isAnsNumbersLoading: observable,
  isDeleting: observable,
  isConfiguredNumbersLoading: observable,
  configuredNumbers: observable,
  totalPagesConfiguredNumbers: observable
})

export default new TimeBasedRouting()
