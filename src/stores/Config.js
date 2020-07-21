import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class ConfigStore {
  config = {}
  customerStatuses = []
  timeZones = []
  countries = []
  isLoadingConfig = false
  isLoadingCustomerStatuses = false
  isLoadingTimeZones = false
  isLoadingCountries = false

  getConfig = () => {
    this.isLoadingConfig = true
    this.config = {}
    axios
      .get(`/configs/applications/ANS_portal/config`)
      .then(res => {
        try {
          JSON.parse(res.data.data)
        } catch (e) {
          return
        }
        this.config = JSON.parse(res.data.data)
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to get config`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isLoadingConfig = false
      })
  }

  getCustomerStatuses = () => {
    this.isLoadingCustomerStatuses = true
    this.customerStatuses = []
    axios
      .get(`/configs/templates/categories/group_intercept`)
      .then(res => {
        this.customerStatuses = res.data.templates
      })
      .finally(() => {
        this.isLoadingCustomerStatuses = false
      })
  }

  getTimeZones = () => {
    this.isLoadingTimeZones = true
    this.timeZones = []
    return axios
      .get(`/system/timezones/`)
      .then(res => {
        this.timeZones = res.data.timeZones.map(el => ({
          value: el.name,
          label: el.description
        }))
      })
      .finally(() => {
        this.isLoadingTimeZones = false
      })
  }

  getCountries = () => {
    this.isLoadingCountries = true
    this.countries = []
    return axios
      .get(`/configs/applications/ANS_portal/countries`)
      .then(res => {
        try {
          JSON.parse(res.data.data)
        } catch (e) {
          return
        }
        const data = JSON.parse(res.data.data)
        this.countries = data.countries
      })
      .finally(() => {
        this.isLoadingCountries = false
      })
  }
}

decorate(ConfigStore, {
  config: observable,
  customerStatuses: observable,
  timeZones: observable,
  isLoadingConfig: observable,
  isLoadingCustomerStatuses: observable,
  isLoadingTimeZones: observable,
  isLoadingCountries: observable,
  countries: observable,
  getConfig: action,
  getCustomerStatuses: action,
  getTimeZones: action,
  getCountries: action
})

export default new ConfigStore()
