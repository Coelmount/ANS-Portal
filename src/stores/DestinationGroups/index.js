import { decorate, observable, action, computed } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class DestinationGroups {
  destinationGroups = []
  isDestinationGroupsLoading = true
  isDestinationGroupPosting = false
  isDestinationGroupDeleting = false

  getDestinationGroups = ({ customerId, groupId }) => {
    this.destinationGroups = []
    this.isDestinationGroupsLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        this.destinationGroups = res.data.ans_advanced.map(
          (destination, index) => {
            return {
              ...destination,
              id: index,
              routingPolicy: destination.routing_policy,
              destinations: destination.destinations.length
            }
          }
        )
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch destination groups',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationGroupsLoading = false
      })
  }

  postDestinationGroup = ({
    customerId,
    groupId,
    name,
    phoneNumber,
    closeModal
  }) => {
    console.log(name, phoneNumber, 'post')
    // this.isDestinationGroupPosting = true
    axios
      .post(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`, {
        name,
        phoneNumber
      })
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination group successfully posted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to post destination group',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // this.isDestinationGroupPosting = false
      })
  }

  deleteDestinationGroup = ({
    customerId,
    groupId,
    destinationId,
    closeModal
  }) => {
    console.log(destinationId, 'delete')
    // this.isDestinationGroupDeleting = true
    axios
      .delete(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${destinationId}`
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: 'Destination groups successfully deleted',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete destination group',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        // isDestinationGroupDeleting = false
      })
  }
}

decorate(DestinationGroups, {
  destinationGroups: observable,
  isDestinationGroupsLoading: observable,
  isDestinationGroupPosting: observable,
  getDestinationGroups: action,
  postDestinationGroup: action,
  deleteDestinationGroup: action
})

export default new DestinationGroups()
