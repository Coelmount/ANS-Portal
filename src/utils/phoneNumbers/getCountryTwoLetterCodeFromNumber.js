import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from 'countries-and-timezones'

export default phoneNumber => {
  if (phoneNumber) {
    // Temporary soluon: TODO update in onward routing feature
    if (phoneNumber.startsWith('+999')) return 'BE'
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
