// Calculate type of instance depeends on userType and userId and return instance url part

const getAnsInstanceLink = (numberObj, ansInstance) => {
  const { userType, userId } = numberObj || {}
  const formattedInstanceValue = ansInstance ? ansInstance.trim() : ''

  // IVR
  if (userType === 'Auto Attendant') return `ans_instances/ivr/${userId}`
  // TBR
  else if (userType === 'Normal') {
    if (userId.includes('_ut'))
      return `ans_instances/time_based_routing/${userId}`
    return 'ans_instances/time_based_routing#translations'
  }
  // Basic or Advanced
  else if (userType === 'Hunt Group') {
    if (userId.includes('_b'))
      return `ans_instances/basic/${formattedInstanceValue}`
    else if (userId.includes('_a'))
      return `ans_instances/advanced/destination_groups/${userId}`
  }
  // General numbers page
  return 'phone_numbers'
}

export default getAnsInstanceLink
