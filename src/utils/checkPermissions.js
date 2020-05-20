export const adminAccessLvl = 1
export const customerAccessLvl = 2
export const subaccauntAccessLvl = 3

export const validateAccessLvl = (ids, accessComponent) => {
  let accessLevel = null
  if (!!ids) {
    const idsObj = JSON.parse(ids)
    if (idsObj.tenant_id && idsObj.group_id) {
      accessLevel = 3 // group admin
    } else if (ids.tenant_id) {
      accessLevel = 2 // customer admin
    } else {
      accessLevel = 4 // error check user permissions
    }
  } else {
    accessLevel = 1 // admin
  }
  return accessComponent >= accessLevel
}
