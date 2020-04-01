import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

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

      axios
        .get(`/search/numbers/usages/${phoneNumber}/`)
        .then(res => {
          this.searchResult = res.data
          this.emptyResult = null
          this.ansInstance = phoneNumber
        })
        .catch(error => {
          this.emptyResult = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }

  clearSearchResult = () => {
    this.searchResult = null
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
