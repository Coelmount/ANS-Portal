import { decorate, observable, action } from 'mobx'
import i18n from '../i18n'

import axios from 'utils/axios'

import SnackbarStore from 'stores/Snackbar'
import getErrorMessage from 'utils/getErrorMessage'

export class LanguagesStore {
  isLoadingLang = true
  lang = ''

  getLocale = (lang, provideError) => {
    this.lang = lang
    this.isLoadingLang = true
    axios
      .get(`/configs/applications/ANS_portal/${lang}`)
      .then(res => {
        try {
          JSON.parse(res.data.data)
        } catch (e) {
          localStorage.setItem('i18nextLng', 'en')
          this.isLoadingLang = false
          return
        }
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
        provideError &&
          SnackbarStore.enqueueSnackbar({
            message: getErrorMessage(e) || `Failed to get ${lang} localization`,
            options: {
              variant: 'error'
            }
          })
      })
  }
}

decorate(LanguagesStore, {
  isLoadingLang: observable,
  lang: observable,
  getLocale: action
})

export default new LanguagesStore()
