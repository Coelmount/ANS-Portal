import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { getCountry } from 'countries-and-timezones'

export default phoneNumber => {
  return parsePhoneNumberFromString(phoneNumber).nationalNumber
}
