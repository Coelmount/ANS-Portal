import axios from 'utils/axios'
import { decorate, observable, action } from 'mobx'

import { PROXY_CUSTOM_ANS, PROXY_P6 } from 'utils/axios'
import SnackbarStore from './Snackbar'

export class AssignedNumbers {
  assignedNumbers = []
  isAssignedNumbersLoading = true

  getAssignedNumbers = id => {
    this.isAssignedNumbersLoading = true
    axios
      .get(
        `${PROXY_P6}/tenants/${id}/numbers?cols=["nsn","country_code","type","customer","customer_account","connected_to","service_capabilities","free_text_1","state"]&paging={"page_number":1,"page_size":5}`
      )
      .then(res => {
        console.log(res.data)
        this.isAssignedNumbersLoading = false
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: 'Failed to get assigned numbers',
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
