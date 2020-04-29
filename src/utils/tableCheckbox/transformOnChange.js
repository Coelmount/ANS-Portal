// require id field of object
const transformOnChange = (array, checked, id) => {
  const transformedArray = [...array]
  const index = array.findIndex(el => el.id === id)
  transformedArray[index].checked = checked
  return transformedArray
}

export default transformOnChange
