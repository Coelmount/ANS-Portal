// require id field of object
const transformOnChange = (array, newValue, id, fieldName = 'checked') => {
  const transformedArray = [...array]
  const index = array.findIndex(el => el.id === id)
  transformedArray[index][fieldName] = newValue
  return transformedArray
}

export default transformOnChange
