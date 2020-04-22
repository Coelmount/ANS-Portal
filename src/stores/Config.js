import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class ConfigStore {
  config = {}
  isLoadingConfig = true

  getConfig = () => {
    axios
      .get(`/configs/applications/ANS_portal/config`)
      .then(res => {
        try {
          JSON.parse(res.data.data)
        } catch (e) {
          return
        }
        this.config = JSON.parse(res.data.data)
        this.isLoadingConfig = false
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to get config`,
          options: {
            variant: 'error'
          }
        })
      })
  }
}

decorate(ConfigStore, {
  config: observable,
  isLoadingConfig: observable,
  getConfig: action
})

export default new ConfigStore()
