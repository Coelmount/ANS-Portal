import React, { useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer, useObserver } from 'mobx-react-lite'
import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import Box from '@material-ui/core/Box'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import transformTime from 'utils/schedules/transformTime'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import useStyles from './styles'

const ColorsLegend = ({ customerId, groupId }) => {
  const classes = useStyles()
  const { timeSchedulesWithPeriods } = TimeSchedulesStore

  return useObserver(() => (
    <Box className={classes.colorsLegendWrap}>
      {timeSchedulesWithPeriods.map(
        ({ destinationName, color, timeSchedule }) => (
          <Box key={destinationName} className={classes.colorsLegendItem}>
            <Box
              className={classes.colorBox}
              style={{ background: color }}
            ></Box>
            <Link
              to={`/customers/${customerId}/subaccounts/${groupId}/schedules/week_schedules/${timeSchedule}`}
              className={classes.colorsLegendItemLabel}
              target='_blank'
            >
              {timeSchedule}
            </Link>
          </Box>
        )
      )}
    </Box>
  ))
}

// To show empty periods on view with only time (by default)
const EventComponent = () => null

// To disable lib warning
const handleOnViewChange = () => null

const TimeScheduleCalendar = () => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const {
    getSchedulesPeriods,
    clearSchedulesPeriods,
    allPeriods,
    isSchedulesPeriodsLoading
  } = TimeSchedulesStore

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getSchedulesPeriods(payload)
    return clearSchedulesPeriods
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Date/time configs for Calandar
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

  // Different background color for events
  const eventStyleGetter = ({ color }) => ({
    style: {
      backgroundColor: color,
      borderRadius: 7,
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
  })

  return (
    <Fragment>
      {isSchedulesPeriodsLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <ColorsLegend customerId={customerId} groupId={groupId} />
          <Calendar
            view='week'
            onView={handleOnViewChange}
            events={allPeriods}
            toolbar={false}
            formats={formats}
            defaultDate={new Date(2020, 5, 7)}
            localizer={globalizeLocalizer}
            className={classes.calendarCustomStyles}
            components={{
              event: EventComponent
            }}
            tooltipAccessor={null}
            showMultiDayTimes={null}
            eventPropGetter={eventStyleGetter}
            selectable
          />
        </Fragment>
      )}
    </Fragment>
  )
}

export default observer(TimeScheduleCalendar)
