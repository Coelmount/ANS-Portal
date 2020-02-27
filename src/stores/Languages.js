import { createContext } from 'react'
import { decorate, observable, action } from 'mobx'
import i18n from '../i18n'

import axios from 'utils/axios'
import { getLocale } from 'i18n'

export class LanguagesStore {
  isLoadingLang = true
  lang = ''

  getLocale = lang => {
    this.lang = lang
    this.isLoadingLang = true
    axios
      .get(`/configs/applications/ANS_portal/${lang}`)
      .then(res => {
        i18n.addResourceBundle(
          lang,
          'translation',
          JSON.parse(res.data.data),
          true,
          true
        )
        this.isLoadingLang = false
      })
      .catch(e => {
        if (e.response.status === 401) {
          this.isLoadingLang = false
        }
      })
  }
}

decorate(LanguagesStore, {
  isLoadingLang: observable,
  lang: observable,
  getLocale: action
})

export default createContext(new LanguagesStore())
