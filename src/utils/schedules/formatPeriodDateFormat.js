// get 2001-01-01 date format string from slot click event
const formatPeriodDateFormat = event => {
  const eventDate = event.slots[0]
  const date = new Date(eventDate)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') //January is 0!
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export default formatPeriodDateFormat
