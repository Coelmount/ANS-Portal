import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { reactI18nextModule } from 'react-i18next'

import translationEN from './source/locales/en/translation.json'
import translationFR from './source/locales/fr/translation.json'
import translationPT from './source/locales/pt/translation.json'
import translationES from './source/locales/es/translation.json'

// the translations
const resources = {
  en: {
    translation: translationEN
  },
  fr: {
    translation: translationFR
  },
  pt: {
    translation: translationPT
  },
  es: {
    translation: translationES
  }
}

i18n
  .use(detector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng')
      ? localStorage.getItem('i18nextLng')
      : 'en',
    fallbackLng: 'en', // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export default i18n
