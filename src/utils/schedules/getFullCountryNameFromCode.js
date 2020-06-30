import { getCountry } from 'countries-and-timezones'

const getFullCountryNameFromCode = code => {
  return getCountry(code).name
}

export default getFullCountryNameFromCode
