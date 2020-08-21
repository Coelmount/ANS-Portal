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

const getUrlWithServiceCapability = (serviceCapability, instance = {}) => {
  if (Object.keys(instance).length) {
    // 'busy' number case with link to specific instance
    switch (serviceCapability) {
      case BASIC:
        return `${BASIC}/${instance.phoneNumber}`
      case ADVANCED:
        return `${ADVANCED_URL}/${instance.connected_to}`
      case IVR:
        return `${IVR}/${instance.connected_to}`
      case TBR:
        return `${BUSY_TBR_URL}/${instance.connected_to}`
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
