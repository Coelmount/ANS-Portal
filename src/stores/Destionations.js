import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class Destinations {
  destinations = []
  isDestinationsLoading = true

  getDestinations = ({ customerId, groupId }) => {
    this.destinations = []
    this.isDestinationsLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_basic`)
      .then(res => {
        console.log(res.data.ans_basic, 'res')
        this.destinations = res.data.ans_basic
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch destinations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationsLoading = false
      })
  }
}

decorate(Destinations, {
  destinations: observable,
  isDestinationsLoading: observable,
  getDestinations: action
})

export default new Destinations()
