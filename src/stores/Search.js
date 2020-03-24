import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'

import axios from 'utils/axios'

export class SearchStore {
  searchResult = null
  emptyResult = null
  isLoading = false
  ansInstance = null

  getSearchResult = phoneNumber => {
    this.isLoading = true
    axios
      .get(`/search/numbers/usages/${phoneNumber}/`)
      .then(res => {
        if (res.status === 200 && res.data.numbers === undefined) {
          this.searchResult = res.data
          this.emptyResult = null
          this.ansInstance = phoneNumber
          this.isLoading = false
        } else {
          this.emptyResult = true
          this.isLoading = false
        }
      })
      .catch(error => {
        this.emptyResult = true
        this.isLoading = false
      })
  }
}

decorate(SearchStore, {
  searchResult: observable,
  emptyResult: observable,
  ansInstance: observable,
  isLoading: observable,
  getSearchResult: action
})

export default createContext(new SearchStore())
