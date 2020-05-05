import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbers/rangeFilter'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true
  isLoadingEntitlements = true
  isDeletingAssignedNumber = false
  isPostAssignNumbers = false
  totalPagesServer = 0
  currentEntitlement = null
  numbersToAssign = []

  setDefaultValues = () => {
    this.assignedNumbers = []
    this.isAssignedNumbersLoading = true
    this.isLoadingEntitlements = true
    this.isDeletingAssignedNumber = false
    this.isPostAssignNumbers = false
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

  postAssignToSubaccount = (customerId, subaccount, closeAsignModal) => {
    this.isPostAssignNumbers = true
    const objectsWithRangesArr = phoneNumbersRangeFilter(this.numbersToAssign)
    const groupId = subaccount.groupId
    const name = subaccount.groupName

    objectsWithRangesArr.forEach(item => {
      axios
        .post(`tenants/${customerId}/groups/${groupId}/numbers`, {
          range: item.phoneNumbers
            ? [Number(item.rangeStart), Number(item.rangeEnd)]
            : [Number(item.nsn), Number(item.nsn)],
          country_code: item.country_code
        })
        .then(() => {
          closeAsignModal()
          SnackbarStore.enqueueSnackbar({
            message: `${this.numbersToAssign.length} numbers assigned to ${name} subaccount successfully`,
            options: {
              variant: 'success'
            }
          })
        })
        .catch(e =>
          SnackbarStore.enqueueSnackbar({
            message:
              getErrorMessage(e) ||
              `Failed to assign ${this.numbersToAssign.length} numbers to ${name} subaccount`,
            options: {
              variant: 'error'
            }
          })
        )
        .finally(() => {
          this.isPostAssignNumbers = false
        })
    })
  }
}

decorate(AssignedNumbers, {
  assignedNumbers: observable,
  isAssignedNumbersLoading: observable,
  isLoadingEntitlements: observable,
  isDeletingAssignedNumber: observable,
  totalPagesServer: observable,
  currentEntitlement: observable,
  isPostAssignNumbers: observable,
  getAssignedNumbers: action,
  deleteAssignedNumber: action,
  getEntitlementsAndFindCurrent: action,
  setDefaultValues: action,
  setNumbersToAssign: action,
  postAssignToSubaccount: action
})

export default new AssignedNumbers()
