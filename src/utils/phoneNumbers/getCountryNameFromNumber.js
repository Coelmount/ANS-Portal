import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from 'countries-and-timezones'

export default phoneNumber => {
  if (phoneNumber) {
    // Temporary soluon: TODO update in onward routing feature
    if (phoneNumber.startsWith('+999')){
      return 'Onward routing';
    }
    if (!phoneNumber.startsWith("+")){
      return 'Routing with prefix';
    }
    const number = parsePhoneNumberFromString(phoneNumber)
    const country = number.country
    const fullCountry = getCountry(country)
    if (fullCountry) {
      const result = fullCountry.name
      return result
    } else return ''
  } else return ''
}
