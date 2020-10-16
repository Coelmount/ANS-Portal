import getCountryNameFromNumber from './getCountryNameFromNumber'

const getDestinationType = (value) => {

  if (!value.length) return 'None'

  if (value.startsWith('+999') || value.startsWith('00999'))
    return 'Onward routing'

  else if (value.startsWith('00'))
    return 'International call forwarding'

  else if (value.startsWith('+'))
    return getCountryNameFromNumber(value)

  return 'Custom routing'
}

export default getDestinationType