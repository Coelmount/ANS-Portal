const removeIfEmpty = (obj, key) => {
  if (!obj[key] || !Object.keys(obj[key]).length) {
    delete obj[key]
    return true
  }

  return false
}

export const removeEmpty = obj => {
  for (let key in obj) {
    const val = obj[key]
    if (!val && typeof val !== 'boolean' && val !== 0) {
      delete obj[key]
    } else if (typeof val === 'object') {
      if (!removeIfEmpty(obj, key)) {
        removeEmpty(val)
        removeIfEmpty(obj, key)
      }
    }
  }

  return obj
}
