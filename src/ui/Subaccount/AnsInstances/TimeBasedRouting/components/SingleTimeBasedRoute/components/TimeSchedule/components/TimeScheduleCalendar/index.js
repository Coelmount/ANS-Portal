import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import transformTime from 'utils/schedules/transformTime'

import useStyles from './styles'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { toJS } from 'mobx'

// To show empty periods on view with only time (by default)
const EventComponent = () => null

const TimeScheduleCalendar = () => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const {
    addPeriodsToSchedules,
    schedules,
    timeSchedulesPeriods
  } = TimeSchedulesStore
  console.log(toJS(timeSchedulesPeriods), 'timeSchedulesPeriods in comp')
  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    addPeriodsToSchedules(payload)
  }, [])

  const globalizeLocalizer = localizer(globalize)
  const formats = {
    dayFormat: 'ddd',
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({ start, end }) => {
      const startTime = new Date(start)
      const stopTime = new Date(end)
      const transformedTime = transformTime(startTime, stopTime)
      return `${transformedTime.start} : ${transformedTime.stop}`
    }
  }

  return (
    // <Calendar
    //   view='week'
    //   // events={weekSchedulePeriods}
    //   // onView={handleOnViewChange}
    //   toolbar={false}
    //   formats={formats}
    //   defaultDate={new Date(2020, 5, 7)}
    //   localizer={globalizeLocalizer}
    //   className={classes.calendarCustomStyles}
    //   // onSelectEvent={(event, e) => {
    //   //   setCurrentPeriod(event)
    //   //   setAnchorEl(e.currentTarget)
    //   // }}
    //   // onSelectSlot={handleSelectSlot}
    //   components={{
    //     event: EventComponent
    //   }}
    //   tooltipAccessor={null}
    //   showMultiDayTimes={null}
    //   selectable
    // />
    <div>calendar</div>
  )
}

export default observer(TimeScheduleCalendar)
