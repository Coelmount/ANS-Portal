import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class ConfigStore {
  config = {}
  customerStatuses = []
  isLoadingConfig = true
  isLoadingCustomerStatuses = true

  getConfig = () => {
    this.isLoadingConfig = true
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
    axios
      .get(`/configs/templates/categories/group_intercept`)
      .then(res => {
        this.customerStatuses = res.data.templates
      })
      .finally(() => {
        console.log('finally', this.isLoadingCustomerStatuses)
        this.isLoadingCustomerStatuses = false
        console.log('finally1', this.isLoadingCustomerStatuses)
      })
  }
}

decorate(ConfigStore, {
  config: observable,
  customerStatuses: observable,
  isLoadingConfig: observable,
  isLoadingCustomerStatuses: observable,
  getConfig: action,
  getCustomerStatuses: action
})

export default new ConfigStore()
