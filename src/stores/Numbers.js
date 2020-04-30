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

  postAssignNumbersToCustomer = (tenantId, changeStep) => {
    this.isAddingNumbers = true
    const selectedNumbers = this.availableNumbersTable.filter(el => el.checked)
    const dataForPost = this.parseNumbersToPost(selectedNumbers)
    dataForPost.forEach(data => {
      axios
        .post(`/tenants/${tenantId}/numbers`, data)
        .then(res => {
          const response = JSON.parse(res.data.apio.body)
          this.addedNumbers = response.result.filter(
            el => el.status === 'added'
          )
          this.rejectedNumbers = response.result.filter(
            el => el.status === 'rejected'
          )
          console.log(this.addedNumbers, this.rejectedNumbers)
          changeStep && changeStep(3)
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
  getAvailableNumbers: action
})

export default new NumbersStore()
