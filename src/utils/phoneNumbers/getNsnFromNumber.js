import { parsePhoneNumberFromString } from 'libphonenumber-js'

const getNsnFromNumber = phoneNumber => {
  return parsePhoneNumberFromString(phoneNumber).nationalNumber
}

export default getNsnFromNumber
