import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import types from 'utils/types/basicSearchParams'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

const { NUMBER_LIKE, COUNTRY_CODE } = types

export class TimeBasedRouting {
  timeBaseRoutes = []
  availableNumbers = []
  totalPagesAvailableNumbers = 0
  searchParam = NUMBER_LIKE
  numberToConfigure = ''
  isLoadingTBR = true
  isTimeBasedRoutePosting = false
  isAvailableNumbersLoading = true

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
    this.timeBaseRoutes = []
    this.isLoadingTBR = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`
      )
      .then(res => {
        this.timeBaseRoutes = res.data.time_based_routes.map(item => {
          return {
            ...item,
            checked: false,
            hover: false
          }
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

  postTimeBasedRoute = ({ customerId, groupId, name, closeModal }) => {
    console.log(this.numberToConfigure, 'this.numberToConfigure')
    this.isTimeBasedRoutePosting = true
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/time_based_routing`,
        {
          name,
          defaultDestination: this.numberToConfigure
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
}

decorate(TimeBasedRouting, {
  getTimeBasedRoutes: action,
  postTimeBasedRoute: action,
  getAvailableNumbers: action,
  updateSearchParam: action,
  setNumberToConfigure: action,
  timeBaseRoutes: observable,
  searchParam: observable,
  totalPagesAvailableNumbers: observable,
  numberToConfigure: observable,
  isLoadingTBR: observable,
  isTimeBasedRoutePosting: observable,
  isAvailableNumbersLoading: observable
})

export default new TimeBasedRouting()
