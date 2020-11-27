import { decorate, observable, action, computed } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'
import getCountryCodeFromNumber from 'utils/phoneNumbers/getCountryCodeFromNumber'

export class Destinations {
  destinations = []
  destination = null
  isDestinationsLoading = true
  isDestinationLoading = true
  isDestinationPosting = false
  isDestinationEditing = false
  isDestinationEditing = false
  isDestinationDeleting = false

  getDestinations = ({ customerId, groupId }) => {
    this.destinations = []
    this.isDestinationsLoading = true

    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations`
      )
      .then(res => {
        this.destinations = res.data.destinations.map((destination, index) => {
          return {
            ...destination,
            id: index
          }
        })
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
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/${destinationId}`
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

  postDestination = ({
    customerId,
    groupId,
    name,
    phoneNumber,
    closeModal
  }) => {
    this.isDestinationPosting = true
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations`,
        {
          name,
          number: getNsnFromNumber(phoneNumber),
          cc_number: `+${getCountryCodeFromNumber(phoneNumber)}`
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination successfully created',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to create destination',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationPosting = false
      })
  }

  putDestination = ({
    customerId,
    groupId,
    destinationId,
    name,
    phoneNumber,
    closeModal
  }) => {
    this.isDestinationEditing = true
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/${destinationId}`,
        {
          name,
          number: getNsnFromNumber(phoneNumber),
          cc_number: `+${getCountryCodeFromNumber(phoneNumber)}`
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination successfully updated',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update destination',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationEditing = false
      })
  }

  // @computed
  get destinationsToDelete() {
    return this.destinations.filter(destination => destination.checked)
  }

  deleteDestinations = ({ customerId, groupId, destinations, closeModal }) => {
    this.isDestinationDeleting = true
    let promiseArr = []

    destinations.forEach(({ userId }) => {
      promiseArr.push(
        axios.delete(
          `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/${userId}`
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
        this.isDestinationDeleting = false
      })
  }

  deleteDestination = ({ customerId, groupId, destinationId, closeModal }) => {
    this.isDestinationDeleting = true
    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/${destinationId}`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete destination',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationDeleting = false
      })
  }
}

decorate(Destinations, {
  destinationsToDelete: computed,
  destinations: observable,
  destination: observable,
  isDestinationsLoading: observable,
  isDestinationLoading: observable,
  isDestinationPosting: observable,
  isDestinationEditing: observable,
  isDestinationDeleting: observable,
  getDestinations: action,
  getDestination: action,
  postDestination: action,
  putDestination: action,
  deleteDestinations: action,
  deleteDestination: action
})

export default new Destinations()
