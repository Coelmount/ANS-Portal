import { parsePhoneNumberFromString } from 'libphonenumber-js'

const getCountryCodeFromNumber = phoneNumber => {
  return parsePhoneNumberFromString(phoneNumber).countryCallingCode
}

export default getCountryCodeFromNumber
