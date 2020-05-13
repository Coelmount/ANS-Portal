// require id field of object
const transformOnChange = (array, checked, id, fieldName = 'checked') => {
  const transformedArray = [...array]
  const index = array.findIndex(el => el.id === id)
  transformedArray[index][fieldName] = checked
  return transformedArray
}

export default transformOnChange
