import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true
  isDeletingAssignedNumber = false

  getAssignedNumbers = id => {
    this.isAssignedNumbersLoading = true
    axios
      .get(
        `/tenants/${id}/numbers?cols=["nsn","country_code","type","customer","customer_account","connected_to","service_capabilities","free_text_1","state"]&paging={"page_number":1,"page_size":5}`
      )
      .then(res => {
        const transformedAssignedNumbers = res.data.numbers.map(item => {
          return { status: item.connected_to ? 'in_use' : 'available', subaccountId: item.customer_account ? item.customer_account : 'none', checked: false, hover: false, phoneNumber: `${item.country_code} ${item.nsn}`, ...item }
        })
        this.assignedNumbers = transformedAssignedNumbers
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
        if (e.response.status === 400) {
          this.isDeletingCustomer = false
        }
      })
      .finally(() => {
        this.isDeletingAssignedNumber = false
      })
  }
}

decorate(AssignedNumbers, {
  assignedNumbers: observable,
  isAssignedNumbersLoading: observable,
  isDeletingAssignedNumber: observable,
  getAssignedNumbers: action,
  deleteAssignedNumber: action
})

export default new AssignedNumbers()
