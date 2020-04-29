// require id field of object
const transformOnHover = (array, newHover, id) => {
  const transformedArray = [...array]
  const index = array.findIndex(el => el.id === id)
  transformedArray[index].hover = newHover
  return transformedArray
}

export default transformOnHover
