import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from 'countries-and-timezones'

const getCountryTwoLetterCodeFromNumber = phoneNumber => {
  if (phoneNumber) {
    const countryObj = parsePhoneNumberFromString(phoneNumber)
    const country = countryObj.country
    if (country) {
      const countryField = getCountry(country)
      if (countryField) {
        return countryField.id.toLowerCase()
      }
    }
  }
}

export default getCountryTwoLetterCodeFromNumber
