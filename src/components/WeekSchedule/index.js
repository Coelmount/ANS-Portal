import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import {
  Calendar,
  Views,
  momentLocalizer,
  dateFnsLocalizer
} from 'react-big-calendar'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'

import useStyles from './styles'
import * as dates from './dates'
import localizer from 'react-big-calendar/lib/localizers/globalize'
import globalize from 'globalize'
import moment from 'moment'
import 'react-big-calendar/lib/sass/styles.scss'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const WeekSchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const isScheduleLoading = false
  const {
    getWeekSchedule,
    isWeekScheduleLoading,
    weekSchedulePeriods
  } = WeekSchedulesStore
  console.log(weekSchedulePeriods, 'weekSchedulePeriods comp')
  useEffect(() => {
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }, [])

  const titleData = {
    mainText: `${t('week_schedules')}: ${match.weekScheduleName}`,
    iconCapture: t('add_slot'),
    Icon: <AddOutlinedIcon />
  }

  const events = [
    {
      id: 3,
      title: 'Meeting',
      start: new Date(2020, 5, 10, 10, 30),
      end: new Date(2020, 5, 10, 12, 30),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    }
  ]

  const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
      style: {
        // backgroundColor: 'lightblue'
      }
    })

  const globalizeLocalizer = localizer(globalize)

  let formats = {
    dayFormat: 'ddd'
  }

  return (
    <Fragment>
      {isWeekScheduleLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock
                titleData={titleData}
                // handleOpen={handleOpenAddScheduleModal}
              />
            </CustomContainer>
            <Calendar
              events={weekSchedulePeriods}
              view='week'
              toolbar={false}
              formats={formats}
              defaultDate={new Date(2020, 5, 7)}
              components={{
                timeSlotWrapper: ColoredDateCellWrapper
              }}
              localizer={globalizeLocalizer}
              // step={60}
              // showMultiDayTimes={false}
              // max={dates.add(
              //   dates.endOf(new Date(2015, 17, 1), 'day'),
              //   -1,
              //   'hours'
              // )}
            />
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedule)
