import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true

  getAssignedNumbers = id => {
    this.isAssignedNumbersLoading = true
    axios
      .get(
        `/tenants/${id}/numbers?cols=["nsn","country_code","type","customer","customer_account","connected_to","service_capabilities","free_text_1","state"]&paging={"page_number":1,"page_size":5}`
      )
      .then(res => {
        this.isAssignedNumbersLoading = false
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
}

decorate(AssignedNumbers, {
  assignedNumbers: observable,
  getAssignedNumbers: action
})

export default new AssignedNumbers()
