import { decorate, action, observable } from 'mobx'

import SnackbarStore from '../Snackbar'
import differenceBy from 'lodash/differenceBy'
import difference from 'lodash/difference'
import axios from 'utils/axios'
import getErrorMessage from 'utils/getErrorMessage'
import getNsnFromNumber from 'utils/phoneNumbers/getNsnFromNumber'
import getCountryCodeFromNumber from 'utils/phoneNumbers/getCountryCodeFromNumber'
import { toJS } from 'mobx'

export class Destinations {
  currentGroupId = ''
  availableDestinationsForPost = []
  destinations = []
  isDestinationsLoading = true
  isAvailableDestinationsLoading = true
  isDestinationPosting = false
  isDestinationDeleting = false

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

  getAvailableDestinationsForPost = ({ customerId, groupId }) => {
    this.availableDestinationsForPost = []
    this.isAvailableDestinationsLoading = true
    axios
      .get(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/destinations/available`
      )
      .then(res => {
        console.log(toJS(res.data), 'res data')
        const data = res.data.destinations.map((destination, index) => {
          return {
            ...destination,
            id: index,
            checked: false,
            hover: false
          }
        })
        this.availableDestinationsForPost = differenceBy(
          data,
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
  getAvailableDestinationsForPost: action,
  postDestinations: action,
  deleteDestinations: action,
  availableDestinationsForPost: observable,
  destinations: observable,
  isDestinationsLoading: observable,
  isAvailableDestinationsLoading: observable,
  isDestinationPosting: observable,
  isDestinationDeleting: observable
})

export default new Destinations()
