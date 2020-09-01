import { parsePhoneNumberFromString } from 'libphonenumber-js'

export default phoneNumber => {
  return parsePhoneNumberFromString(phoneNumber).nationalNumber
}
