import { decorate, action, observable } from 'mobx'

import SnackbarStore from '../Snackbar'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'
import getCountryCodeFromNumber from 'utils/phoneNumbers/getCountryCodeFromNumber'

export class Destinations {
  currentGroupId = ''
  destinations = []
  isDestinationsLoading = true
  isDestinationPosting = false

  getDestinations = ({ customerId, groupId, destinationGroupName }) => {
    this.destinations = []
    this.isDestinationsLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )
        this.currentGroupId = currentGroup.ans_id

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/destinations`
          )
          .then(res => {
            console.log(res.data, 'res.data')
          })
          .catch(e =>
            SnackbarStore.enqueueSnackbar({
              message:
                getErrorMessage(e) || 'Failed to fetch destinations list',
              options: {
                variant: 'error'
              }
            })
          )
          .finally(() => {
            this.isDestinationsLoading = false
          })
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
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}`,
        {
          agents: [
            {
              name,
              access_number: getNsnFromNumber(phoneNumber),
              cc_access_number: `+${getCountryCodeFromNumber(phoneNumber)}`
            }
          ]
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
  getDestinations: action,
  postDestination: action,
  deleteDestination: action,
  destinations: observable,
  isDestinationsLoading: observable,
  isDestinationPosting: observable,
  isDestinationDeleting: observable
})

export default new Destinations()
