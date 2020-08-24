import { decorate, observable, action, computed, toJS, runInAction } from 'mobx'
import capitalize from 'lodash/capitalize'

import SnackbarStore from '../Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import types from 'utils/types/basicSearchParams'
import { FREE_ENTRY_NUMBER_ID, ANS_NUMBER_ID } from 'utils/types/numberTypes'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'
import TimeBasedRoute from './substores/TimeBasedRoute'

const { NUMBER_LIKE, COUNTRY_CODE } = types

export class TimeBasedRouting {
  timeBasedRoutes = []
  availableNumbers = []
  totalPagesAvailableNumbers = 0
  configureStep = 1
  tbrToAddName = ''
  searchParam = NUMBER_LIKE
  numberToConfigure = ''
  currentTbrName = ''
  isLoadingTBR = true
  isTimeBasedRoutePosting = false
  isAvailableNumbersLoading = true
  isDeleting = false

  setConfigureStep = value => {
    this.configureStep = value
  }

  clearConfigureStep = () => {
    this.configureStep = 1
  }

  setTbrToAddName = value => {
    this.tbrToAddName = value
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

  updateSearchParam = value => {
    this.searchParam = value
  }

  setNumberToConfigure = number => {
    this.numberToConfigure = number
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

  getCurrentNameWithId = ({ customerId, groupId, tbrId }) => {
    this.timeBasedRoutes = []
    this.currentTbrName = ''
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
      .then(() => {
        const currentTbr = this.timeBasedRoutes.find(
          ({ userId }) => userId === tbrId
        )
        this.currentTbrName = currentTbr.name || ''
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

  postTimeBasedRoute = ({
    customerId,
    groupId,
    defaultDestination,
    closeModal
  }) => {
    this.isTimeBasedRoutePosting = true
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`,
        {
          name: this.tbrToAddName,
          defaultDestination
        }
      )
      .then(() => {
        closeModal()
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
  setTbrToAddName: action,
  getTimeBasedRoutes: action,
  postTimeBasedRoute: action,
  getAvailableNumbers: action,
  updateSearchParam: action,
  setNumberToConfigure: action,
  handleCheckAll: action,
  deleteTimeBasedRoutes: action,
  getCurrentNameWithId: action,
  timeBasedRoutes: observable,
  searchParam: observable,
  totalPagesAvailableNumbers: observable,
  numberToConfigure: observable,
  currentTbrName: observable,
  configureStep: observable,
  isLoadingTBR: observable,
  isTimeBasedRoutePosting: observable,
  isAvailableNumbersLoading: observable,
  isDeleting: observable
})

export default new TimeBasedRouting()
