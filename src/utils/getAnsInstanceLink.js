// Calculate type of instance depeends on userType and userId and return instance url part

const getAnsInstanceLink = (numberObj, ansInstance) => {
  const { userType, userId } = numberObj || {}
  const formattedInstanceValue = ansInstance ? ansInstance.trim() : ''

  // IVR
  if (userType === 'Auto Attendant') return `/ivr/${userId}`
  // TBR
  else if (userType === 'Normal') {
    if (userId.includes('_ut')) return `/time_based_routing/${userId}`
    return '/time_based_routing#translations'
  }
  // Basic or Advanced
  else if (userType === 'Hunt Group') {
    if (userId.includes('_b')) return `/basic/${formattedInstanceValue}`
    else if (userId.includes('_a'))
      return `/advanced/destination_groups/${userId}`
  }
  // General page
  return ''
}

export default getAnsInstanceLink
