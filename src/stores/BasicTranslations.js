import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class BasicTranslations {
  step = 1
  selectedPhoneNumber = null
  selectedInstance = null
  isBasicTranslationsNumbersLoading = true
  basicTranslationsNumbers = []

  changeStep = step => {
    this.step = step
  }

  setDefaultValues = () => {
    this.step = 1
    this.selectedPhoneNumber = null
  }

  updateSelectedPhoneNumber = number => {
    this.selectedPhoneNumber = number
  }

  postDestinationNumber = (country, number) => {
    //console.log(country, number, 'to post')
    this.changeStep(3)
  }

  updateSelectedInstance = instance => {
    this.selectedInstance = instance
  }

  postAccessNumber = callback => {
    // console.log(
    //   this.selectedInstance.accessCountry,
    //   this.selectedInstance.accessNumber,
    //   'to post'
    // )
    callback && callback()
  }

  getBasicTranslationsNumbers = (customerId, groupId) => {
    this.isBasicTranslationsNumbersLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_basic`)
      .then(res => {
        console.log(res, 'res')
        const transformedNumbers = res.data.ans_basic.map(item => {
          return {
            checked: false,
            hover: false,
            enabled: true,
            ...item
          }
        })
        this.basicTranslationsNumbers = transformedNumbers
        console.log(transformedNumbers, 'transformedNumbers in store')
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch basic translations',
          options: {
            variant: 'error'
          }
        })
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
      .finally(() => (this.isBasicTranslationsNumbersLoading = false))
  }
}

decorate(BasicTranslations, {
  step: observable,
  selectedInstance: observable,
  isBasicTranslationsNumbersLoading: observable,
  basicTranslationsNumbers: observable,
  changeStep: action,
  setDefaultValues: action,
  updateSelectedPhoneNumber: action,
  postDestinationNumber: action,
  updateSelectedInstance: action,
  postAccessNumber: action,
  getBasicTranslationsNumbers: action
})

export default new BasicTranslations()
