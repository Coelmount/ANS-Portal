import { decorate, observable, action } from 'mobx'
import capitalize from 'lodash/capitalize'

import getErrorMessage from 'utils/getErrorMessage'
import SnackbarStore from '../Snackbar'
import axios from 'utils/axios'
import { toJS } from 'mobx'

export class Settings {
  currentGroupId = ''
  settings = null
  isSettingsLoading = true
  isSettingsUpdating = false

  getSettings = ({ customerId, groupId, destinationGroupName }) => {
    this.settings = {}
    this.isSettingsLoading = true

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
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}`
          )
          .then(res => {
            const data = res.data
            this.settings = {
              ...data,
              policy: data.routing_policy,
              huntAfterNoAnswer: true,
              amountSkipRings: data.no_answer_number_of_rings
            }
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
            this.isSettingsLoading = false
          })
      })
  }

  updateSettings = ({ customerId, groupId, updatedSettings }) => {
    this.isSettingsUpdating = true
    const { name, policy, huntAfterNoAnswer, amountSkipRings } = updatedSettings

    axios
      .put(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}`,
        {
          name,
          routing_policy: capitalize(policy),
          no_answer_hunt: huntAfterNoAnswer,
          no_answer_number_of_rings: amountSkipRings
        }
      )
      .then(() => {
        SnackbarStore.enqueueSnackbar({
          message: `Settings successfully updated`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || `Failed to update settings`,
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isSettingsUpdating = false
      })
  }
}

decorate(Settings, {
  getSettings: action,
  updateSettings: action,
  settings: observable,
  isSettingsLoading: observable,
  isSettingsUpdating: observable
})

export default new Settings()
