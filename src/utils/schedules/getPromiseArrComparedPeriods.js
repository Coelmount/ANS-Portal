import capitalize from 'lodash/capitalize'
import axios from 'utils/axios'
import { toJS } from 'mobx'

const getPromiseArrComparedPeriods = (
  initPeriod,
  updatedPeriod,
  customerId,
  groupId,
  weekScheduleName
) => {
  let promiseArr = []
  const weekDaysArr = Object.keys(initPeriod.weekDays)

  // IF TIME UPDATED
  if (
    initPeriod.startTime !== updatedPeriod.startTime ||
    initPeriod.stopTime !== updatedPeriod.stopTime
  ) {
    weekDaysArr.forEach(day => {
      const periodName = `${initPeriod.id} ${day}`
      if (
        initPeriod.weekDays[day] === true &&
        updatedPeriod.weekDays[day] === true
      ) {
        promiseArr.push(
          axios.put(
            `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${periodName}/`,
            {
              name: `${initPeriod.id} ${day}`,
              type: 'Day of the week',
              dayOfWeek: capitalize(day),
              startTime: updatedPeriod.startTime,
              stopTime: updatedPeriod.stopTime
            }
          )
        )
      }
    })
  }

  weekDaysArr.forEach(day => {
    const periodName = `${updatedPeriod.id} ${day}`
    // IF NEW DAY CHECKED (ADDED)
    if (
      initPeriod.weekDays[day] === false &&
      updatedPeriod.weekDays[day] === true
    ) {
      promiseArr.push(
        axios.post(
          `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/`,
          {
            name: periodName,
            type: 'Day of the week',
            dayOfWeek: capitalize(day),
            startTime: updatedPeriod.startTime,
            stopTime: updatedPeriod.stopTime
          }
        )
      )
    }
    // IF DAY UNCHECKED (DELETED)
    if (
      initPeriod.weekDays[day] === true &&
      updatedPeriod.weekDays[day] === false
    ) {
      promiseArr.push(
        axios.delete(
          `/tenants/${customerId}/groups/${groupId}/time_schedules/${weekScheduleName}/${periodName}/`
        )
      )
    }
  })

  return promiseArr
}

export default getPromiseArrComparedPeriods
