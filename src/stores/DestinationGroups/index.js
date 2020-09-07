import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import capitalize from 'lodash/capitalize'

export class DestinationGroups {
  destinationGroups = []
  isDestinationGroupsLoading = true
  isDestinationGroupPosting = false
  isDestinationGroupDeleting = false
  amountOfDestinationGroups = 0
  currentDestinationName = ''

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
              routingPolicy: destination.routing_policy
            }
          }
        )
        this.amountOfDestinationGroups = this.destinationGroups.length
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

  getCurrentNameWithId = ({ customerId, groupId, ansId }) => {
    this.destinationGroups = []
    this.currentDestinationName = ''
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
              destinations: String(destination.destinations.length),
              noAnswerNumberOfRings: destination.no_answer_number_of_rings,
              noAnswerHunt: destination.no_answer_hunt
                ? `Hunt after ${destination.no_answer_number_of_rings} rings`
                : 'No hunt'
            }
          }
        )
        this.amountOfDestinationGroups = this.destinationGroups.length
      })
      .then(() => {
        const currentDestination = this.destinationGroups.find(
          ({ ans_id }) => ans_id === ansId
        )
        this.currentDestinationName = currentDestination.name || ''
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
    policy,
    huntAfterNoAnswer,
    noAnswerNumberOfRings,
    closeModal
  }) => {
    // this.isDestinationGroupPosting = true
    const data = {
      name,
      routing_policy: capitalize(policy)
    }
    if (huntAfterNoAnswer) {
      data.no_answer_hunt = true
      data.no_answer_number_of_rings = Number(noAnswerNumberOfRings)
    }
    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced`,
        data
      )
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
    this.isDestinationGroupDeleting = true
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
        this.isDestinationGroupDeleting = false
      })
  }
}

decorate(DestinationGroups, {
  destinationGroups: observable,
  isDestinationGroupsLoading: observable,
  isDestinationGroupPosting: observable,
  isDestinationGroupDeleting: observable,
  amountOfDestinationGroups: observable,
  currentDestinationName: observable,
  getDestinationGroups: action,
  postDestinationGroup: action,
  deleteDestinationGroup: action,
  getCurrentNameWithId: action
})

export default new DestinationGroups()
