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
  numbersToDeassign = []
  numbersToDisconnect = []

  setDefaultValues = () => {
    this.assignedNumbers = []
    this.isAssignedNumbersLoading = true
    this.isLoadingEntitlements = true
    this.isDeletingAssignedNumber = false
    this.isPostAssignNumbers = false
    this.totalPagesServer = 0
    this.currentEntitlement = null
    this.numbersToAssign = []
    this.numbersToDeassign = []
    this.numbersToDisconnect = []
  }

  setNumbersToAssign = numbers => {
    this.numbersToAssign = numbers
  }

  setNumbersToDeassign = numbers => {
    this.numbersToDeassign = numbers
  }

  setNumbersToDisconnect = numbers => {
    this.numbersToDisconnect = numbers
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
            const transformedAssignedNumbers = res.data.numbers.map(item => {
              let subaccountId
              if (item.connected_to) {
                const connectedToSub = item.connected_to
                const connectedToSubSplitedArr = connectedToSub.split('_')
                subaccountId =
                  connectedToSubSplitedArr[0] +
                  '_' +
                  connectedToSubSplitedArr[1]
              }
              return {
                inUse: item.connected_to ? item.connected_to : 'no',
                subaccount: item.customer_account
                  ? item.customer_account
                  : 'none',
                phoneNumber: `${item.country_code} ${item.nsn}`,
                subaccountId: subaccountId || null,
                checked: false,
                hover: false,
                isSelectedToDeassign: false,
                isSelectedToDisconnect: false,
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
  deassignNumbers = ({ customerId, callback }) => {
    console.log(this.numbersToDeassign, 'numbersToDeassign')
  }

  disconnectNumbers = ({ customerId, callback }) => {
    console.log(this.numbersToDisconnect, 'numbers to disconnect')
    this.isDeletingAssignedNumber = true
    const objectsWithRangesArr = phoneNumbersRangeFilter(
      this.numbersToDisconnect
    )
    const sendSubject =
      this.numbersToDisconnect.length > 1 ? 'numbers' : 'number'
    const arrToSend = []
    objectsWithRangesArr.forEach(item => {
      arrToSend.push({
        range: item.phoneNumbers
          ? [Number(item.rangeStart), Number(item.rangeEnd)]
          : [Number(item.nsn)],
        country_code: item.country_code
      })
    })
    axios
      .delete(`/tenants/${customerId}/numbers`, {
        data: {
          ranges: arrToSend
        }
      })
      .then(() => {
        this.getAssignedNumbers()
        callback()
        SnackbarStore.enqueueSnackbar({
          message: `${this.numbersToDeassign.length} phone number(s) deassigned successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e => {
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to deassign number(s)',
          options: {
            variant: 'error'
          }
        })
      })
      .finally(() => {
        this.isDeletingAssignedNumber = false
      })
  }

  postAssignToSubaccount = (customerId, subaccount, closeAsignModal) => {
    this.isPostAssignNumbers = true
    const objectsWithRangesArr = phoneNumbersRangeFilter(this.numbersToAssign)
    const groupId = subaccount.groupId
    const name = subaccount.groupName
    const sendSubject = this.numbersToAssign.length > 1 ? 'numbers' : 'number'

    const arrToSend = []
    objectsWithRangesArr.forEach(item => {
      arrToSend.push({
        range: item.phoneNumbers
          ? [Number(item.rangeStart), Number(item.rangeEnd)]
          : [Number(item.nsn)],
        country_code: item.country_code,
        service_capabilities: 'basic'
      })
    })
    axios
      .post(`tenants/${customerId}/groups/${groupId}/numbers`, {
        ranges: arrToSend
      })
      .then(() => {
        closeAsignModal()
        SnackbarStore.enqueueSnackbar({
          message: `${this.numbersToAssign.length} ${sendSubject} assigned to ${name} subaccount successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to assign ${this.numbersToAssign.length} ${sendSubject} to ${name} subaccount`,
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => {
        this.isPostAssignNumbers = false
      })
  }

  showErrorNotification = message => {
    SnackbarStore.enqueueSnackbar({
      message: message,
      options: {
        variant: 'error'
      }
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
  disconnectNumbers: action,
  deassignNumbers: action,
  getEntitlementsAndFindCurrent: action,
  setDefaultValues: action,
  setNumbersToAssign: action,
  setNumbersToDisconnect: action,
  setNumbersToDeassign: action,
  postAssignToSubaccount: action,
  showErrorNotification: action
})

export default new AssignedNumbers()
