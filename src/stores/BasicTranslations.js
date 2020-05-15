import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

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
    this.changeStep(3)
  }

  updateSelectedInstance = instance => {
    this.selectedInstance = instance
  }

  postAccessNumber = callback => {
    callback && callback()
  }

  getBasicTranslationsNumbers = (customerId, groupId) => {
    this.isBasicTranslationsNumbersLoading = true
    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_basic`)
      .then(res => {
        const transformedNumbers = res.data.ans_basic.map((item, index) => {
          return {
            id: item.id || index,
            checked: false,
            hover: false,
            enabled: true,
            accessCountry:
              item.access_number &&
              getCountryNameFromNumber(item.access_number),
            destinationCountry: getCountryNameFromNumber(
              item.destination_number
            ),
            ...item
          }
        })
        this.basicTranslationsNumbers = transformedNumbers
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch basic translations',
          options: {
            variant: 'error'
          }
        })
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
