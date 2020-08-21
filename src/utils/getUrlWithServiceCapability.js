// Returns url ending for service capability type
import {
  BASIC,
  ADVANCED,
  IVR,
  BASIC_URL,
  ADVANCED_URL
} from 'utils/types/serviceCapabilities'

const getUrlWithServiceCapability = (serviceCapability, instance = {}) => {
  if (Object.keys(instance).length) {
    // 'busy' number case with link to specific instance
    switch (serviceCapability) {
      case BASIC:
        return `${BASIC}/${instance.phoneNumber}`
      case ADVANCED:
        return ADVANCED_URL
      case IVR:
        return `${IVR}/${instance.connected_to}`
    }
    // return serviceCapability === BASIC ? BASIC_URL : serviceCapability
  } else {
    // 'free' number case with link to list
    return serviceCapability === BASIC ? BASIC_URL : serviceCapability
  }
}

export default getUrlWithServiceCapability
