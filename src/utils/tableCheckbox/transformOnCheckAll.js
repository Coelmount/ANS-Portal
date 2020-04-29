// require id field of object
const transformOnCheckAll = (searchList, array, selectAll) => {
  const searchListId = searchList.map(item => item.id)
  const transformedArray = array.map(el => {
    let result = {}
    if (searchListId.includes(el.id)) {
      result = {
        ...el,
        checked: !selectAll,
        hover: false
      }
    } else {
      result = { ...el }
    }
    return result
  })
  return transformedArray
}

export default transformOnCheckAll
