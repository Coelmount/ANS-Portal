// Returns url ending for service capability type
import {
  BASIC,
  ADVANCED,
  IVR,
  TBR,
  BASIC_URL,
  ADVANCED_URL,
  TBR_URL,
  BUSY_TBR_URL
} from 'utils/types/serviceCapabilities'

const getFormattedInstanceId = id => {
  if (id && id.endsWith('_main')) {
    const arr = id.split('_main')
    console.log(arr[0], 'arr[0]')
    return arr[0]
  }
  return id
}
const getUrlWithServiceCapability = (serviceCapability, instance = {}) => {
  const formattedInstanceId = getFormattedInstanceId(instance.connected_to)
  if (Object.keys(instance).length) {
    // 'busy' number case with link to specific instance
    switch (serviceCapability) {
      case BASIC:
        return `${BASIC}/${instance.phoneNumber}`
      case ADVANCED:
        return `${ADVANCED_URL}/${formattedInstanceId}`
      case IVR:
        return `${IVR}/${formattedInstanceId}`
      case TBR:
        return `${BUSY_TBR_URL}/${formattedInstanceId}`
      default:
        return ''
    }
  } else {
    // 'free' number case with link to list
    switch (serviceCapability) {
      case BASIC:
        return BASIC_URL
      case TBR:
        return TBR_URL
      default:
        return serviceCapability
    }
  }
}

export default getUrlWithServiceCapability
