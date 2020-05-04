import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true
  isLoadingEntitlements = true
  isDeletingAssignedNumber = false
  totalPagesServer = 0
  currentEntitlement = null
  numbersToAssign = []

  setDefaultValues = () => {
    this.assignedNumbers = []
    this.isAssignedNumbersLoading = true
    this.isLoadingEntitlements = true
    this.isDeletingAssignedNumber = false
    this.totalPagesServer = 0
    this.currentEntitlement = null
  }

  getEntitlementsAndFindCurrent = (customerId, numbersId) => {
    this.isLoadingEntitlements = true
    axios
      .get(`/tenants/${customerId}/entitlements`)
      .then(res => {
        return res.data.entitlments
      })
      .then(entitlements => {
        //nested then
        this.isAssignedNumbersLoading = true
        axios
          .get(`/tenants/${customerId}/entitlements/${numbersId}/numbers`)
          .then(res => {
            console.log(res)

            const transformedAssignedNumbers = res.data.numbers.map(item => {
              return {
                usedBy: item.connected_to ? item.connected_to : 'none',
                status: item.connected_to ? 'in_use' : 'available',
                subaccountId: item.customer_account
                  ? item.customer_account
                  : 'none',
                checked: false,
                hover: false,
                phoneNumber: `${item.country_code} ${item.nsn}`,
                ...item
              }
            })
            this.assignedNumbers = transformedAssignedNumbers
            // --find current
            this.currentEntitlement = entitlements.find(
              item => item.id === Number(numbersId)
            )
          })
          .catch(e =>
            SnackbarStore.enqueueSnackbar({
              message: getErrorMessage(e) || 'Failed to get assigned numbers',
              options: {
                variant: 'error'
              }
            })
          )
          .finally(() => (this.isAssignedNumbersLoading = false))
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to fetch entitlements',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isLoadingEntitlements = false
      })
  }

  deleteAssignedNumber = ({ id, callback }) => {
    this.isDeletingAssignedNumber = true
    axios
      .delete(`/tenants/${id}/numbers/`)
      .then(() => {
        this.getAssignedNumbers()
        callback()
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete assigned number',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDeletingAssignedNumber = false
      })
  }

  setNumbersToAssign = numbers => {
    this.numbersToAssign = numbers
  }
}

decorate(AssignedNumbers, {
  assignedNumbers: observable,
  isAssignedNumbersLoading: observable,
  isLoadingEntitlements: observable,
  isDeletingAssignedNumber: observable,
  totalPagesServer: observable,
  currentEntitlement: observable,
  getAssignedNumbers: action,
  deleteAssignedNumber: action,
  getEntitlementsAndFindCurrent: action,
  setDefaultValues: action,
  setNumbersToAssign: action
})

export default new AssignedNumbers()
