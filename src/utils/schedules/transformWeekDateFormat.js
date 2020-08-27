const DEFAULT_YEAR = 2020
const DEFAULT_MONTH = 5

const getDayNumberFromDayName = day => {
  switch (day) {
    case 'Sunday':
      return 7
    case 'Monday':
      return 8
    case 'Tuesday':
      return 9
    case 'Wednesday':
      return 10
    case 'Thursday':
      return 11
    case 'Friday':
      return 12
    case 'Saturday':
      return 13
    default:
      return 7
  }
}

const transformWeekDateFormat = (dayOfWeek, time) => {
  const dayNumber = getDayNumberFromDayName(dayOfWeek)
  const [hour, minutes] = time.split(':').map(Number)
  return new Date(DEFAULT_YEAR, DEFAULT_MONTH, dayNumber, hour, minutes)
}

export default transformWeekDateFormat
