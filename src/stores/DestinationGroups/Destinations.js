import { decorate, action, observable, runInAction } from 'mobx'

import SnackbarStore from '../Snackbar'
import differenceBy from 'lodash/differenceBy'
import difference from 'lodash/difference'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'

export class Destinations {
  currentGroupId = ''
  availableDestinationsForPost = []
  destinations = []
  isDestinationsLoading = false
  isAvailableDestinationsLoading = true
  isDestinationPosting = false
  isDestinationDeleting = false
  isDestinationsUpdating = false

  getDestinations = ({ customerId, groupId, destinationGroupName }) => {
    runInAction(() => {
      this.destinations = []
      this.isDestinationsLoading = true
    })

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.ans_id === destinationGroupName
        )
        this.currentGroupId = currentGroup.ans_id

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/destinations`
          )
          .then(res => {
            runInAction(() => {
              this.isDestinationsLoading = false
            })
            this.destinations = res.data.destinations.map(
              (destination, index) => {
                return {
                  ...destination,
                  id: index,
                  checked: false,
                  hover: false
                }
              }
            )
          })
          .catch(e => {
            runInAction(() => {
              this.isDestinationsLoading = false
            })
            SnackbarStore.enqueueSnackbar({
              message:
                getErrorMessage(e) || 'Failed to fetch destinations list',
              options: {
                variant: 'error'
              }
            })
          })
      })
  }

  getAvailableDestinationsForPost = ({ customerId, groupId }) => {
    this.availableDestinationsForPost = []
    this.isAvailableDestinationsLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/available`
      )
      .then(res => {
        const correctData = res.data.destinations.filter(item => item)
        const transformedData = correctData.map((destination, index) => {
          return {
            ...destination,
            id: index,
            checked: false,
            hover: false
          }
        })
        this.availableDestinationsForPost = differenceBy(
          transformedData,
          this.destinations,
          'userId'
        )
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) || 'Failed to fetch available destinations list',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isAvailableDestinationsLoading = false
      })
  }

  postDestinations = ({ customerId, groupId, closeModal, numbers }) => {
    this.isDestinationPosting = true
    const existDestinationsIds = this.destinations.map(
      destination => destination.userId
    )
    const checkedDestinations = numbers.filter(number => number.checked)
    const checkedDestinationsIds = checkedDestinations.map(
      checkedDestination => checkedDestination.userId
    )
    const totalArr = existDestinationsIds.concat(checkedDestinationsIds)

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}`,
        {
          destinations: totalArr
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: `Destination${
            checkedDestinationsIds.length > 1 ? 's' : ''
          } successfully created`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to create destination${
              checkedDestinationsIds.length > 1 ? 's' : ''
            }`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationPosting = false
      })
  }

  deleteDestinations = ({ customerId, groupId, closeModal, numbers }) => {
    this.isDestinationDeleting = true
    const existDestinationsIds = this.destinations.map(
      destination => destination.userId
    )
    const checkedDestinations = numbers.filter(number => number.checked)
    const checkedDestinationsIds = checkedDestinations.map(
      checkedDestination => checkedDestination.userId
    )
    const totalArr = difference(existDestinationsIds, checkedDestinationsIds)

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}`,
        {
          destinations: totalArr
        }
      )
      .then(() => {
        closeModal()
        SnackbarStore.enqueueSnackbar({
          message: `Destination${
            checkedDestinationsIds.length > 1 ? 's' : ''
          } successfully deleted`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to delete destination${
              checkedDestinationsIds.length > 1 ? 's' : ''
            }`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDestinationDeleting = false
      })
  }

  putDestinations = ({
    customerId,
    groupId,
    destinationGroupName,
    numbers,
    callback
  }) => {
    runInAction(() => {
      this.isDestinationsUpdating = true
    })

    const reorderedDestinationGroups = {
      destinations: numbers.map(number => number.userId)
    }
    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${destinationGroupName}`,
        reorderedDestinationGroups
      )
      .then(() => {
        if (callback) callback()
        runInAction(() => {
          this.isDestinationsUpdating = false
        })
        SnackbarStore.enqueueSnackbar({
          message: 'Destinations successfully updated',
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        if (callback) callback()
        runInAction(() => {
          this.isDestinationsUpdating = false
        })
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to update destinations',
          options: {
            variant: 'error'
          }
        })
      })
  }

  cancelOrderUpdate = callback => {
    callback(this.destinations)
  }
}

decorate(Destinations, {
  getDestinations: action,
  getAvailableDestinationsForPost: action,
  postDestinations: action,
  deleteDestinations: action,
  putDestinations: action,
  cancelOrderUpdate: action,

  availableDestinationsForPost: observable,
  destinations: observable,
  isDestinationsLoading: observable,
  isAvailableDestinationsLoading: observable,
  isDestinationPosting: observable,
  isDestinationDeleting: observable,
  isDestinationsUpdating: observable
})

export default new Destinations()
