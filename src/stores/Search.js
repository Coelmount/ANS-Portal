import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

import SnackbarStore from './Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class SearchStore {
  searchResult = null
  emptyResult = null
  isLoading = false
  ansInstance = null

  getSearchResult = phoneNumber => {
    if (!phoneNumber) {
      this.clearSearchResult()
    } else {
      this.isLoading = true
      this.searchResult = null
      this.ansInstance = null
      axios
        .get(`/search/numbers/usages/${phoneNumber}/`)
        .then(res => {
          this.searchResult = res.data
          this.emptyResult = null
          this.ansInstance = phoneNumber
        })
        .catch(e => {
          this.emptyResult = true
          SnackbarStore.enqueueSnackbar({
            message: getErrorMessage(e) || 'Failed to fetch phone numbers',
            options: {
              variant: 'error'
            }
          })
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }

  clearSearchResult = () => {
    this.searchResult = null
    this.emptyResult = null
  }
}

decorate(SearchStore, {
  searchResult: observable,
  emptyResult: observable,
  ansInstance: observable,
  isLoading: observable,
  getSearchResult: action,
  clearSearchResult: action
})

export default new SearchStore()
