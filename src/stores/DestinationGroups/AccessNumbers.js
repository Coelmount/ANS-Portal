import { decorate, observable, action, computed } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import getCountryNameFromNumber from 'utils/phoneNumbers/getCountryNameFromNumber'

export class AccessNumbers {
  mainNumber = null
  secondaryNumbers = []
  isMainNumberLoading = true
  isSecondaryNumbersLoading = true

  getMainNumber = ({ customerId, groupId, destinationGroupName }) => {
    this.accessNumbers = []
    this.isMainNumberLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/main_number`
          )
          .then(res => {
            const number = res.data.mainNumber
            this.mainNumber = {
              value: number,
              country: getCountryNameFromNumber(number)
            }
          })
          .catch(e => {
            SnackbarStore.enqueueSnackbar({
              message: getErrorMessage(e) || 'Failed to fetch access numbers',
              options: {
                variant: 'error'
              }
            })
          })
          .finally(() => {
            this.isMainNumberLoading = false
          })
      })
  }

  getSecondaryNumbers = ({ customerId, groupId, destinationGroupName }) => {
    this.secondaryNumbers = []
    // this.isSecondaryNumbersLoading = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/secondary_numbers`
          )
          .then(res => {
            console.log(res, 'res')
            const numbers = res.data.secondaryNumbers
            this.secondaryNumbers = numbers.map(({ phoneNumber }) => {
              return {
                value: phoneNumber,
                country: getCountryNameFromNumber(phoneNumber)
              }
            })
          })
        // .catch(e => {
        //   SnackbarStore.enqueueSnackbar({
        //     message: getErrorMessage(e) || 'Failed to fetch access numbers',
        //     options: {
        //       variant: 'error'
        //     }
        //   })
        // })
        // .finally(() => {
        //   this.isMainNumberLoading = false
        // })
      })
  }
}

decorate(AccessNumbers, {
  mainNumber: observable,
  secondaryNumbers: observable,
  isMainNumberLoading: observable,
  getMainNumber: action,
  getSecondaryNumbers: action
})

export default new AccessNumbers()
