import React, { useEffect, Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { observer, useObserver } from 'mobx-react-lite'

import Box from '@material-ui/core/Box'
import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import transformTime from 'utils/schedules/transformTime'

import useStyles from './styles'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { toJS } from 'mobx'
import { colors, Typography } from '@material-ui/core'

const ColorsLegend = () => {
  const classes = useStyles()
  const { timeSchedulesWithPeriods } = TimeSchedulesStore
  console.log(timeSchedulesWithPeriods, 'timeSchedulesWithPeriods')

  return useObserver(() => (
    <Box className={classes.colorsLegendWrap}>
      {timeSchedulesWithPeriods.map(timeSchedule => {
        return (
          <Box className={classes.colorsLegendItem}>
            <Box className={classes.colorBox}></Box>
            <Typography>{timeSchedule.destinationName}</Typography>
          </Box>
        )
      })}
    </Box>
  ))
}

// To show empty periods on view with only time (by default)
const EventComponent = () => null

const TimeScheduleCalendar = () => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const {
    addPeriodsToSchedules,
    clearSchedulesPeriods,
    schedules,
    timeSchedulesPeriods,
    allPeriods,
    isSchedulesPeriodsLoading
  } = TimeSchedulesStore

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    addPeriodsToSchedules(payload)

    return clearSchedulesPeriods
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
  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.color
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    }
    return {
      style: style
    }
  }
  return (
    <Fragment>
      {isSchedulesPeriodsLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <ColorsLegend />
          <Calendar
            view='week'
            events={allPeriods}
            // onView={handleOnViewChange}
            toolbar={false}
            formats={formats}
            defaultDate={new Date(2020, 5, 7)}
            localizer={globalizeLocalizer}
            className={classes.calendarCustomStyles}
            // onSelectEvent={(event, e) => {
            //   setCurrentPeriod(event)
            //   setAnchorEl(e.currentTarget)
            // }}
            // onSelectSlot={handleSelectSlot}
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
