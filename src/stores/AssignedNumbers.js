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

  // getAssignedNumbers = (customerId, numbersId, page, perPage) => {
  //   this.isAssignedNumbersLoading = true
  //   axios
  //     // .get(
  //     //   `/tenants/${customerId}/numbers?cols=["nsn","country_code","type","customer","customer_account","connected_to","service_capabilities","free_text_1","state"]&paging={"page_number":${page},"page_size":${perPage}}`
  //     // )
  //     .get(`/tenants/${customerId}/entitlements/${numbersId}/numbers`)
  //     .then(res => {
  //       console.log(res)

  //       const transformedAssignedNumbers = res.data.numbers.map(item => {
  //         return {
  //           usedBy: item.connected_to ? item.connected_to : 'none',
  //           status: item.connected_to ? 'in_use' : 'available',
  //           subaccountId: item.customer_account
  //             ? item.customer_account
  //             : 'none',
  //           checked: false,
  //           hover: false,
  //           phoneNumber: `${item.country_code} ${item.nsn}`,
  //           ...item
  //         }
  //       })
  //       this.assignedNumbers = transformedAssignedNumbers
  //       // const pagination = res.data.pagination
  //       // this.totalPagesServer = pagination[2]
  //     })
  //     .catch(e =>
  //       SnackbarStore.enqueueSnackbar({
  //         message: getErrorMessage(e) || 'Failed to get assigned numbers',
  //         options: {
  //           variant: 'error'
  //         }
  //       })
  //     )
  //     .finally(() => (this.isAssignedNumbersLoading = false))
  // }

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
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
      .finally(() => {
        this.isDeletingAssignedNumber = false
      })
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
          // .get(
          //   `/tenants/${customerId}/numbers?cols=["nsn","country_code","type","customer","customer_account","connected_to","service_capabilities","free_text_1","state"]&paging={"page_number":${page},"page_size":${perPage}}`
          // )
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
            // const pagination = res.data.pagination
            // this.totalPagesServer = pagination[2]
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

  setDefaultValues = () => {
    this.assignedNumbers = []
    this.isAssignedNumbersLoading = true
    this.isLoadingEntitlements = true
    this.isDeletingAssignedNumber = false
    this.totalPagesServer = 0
    this.currentEntitlement = null
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
  setDefaultValues: action
})

export default new AssignedNumbers()
