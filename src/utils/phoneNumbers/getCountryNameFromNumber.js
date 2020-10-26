import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from 'countries-and-timezones'

const getCountryNameFromNumber = phoneNumber => {
  if (phoneNumber) {
    const number = parsePhoneNumberFromString(phoneNumber)
    if (number) {
      const country = number.country
      const fullCountry = getCountry(country)
      if (fullCountry) {
        const result = fullCountry.name
        return result
      } else return ''
    }
  } else return ''
}

export default getCountryNameFromNumber
