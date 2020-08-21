// container to pass different stores into week schedule component
import React from 'react'

import { WEEK_SCHEDULE, TIME_SCHEDULE } from 'utils/types/scheduleTypes'
const WeekScheduleContainer = ({ type }) => {
  switch (type) {
    case WEEK_SCHEDULE:
      return <WeekSchedule />
    case TIME_SCHEDULE:
      return <TimeSchedule />
    default:
      return <WeekSchedule />
  }
}

export default WeekScheduleContainer
