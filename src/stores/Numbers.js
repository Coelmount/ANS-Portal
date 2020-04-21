import { decorate, observable, action } from 'mobx'
import merge from 'lodash/merge'
import queryString from 'query-string'

import axios from 'utils/axios'
import { PROXY_P6 } from 'utils/axios'

import SnackbarStore from './Snackbar'

export class NumbersStore {
  availableNumbers = []
  availableNumbersTable = []
  isLoadingNumbers = false
  params = {}

  getAvailableNumbers = params => {
    this.params = params
    return axios
      .get(
        `${PROXY_P6}/available_numbers?${queryString.stringify(params, {
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
          message: 'Feiled to fetch available numbers',
          options: {
            variant: 'error'
          }
        })
      )
  }

  postAssignNumbersToCustomer = tenantId => {
    const selectedNumbers = this.availableNumbersTable.filter(el => el.checked)
    const dataForPost = this.parseNumbersToPost(selectedNumbers)
    dataForPost.forEach(data => {
      axios.post(`${PROXY_P6}/tenants/${tenantId}/numbers`, data).catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: 'Feiled to assign numbers',
          options: {
            variant: 'error'
          }
        })
      )
    })
  }

  parseNumbersToPost = numbers => {
    const parsedNumbers = numbers.map(el => ({
      country_code: `${el.code}`,
      range: [Number(el.rangeFrom), Number(el.rangeTo)]
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
  getAvailableNumbers: action
})

export default new NumbersStore()
