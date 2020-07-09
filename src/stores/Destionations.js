import { decorate, observable, action, computed } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class Destinations {
  destinations = []
  destination = null
  isDestinationsLoading = true
  isDestinationLoading = true
  isDestinationEditing = false
  isDestinationDeleting = false
  isDestinationsDeleting = false

  getDestinations = ({ customerId, groupId }) => {
    this.destinations = []
    this.isDestinationsLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        this.destinations = res.data.ans_advanced
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

  getDestination = ({ customerId, groupId, destinationId }) => {
    this.destination = null
    this.isDestinationLoading = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${destinationId}`
      )
      .then(res => {
        this.destination = res.data
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
        this.isDestinationLoading = false
      })
  }

  putDestination = ({ customerId, groupId, destinationId, closeModal }) => {
    console.log(destinationId, 'edit')
    // this.isDestinationEditing = true
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${destinationId}`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destinations successfully edited',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to edit destinations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // this.isDestinationEditing = false
      })
  }

  // @computed
  get destinationsToDelete() {
    return this.destinations.filter(destination => destination.checked)
  }

  deleteDestinations = ({ customerId, groupId, closeModal }) => {
    // this.isDestinationsDeleting = true
    let promiseArr = []
    const numbersToDelete = this.destinations.filter(
      destination => destination.checked
    )
    numbersToDelete.forEach(({ ans_id }) => {
      console.log(ans_id, 'delete')
      promiseArr.push(
        axios.delete(
          `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${ans_id}`
        )
      )
    })
    Promise.all(promiseArr)
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destinations successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete destinations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // isDestinationsDeleting = false
      })
  }

  deleteDestination = ({ customerId, groupId, destinationId, closeModal }) => {
    console.log(destinationId, 'delete')
    // this.isDestinationDeleting = true
    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${destinationId}`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destinations successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete destinations',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // isDestinationDeleting = false
      })
  }
}

decorate(Destinations, {
  destinationsToDelete: computed,
  destinations: observable,
  destination: observable,
  isDestinationsLoading: observable,
  isDestinationLoading: observable,
  isDestinationEditing: observable,
  getDestinations: action,
  getDestination: action,
  putDestination: action,
  deleteDestinations: action,
  deleteDestination: action
})

export default new Destinations()
