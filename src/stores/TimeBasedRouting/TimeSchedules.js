import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class TimeSchedules {
  step = 1
  schedules = []
  isSchedulesLoading = false

  setStep = value => (this.step = value)

  getSchedules = () => {
    console.log('get schedules')
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
    this.availableNumbers = []
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

        const transformedNumbers = requestResult.map(item => {
          return {
            ...item,
            phoneNumber: `${item.country_code} ${item.nsn}`,
            checked: false,
            hover: false
          }
        })

        this.availableNumbers = transformedNumbers
        this.totalPages = pagination[2]

        const countryCodes = requestResult.map(item => item.country_code)
        const uniqueCountryCodes = [...new Set(countryCodes)]
        this.countries = uniqueCountryCodes.map(countryCode => {
          return {
            phone: countryCode
            // code: getCountryTwoLetterCodeFromNumber(`${countryCode}11111`),
            // label: getCountryNameFromNumber(`${countryCode}11111`)
          }
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
        this.isAvailableNumbersLoading = false
      })
  }
}

decorate(TimeSchedules, {
  step: observable,
  schedules: observable,
  isSchedulesLoading: observable,
  setStep: action,
  getSchedules: action,
  getPhoneNumbers: action
})

export default new TimeSchedules()
