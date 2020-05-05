import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'
import queryString from 'query-string'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class NumbersStore {
  availableNumbers = []
  availableNumbersTable = []
  isLoadingNumbers = false
  params = {}
  isAddingNumbers = false
  addedNumbers = []
  rejectedNumbers = []
  reservedNumbers = []
  isLoadingReservedNumbers = false

  getReservedNumbers = (tenantId, cc, type) => {
    this.isLoadingReservedNumbers = true
    return axios
      .get(
        `/tenants/${tenantId}/reserved_numbers?country_code=${cc.replace(
          '+',
          '%2B'
        )}&number_type=${type}`
      )
      .then(
        res =>
          (this.reservedNumbers = res.data.numbers.map(el => ({
            ...el,
            checked: false
          })))
      )
      .finally(() => (this.isLoadingReservedNumbers = false))
  }

  getAvailableNumbers = params => {
    this.params = params
    return axios
      .get(
        `/available_numbers?${queryString.stringify(params, {
          skipEmptyString: true
        })}`
      )
      .then(res => {
        this.availableNumbers = res.data.suggestions
        this.availableNumbersTable = this.parseAvailebleNumbers(
          res.data.suggestions
        )
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch available numbers',
          options: {
            variant: 'error'
          }
        })
      )
  }

  postAddedNumbersToSubaccaunt = (
    tenantId,
    groupId,
    dataForPost,
    handleClose
  ) => {
    const promiseArray = []
    dataForPost.forEach(data => {
      promiseArray.push(
        axios.post(`/tenants/${tenantId}/groups/${groupId}/numbers`, data)
      )
    })
    Promise.all(promiseArray)
      .then(res => {
        res.forEach(el => {
          SnackbarStore.enqueueSnackbar({
            message: 'Success assigned numbers',
            options: {
              variant: 'success'
            }
          })
        })
        handleClose && handleClose()
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to assign numbers',
          options: {
            variant: 'error'
          }
        })
      )
  }

  postResevedNumbersToCustomer = (
    tenantId,
    dataForPost,
    changeStep,
    step,
    setAddedNumber
  ) => {
    const promiseArray = []
    dataForPost.forEach(data => {
      promiseArray.push(axios.post(`/tenants/${tenantId}/numbers`, data))
    })
    Promise.all(promiseArray)
      .then(res => {
        res.forEach(el => {
          const response = JSON.parse(el.data.apio.body)
          this.addedNumbers.push(
            ...response.result
              .filter(el => el.status === 'added')
              .map(el => ({ ...el, checked: false }))
          )
          this.rejectedNumbers.push(
            ...response.result.filter(el => el.status === 'rejected')
          )
        })
        setAddedNumber(this.addedNumbers)
        changeStep && changeStep(step)
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to assign numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isAddingNumbers = false
      })
  }

  postAssignNumbersToCustomer = (tenantId, changeStep, step) => {
    this.isAddingNumbers = true
    const selectedNumbers = this.availableNumbersTable.filter(el => el.checked)
    const dataForPost = this.parseNumbersToPost(selectedNumbers)
    const promiseArray = []
    dataForPost.forEach(data => {
      promiseArray.push(axios.post(`/tenants/${tenantId}/numbers`, data))
    })
    Promise.all(promiseArray)
      .then(res => {
        res.forEach(el => {
          const response = JSON.parse(el.data.apio.body)
          this.addedNumbers.push(
            ...response.result.filter(el => el.status === 'added')
          )
          this.rejectedNumbers.push(
            ...response.result.filter(el => el.status === 'rejected')
          )
        })
        changeStep && changeStep(step)
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to assign numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isAddingNumbers = false
      })
  }

  clearNumbers = () => {
    this.availableNumbers = []
    this.availableNumbersTable = []
  }

  parseNumbersToPost = numbers => {
    const parsedNumbers = numbers.map(el => ({
      country_code: `${el.code}`,
      range: [Number(el.rangeFrom), Number(el.rangeTo)],
      service_capabilities: this.params.service_capabilities
    }))
    return parsedNumbers
  }

  parseAvailebleNumbers = numbers => {
    const parsedNumbers = numbers.map(el => {
      if (Number(el[1]) - Number(el[0]) === 0) {
        return {
          rangeFrom: `${el[0]}`,
          rangeTo: `${el[1]}`,
          length: 1,
          checked: false,
          type: this.params.number_type,
          hover: false,
          code: this.params.country_code
        }
      } else {
        return {
          rangeFrom: `${el[0]}`,
          rangeTo: `${el[1]}`,
          length: el[1] - el[0] + 1,
          checked: false,
          type: this.params.number_type,
          hover: false,
          code: this.params.country_code
        }
      }
    })
    return parsedNumbers
  }
}

decorate(NumbersStore, {
  availableNumbers: observable,
  isLoadingNumbers: observable,
  availableNumbersTable: observable,
  isAddingNumbers: observable,
  isLoadingReservedNumbers: observable,
  reservedNumbers: observable,
  getAvailableNumbers: action,
  getReservedNumbers: action,
  postResevedNumbersToCustomer: action,
  postAddedNumbersToSubaccaunt: action
})

export default new NumbersStore()
