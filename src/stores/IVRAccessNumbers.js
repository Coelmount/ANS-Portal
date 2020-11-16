import { decorate, action, observable } from 'mobx'
import capitalize from 'lodash/capitalize'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import types from 'utils/types/basicSearchParams'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

const { NUMBER_LIKE, COUNTRY_CODE, NSN, TYPE, ID } = types

export class AdvancedAccessNumbers {
  accessNumbers = []
  totalPagesAccessNumbers = 0
  isAccessNumbersLoading = false
  searchParam = NUMBER_LIKE
  selectedNumber = null
  isAccessNumberPosting = false
  isConfiguredNumbersLoading = false
  configuredNumbers = []
  totalPagesConfiguredNumbers = 0

  getConfiguredNumbersForAddInstance = (
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

    console.log(12312312)
    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = NSN
        break
      }
      case TYPE: {
        orderByField = TYPE
        break
      }
      default: {
        orderByField = ID
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
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=ivr&in_use=true&${this.searchParam}=${searchValue} `
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
            service_capabilities: 'ivr',
            checked: false,
            hover: false
          }
        })

        this.configuredNumbers = transformedNumbers
        this.totalPagesConfiguredNumbers = pagination[2]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch configured numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isConfiguredNumbersLoading = false))
  }

  getAvailableNumbersForAddInstance = (
    customerId,
    groupId,
    page,
    perPage,
    orderBy,
    order,
    query
  ) => {
    if (this.isAccessNumbersLoading) return
    this.isAccessNumbersLoading = true

    let orderByField
    switch (orderBy) {
      case 'phoneNumber': {
        orderByField = NSN
        break
      }
      case TYPE: {
        orderByField = TYPE
        break
      }
      default: {
        orderByField = ID
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
        `/tenants/${customerId}/groups/${groupId}/numbers?paging={"page_number":${page},"page_size":${perPage}}&cols=["country_code","nsn","type"]&sorting=[{"field": "${orderByField}", "direction": "${orderField}"}]&service_capabilities=ivr&in_use=false&${this.searchParam}=${searchValue} `
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
            service_capabilities: 'ivr',
            checked: false,
            hover: false
          }
        })

        this.accessNumbers = transformedNumbers
        this.totalPagesAccessNumbers = pagination[2]
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch access numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAccessNumbersLoading = false))
  }

  updateSearchParam = value => {
    this.searchParam = value
  }

  updateSelectedNumber = number => {
    this.selectedNumber = number
  }

  postAccessNumber = ({ customerId, groupId, addData, closeModal }) => {
    this.isAccessNumberPosting = true
    const { name, policy, huntAfterNoAnswer, amountSkipRings } = addData
    const { country_code, nsn } = this.selectedNumber

    const dataToSend = {
      name,
      routing_policy: capitalize(policy),
      cc_access_number: country_code,
      access_number: nsn
    }

    if (huntAfterNoAnswer) {
      dataToSend.no_answer_hunt = true
      dataToSend.no_answer_number_of_rings = Number(amountSkipRings)
    }
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced`,
        dataToSend
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination group successfully posted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to post destination group',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isAccessNumberPosting = false
      })
  }
}

decorate(AdvancedAccessNumbers, {
  getAccessNumbers: action,
  changeStep: action,
  updateSearchParam: action,
  updateSelectedNumber: action,
  postAccessNumber: action,
  getConfiguredNumbersForAddInstance: action,
  accessNumbers: observable,
  totalPagesAccessNumbers: observable,
  isAccessNumbersLoading: observable,
  searchParam: observable,
  isAccessNumberPosting: observable,
  isConfiguredNumbersLoading: observable,
  configuredNumbers: observable,
  totalPagesConfiguredNumbers: observable
})

export default new AdvancedAccessNumbers()
