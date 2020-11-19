import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'
import phoneNumbersRangeFilter from 'utils/phoneNumbers/rangeFilter'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true
  isLoadingEntitlements = true
  isDisconnectingNumber = false
  isDeassigningNumber = false
  isPostAssignNumbers = false
  totalPagesServer = 0
  currentEntitlement = null
  numbersToAssign = []
  numbersToDeassign = []
  numbersToDisconnect = []
  subaccountLinkId = ''
  isSubaccountLinkIdLoading = false

  setDefaultValues = () => {
    this.assignedNumbers = []
    this.isAssignedNumbersLoading = true
    this.isLoadingEntitlements = true
    this.isDisconnectingNumber = false
    this.isDeassigningNumber = false
    this.isPostAssignNumbers = false
    this.totalPagesServer = 0
    this.currentEntitlement = null
    this.numbersToAssign = []
    this.numbersToDeassign = []
    this.numbersToDisconnect = []
    this.isNumbersDeassigned = false
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

  getSubaccountId = (customerId, subaccountName) => {
    this.isSubaccountLinkIdLoading = true
    this.subaccountLinkId = ''
    axios
      .get(
        `/tenants/${customerId}/groups?sensitiveGroupNameEquals=${subaccountName}`
      )
      .then(res => {
        this.subaccountLinkId = res.data.groups[0].groupId
      })
      .finally(() => {
        this.isSubaccountLinkIdLoading = false
      })
  }

  clearSubaccountLinkId = () => {
    this.subaccountLinkId = ''
  }

  getEntitlementsAndFindCurrent = (customerId, numbersId) => {
    this.isLoadingEntitlements = true
    this.assignedNumbers = []
    this.currentEntitlement = null
    axios
      .get(`/tenants/${customerId}/entitlements`)
      .then(res => {
        return res.data.entitlements
      })
      .then(entitlements => {
        //chain then
        this.isAssignedNumbersLoading = true
        axios
          .get(`/tenants/${customerId}/entitlements/${numbersId}/numbers`)
          .then(res => {
            const transformedAssignedNumbers = res.data.numbers.map(item => {
              return {
                inUse: item.connected_to ? item.connected_to : 'no',
                subaccount: item.customer_account
                  ? item.customer_account
                  : 'none',
                phoneNumber: `${item.country_code}${item.nsn}`,
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

  deassignNumbersSubLvl = ({
    customerId,
    groupId,
    numbers,
    closeModal,
    callback
  }) => {
    this.isDeassigningNumber = true
    closeModal && closeModal()

    const amount = this.numbersToDeassign.length
    const deassignSubject = amount > 1 ? 'numbers' : 'number'

    numbers.forEach((item, index) => {
      axios
        .delete(`/tenants/${customerId}/groups/${groupId}/numbers`, {
          data: {
            range: item.phoneNumbers
              ? [Number(item.rangeStart), Number(item.rangeEnd)]
              : [Number(item.nsn), Number(item.nsn)],
            country_code: item.country_code
          }
        })
        .then(() => {
          if (index === numbers.length - 1) {
            SnackbarStore.enqueueSnackbar({
              message: `${amount} phone ${deassignSubject} deassigned successfully`,
              options: {
                variant: 'success'
              }
            })
          }
          callback && callback()
        })
        .catch(e => {
          SnackbarStore.enqueueSnackbar({
            message:
              getErrorMessage(e) ||
              `Failed to deassign ${amount} ${deassignSubject}`,
            options: {
              variant: 'error'
            }
          })
        })
        .finally(() => {
          this.isNumbersDeassigned = true
          this.isDeassigningNumber = false
          this.numbersToDeassign = []
        })
    })
  }

  deassignNumbers = ({ customerId, callback }) => {
    this.isDeassigningNumber = true
    callback()

    const amount = this.numbersToDeassign.length
    const deassignSubject = amount > 1 ? 'numbers' : 'number'
    const objectsWithRangesArr = phoneNumbersRangeFilter(this.numbersToDeassign)

    objectsWithRangesArr.forEach((item, index) => {
      const groupName = item.customer_account

      axios
        .get(
          `/tenants/${customerId}/groups?sensitiveGroupNameEquals=${groupName}`
        )
        .then(res => {
          if (res.data.groups.length && res.data.groups[0].groupId) {
            return res.data.groups[0].groupId
          }
        })
        .then(groupId => {
          if (!groupId) {
            SnackbarStore.enqueueSnackbar({
              message: `Failed to deassign ${amount} ${deassignSubject}`,
              options: {
                variant: 'error'
              }
            })

            this.isNumbersDeassigned = true
            this.isDeassigningNumber = false
            this.numbersToDeassign = []
            return
          }
          axios
            .delete(`/tenants/${customerId}/groups/${groupId}/numbers`, {
              data: {
                range: item.phoneNumbers
                  ? [Number(item.rangeStart), Number(item.rangeEnd)]
                  : [Number(item.nsn), Number(item.nsn)],
                country_code: item.country_code
              }
            })
            .then(() => {
              if (index === objectsWithRangesArr.length - 1) {
                SnackbarStore.enqueueSnackbar({
                  message: `${amount} phone ${deassignSubject} deassigned successfully`,
                  options: {
                    variant: 'success'
                  }
                })
              }
            })
            .catch(e => {
              SnackbarStore.enqueueSnackbar({
                message:
                  getErrorMessage(e) ||
                  `Failed to deassign ${amount} ${deassignSubject}`,
                options: {
                  variant: 'error'
                }
              })
            })
            .finally(() => {
              this.isNumbersDeassigned = true
              this.isDeassigningNumber = false
              this.numbersToDeassign = []
            })
        })
    })
  }

  disconnectNumbers = ({ customerId, callback }) => {
    this.isDisconnectingNumber = true
    callback()

    const amount = this.numbersToDisconnect.length
    const disconnectSubject = amount > 1 ? 'numbers' : 'number'
    const objectsWithRangesArr = phoneNumbersRangeFilter(
      this.numbersToDisconnect
    )

    objectsWithRangesArr.forEach((item, index) => {
      axios
        .delete(`/tenants/${customerId}/numbers`, {
          data: {
            range: item.phoneNumbers
              ? [Number(item.rangeStart), Number(item.rangeEnd)]
              : [Number(item.nsn), Number(item.nsn)],
            country_code: item.country_code
          }
        })
        .then(() => {
          if (index === objectsWithRangesArr.length - 1) {
            SnackbarStore.enqueueSnackbar({
              message: `${amount} phone ${disconnectSubject} disconnected successfully`,
              options: {
                variant: 'success'
              }
            })
          }
        })
        .catch(e => {
          SnackbarStore.enqueueSnackbar({
            message:
              getErrorMessage(e) ||
              `Failed to disconnect ${amount} ${disconnectSubject}`,
            options: {
              variant: 'error'
            }
          })
        })
        .finally(() => {
          this.isDisconnectingNumber = false
          this.numbersToDisconnect = []
        })
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
        country_code: item.country_code
        // service_capabilities: 'basic'
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

  postAssignToSubaccountWithClearData = (
    tenantId,
    groupId,
    data,
    closeAsignModal
  ) => {
    this.isPostAssignNumbers = true

    const sendSubject = data.length > 1 ? 'numbers' : 'number'

    axios
      .post(`tenants/${tenantId}/groups/${groupId}/numbers`, data)
      .then(() => {
        closeAsignModal()
        SnackbarStore.enqueueSnackbar({
          message: `${data.ranges.length} ${sendSubject} assigned to ${groupId} subaccount successfully`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message:
            getErrorMessage(e) ||
            `Failed to assign ${data.ranges.length} ${sendSubject} to ${groupId} subaccount`,
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
        variant: 'info'
      }
    })
  }
}

decorate(AssignedNumbers, {
  assignedNumbers: observable,
  isAssignedNumbersLoading: observable,
  isLoadingEntitlements: observable,
  isDisconnectingNumber: observable,
  isDeassigningNumber: observable,
  totalPagesServer: observable,
  currentEntitlement: observable,
  isPostAssignNumbers: observable,
  numbersToDisconnect: observable,
  numbersToDeassign: observable,
  subaccountLinkId: observable,
  isSubaccountLinkIdLoading: observable,
  isNumbersDeassigned: observable,
  getAssignedNumbers: action,
  disconnectNumbers: action,
  deassignNumbers: action,
  getEntitlementsAndFindCurrent: action,
  setDefaultValues: action,
  setNumbersToAssign: action,
  setNumbersToDisconnect: action,
  setNumbersToDeassign: action,
  postAssignToSubaccount: action,
  showErrorNotification: action,
  getSubaccountId: action,
  clearSubaccountLinkId: action,
  postAssignToSubaccountWithClearData: action
})

export default new AssignedNumbers()
