import React, { Fragment, useEffect, useState } from 'react'
// import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import globalize from 'globalize'
import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
// import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import CustomContainer from 'components/CustomContainer'
import ExtendedTitleBlock from 'components/ExtendedTitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Loading from 'components/Loading'
// import PopoverBlock from './components/PopoverBlock/index.jsx'
// import AddPeriodModal from './components/AddPeriodModal'
// import EditScheduleModal from './components/EditScheduleModal'
// import DeletePeriodsModal from './components/DeletePeriodsModal'
// import { WEEK_DAYS_ARR } from 'utils/schedules/weekDaysArr'
// import transformTime from 'utils/schedules/transformTime'

// import blueEditIcon from 'source/images/svg/edit-blue.svg'
// import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

const HolidaySchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const {
    getHolidaySchedule,
    isHolidayScheduleLoading
    // weekSchedulePeriods,
    // setDefaultPeriods,
    // findPeriodAndSetToEdit,
    // deletePeriod,
    // isPeriodDeleting,
    // deleteThisTimeSlot,
    // isThisSlotDeleting,
    // deleteAllPeriods,
    // isAllPeriodsDeleting,
    // setPeriodToAdd
  } = HolidaySchedulesStore

  // const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false)
  // const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false)
  // const [isSinglePeriodEditActive, setIsSinglePeriodEditActive] = useState(
  //   false
  // )
  // const [isDeletePeriodsModalOpen, setIsDeletePeriodsModalOpen] = useState(
  //   false
  // )
  // const [anchorEl, setAnchorEl] = useState(null)
  // const [currentPeriod, setCurrentPeriod] = useState(null)

  // const isPeriodPopoverOpen = Boolean(anchorEl)
  // const popoverId = isPeriodPopoverOpen ? 'period-popover' : undefined

  useEffect(() => {
    getHolidaySchedule(
      match.customerId,
      match.groupId,
      match.holidayScheduleName
    )
  }, [])

  // const handleCloseAddPeriodModal = () => {
  //   setIsAddPeriodModalOpen(false)
  //   getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  // }

  // const handleCloseEditScheduleModal = () => {
  //   setIsEditScheduleModalOpen(false)
  //   getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  //   setDefaultPeriods()
  //   setIsSinglePeriodEditActive(false)
  // }

  // // POPOVER
  // const handlePopoverOpen = event => {
  //   setAnchorEl(event.currentTarget)
  // }

  // const handlePopoverClose = () => {
  //   setAnchorEl(null)
  // }

  // // POPOVER EDIT
  // const handleEditPeriodModalOpen = () => {
  //   setIsEditScheduleModalOpen(true)
  //   setIsSinglePeriodEditActive(true)
  //   findPeriodAndSetToEdit(currentPeriod)
  //   setAnchorEl(null)
  // }

  // // POPOVER  DELETE
  // const handleDeletePeriodModalOpen = () => {
  //   setIsDeletePeriodsModalOpen(true)
  // }

  // const handleDeletePeriodsModalClose = () => {
  //   setIsDeletePeriodsModalOpen(false)
  //   setAnchorEl(null)
  //   getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  // }

  // // DELETE HANDLERS
  // const handleDeleteThisPeriod = () => {
  //   const periodName = currentPeriod.title.split(' ')[0]
  //   deletePeriod(
  //     match.customerId,
  //     match.groupId,
  //     match.weekScheduleName,
  //     periodName,
  //     handleDeletePeriodsModalClose
  //   )
  // }
  // const handleDeleteThisTimeSlot = () => {
  //   const fullPeriodName = currentPeriod.initName
  //   deleteThisTimeSlot(
  //     match.customerId,
  //     match.groupId,
  //     match.weekScheduleName,
  //     fullPeriodName,
  //     handleDeletePeriodsModalClose
  //   )
  // }

  // const handleDeleteAllPeriods = () => {
  //   deleteAllPeriods(
  //     match.customerId,
  //     match.groupId,
  //     match.weekScheduleName,
  //     handleDeletePeriodsModalClose
  //   )
  // }

  // const handleSelectSlot = event => {
  //   // week day
  //   const clickedWeekDayIndex = new Date(event.start).getDay()
  //   const clickedWeekDay = WEEK_DAYS_ARR[clickedWeekDayIndex].toLowerCase()
  //   // start/end time
  //   const transformedTime = transformTime(event.start, event.end)
  //   setPeriodToAdd(clickedWeekDay, transformedTime.start, transformedTime.stop) // e.g. monday, 02:00, 02:30
  //   setIsAddPeriodModalOpen(true)
  // }

  // DATA
  const globalizeLocalizer = localizer(globalize)
  const formats = {
    // dayFormat: 'ddd'
    // timeGutterFormat: 'HH:mm',
    // eventTimeRangeFormat: ({ start, end }) => {
    //   const startTime = new Date(start)
    //   const stopTime = new Date(end)
    //   const transformedTime = transformTime(startTime, stopTime)
    //   return `${transformedTime.start} : ${transformedTime.stop}`
    // }
  }

  const titleData = {
    mainText: `${t('holiday_schedules')}: ${match.holidayScheduleName}`
  }

  // const popoverButtons = [
  //   {
  //     Icon: editIcon,
  //     label: t('edit'),
  //     handleClick: handleEditPeriodModalOpen
  //   },
  //   {
  //     Icon: deleteIcon,
  //     label: t('delete'),
  //     handleClick: handleDeletePeriodModalOpen
  //   }
  // ]

  // // To show empty periods on view with only time (by default)
  // const EventComponent = () => null

  // To disable lib warning
  const handleOnViewChange = () => null

  const holidaySchedulePeriods = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2020, 5, 1),
      end: new Date(2020, 5, 2)
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2020, 5, 20),
      end: new Date(2020, 5, 22)
    },

    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2020, 5, 13, 0, 0, 0),
      end: new Date(2016, 5, 17, 0, 0, 0)
    }
  ]
  return (
    <Fragment>
      {isHolidayScheduleLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <ExtendedTitleBlock titleData={titleData} />
            </CustomContainer>
            <Calendar
              // view='week'
              events={holidaySchedulePeriods}
              onView={handleOnViewChange}
              // toolbar={false}
              formats={formats}
              defaultDate={new Date(2020, 5, 7)}
              localizer={globalizeLocalizer}
              className={classes.calendarCustomStyles}
              // onSelectEvent={(event, e) => {
              //   setCurrentPeriod(event)
              //   setAnchorEl(e.currentTarget)
              // }}
              // onSelectSlot={handleSelectSlot}
              // components={{
              //   event: EventComponent
              // }}
              // tooltipAccessor={null}
              // showMultiDayTimes={null}
              // selectable
            />
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(HolidaySchedule)
