import transformTime from 'utils/schedules/transformTime'
import { defaultWeekDays } from 'stores/WeekSchedules'

const transformToCustomPeriodsFormat = periods => {
  let transformedPeriods = []
  const periodIds = periods.map(period => {
    return period.title.split(' ')[0]
  })
  const uniquePeriodIds = Array.from(new Set(periodIds))

  uniquePeriodIds.map(uniqueId => {
    let newWeekDays = {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    }
    let start
    let end
    let title
    let id
    let initName

    periods.forEach(period => {
      if (period.title.split(' ')[0] === uniqueId) {
        const transformedTime = transformTime(period.start, period.end)

        start = transformedTime.start
        end = transformedTime.stop
        title = period.title
        id = period.id
        initName = period.initName

        newWeekDays[period.title.split(' ')[1]] = true
      }
    })

    transformedPeriods.push({
      weekDays: newWeekDays,
      startTime: start,
      stopTime: end,
      id: title.split(' ')[0],
      initName
    })
  })
  return transformedPeriods
}

export default transformToCustomPeriodsFormat
