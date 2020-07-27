import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'
import SnackbarStore from '../Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class WhiteBlackList {
  whiteBlackList = {}
  currentGroupId = ''
  isLoadingWhiteBlackList = false
  isAddingNumbers = false

  getWhiteBlackList = ({ customerId, groupId, destinationGroupName }) => {
    this.whiteBlackList = {}
    this.isLoadingWhiteBlackList = true

    axios
      .get(`/tenants/${customerId}/groups/${groupId}/services/ans_advanced`)
      .then(res => {
        const destinationGroups = res.data.ans_advanced
        const currentGroup = destinationGroups.find(
          destinationGroup => destinationGroup.name === destinationGroupName
        )
        this.currentGroupId = currentGroup.ans_id

        axios
          .get(
            `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${currentGroup.ans_id}/call_blocking/`
          )
          .then(res => {
            this.isLoadingWhiteBlackList = false
            this.whiteBlackList = {
              ...res.data,
              allowed_numbers: res.data.allowed_numbers
                ? res.data.allowed_numbers.map(el => ({
                    phoneNumber: el,
                    checked: false,
                    hover: false
                  }))
                : [],
              blocked_numbers: res.data.blocked_numbers
                ? res.data.blocked_numbers.map(el => ({
                    phoneNumber: el,
                    checked: false,
                    hover: false
                  }))
                : []
            }
          })
          .catch(e =>
            SnackbarStore.enqueueSnackbar({
              message: getErrorMessage(e) || 'Failed to fetch white black list',
              options: {
                variant: 'error'
              }
            })
          )
          .finally(() => {
            this.isLoadingWhiteBlackList = false
          })
      })
  }

  postAddNumberToCallBlocking = (customerId, groupId, data, callback) => {
    this.isAddingNumbers = true

    axios
      .post(
        `/tenants/${customerId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/call_blocking/`,
        data
      )
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: `Phone number${
            data.numbers.length > 1 ? 's' : ''
          } successfully added`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to add numbers',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isAddingNumbers = false))
  }

  deleteNumberFromCallBlocking = (
    tenantId,
    groupId,
    singleDelete,
    callback,
    numbers
  ) => {
    this.isDeletingNumbers = true

    const itemsToDelete = !singleDelete
      ? numbers.filter(number => number.checked)
      : []
    const numbersToDelete = itemsToDelete.map(item => item.phoneNumber)
    const dataToDelete = {
      data: {
        mode: this.whiteBlackList.mode,
        numbers: singleDelete ? [numbers] : numbersToDelete
      }
    }

    axios
      .delete(
        `/tenants/${tenantId}/groups/${groupId}/services/ans_advanced/${this.currentGroupId}/call_blocking`,
        dataToDelete
      )
      .then(() => {
        callback && callback()
        SnackbarStore.enqueueSnackbar({
          message: `Number(s) successfully deleted`,
          options: {
            variant: 'success'
          }
        })
      })
      .catch(e =>
        SnackbarStore.enqueueSnackbar({
          message: getErrorMessage(e) || 'Failed to delete number',
          options: {
            variant: 'error'
          }
        })
      )
      .finally(() => (this.isDeletingNumbers = false))
  }
}

decorate(WhiteBlackList, {
  getWhiteBlackList: action,
  postAddNumberToCallBlocking: action,
  deleteNumberFromCallBlocking: action,
  whiteBlackList: observable,
  isLoadingWhiteBlackList: observable,
  isAddingNumbers: observable,
  isDeletingNumbers: observable
})

export default new WhiteBlackList()
