import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import globalize from 'globalize'
import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import CustomContainer from 'components/CustomContainer'
import ExtendedTitleBlock from 'components/ExtendedTitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Loading from 'components/Loading'
import PopoverBlock from 'components/PopoverBlock/index.jsx'
import AddPeriodModal from './components/AddPeriodModal'
import EditScheduleModal from './components/EditScheduleModal'
import DeletePeriodsModal from './components/DeletePeriodsModal'
import { WEEK_DAYS_ARR } from 'utils/schedules/weekDaysArr'
import transformTime from 'utils/schedules/transformTime'

import blueEditIcon from 'source/images/svg/edit-blue.svg'
import editIcon from 'source/images/svg/edit.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const WeekSchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, weekScheduleName } = match

  const {
    getWeekSchedule,
    isWeekScheduleLoading,
    weekSchedulePeriods,
    setDefaultPeriods,
    findPeriodAndSetToEdit,
    deletePeriod,
    isPeriodDeleting,
    deleteThisTimeSlot,
    isThisSlotDeleting,
    deleteAllPeriods,
    isAllPeriodsDeleting,
    setPeriodToAdd
  } = WeekSchedulesStore

  const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false)
  const [isEditScheduleModalOpen, setIsEditScheduleModalOpen] = useState(false)
  const [isSinglePeriodEditActive, setIsSinglePeriodEditActive] = useState(
    false
  )
  const [isDeletePeriodsModalOpen, setIsDeletePeriodsModalOpen] = useState(
    false
  )
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState(null)

  const isPeriodPopoverOpen = Boolean(anchorEl)
  const popoverId = isPeriodPopoverOpen ? 'period-popover' : undefined

  useEffect(() => {
    getWeekSchedule(customerId, groupId, weekScheduleName)
  }, [])

  // Add period(s)
  const handleOpenAddPeriodModal = () => {
    setIsAddPeriodModalOpen(true)
    setDefaultPeriods()
  }

  const handleCloseAddPeriodModal = () => {
    setIsAddPeriodModalOpen(false)
    getWeekSchedule(customerId, groupId, weekScheduleName)
  }

  // Periods and single edit modal open (isSinglePeriodEditActive === TRUE => open single)
  const handleEditScheduleClick = () => {
    setIsEditScheduleModalOpen(true)
  }

  const handleCloseEditScheduleModal = () => {
    setIsEditScheduleModalOpen(false)
    getWeekSchedule(customerId, groupId, weekScheduleName)
    setDefaultPeriods()
    setIsSinglePeriodEditActive(false)
  }

  // POPOVER CLOSE
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  // POPOVER EDIT
  const handleEditPeriodModalOpen = () => {
    setIsEditScheduleModalOpen(true)
    setIsSinglePeriodEditActive(true)
    findPeriodAndSetToEdit(currentPeriod)
    setAnchorEl(null)
  }

  // POPOVER  DELETE
  const handleDeletePeriodModalOpen = () => {
    setIsDeletePeriodsModalOpen(true)
  }

  const handleDeletePeriodsModalClose = () => {
    setIsDeletePeriodsModalOpen(false)
    setAnchorEl(null)
    getWeekSchedule(customerId, groupId, weekScheduleName)
  }

  // DELETE HANDLERS
  const handleDeleteThisPeriod = () => {
    const periodName = currentPeriod.title.split(' ')[0]
    deletePeriod(
      customerId,
      groupId,
      weekScheduleName,
      periodName,
      handleDeletePeriodsModalClose
    )
  }
  const handleDeleteThisTimeSlot = () => {
    const fullPeriodName = currentPeriod.initName
    deleteThisTimeSlot(
      customerId,
      groupId,
      weekScheduleName,
      fullPeriodName,
      handleDeletePeriodsModalClose
    )
  }

  const handleDeleteAllPeriods = () => {
    deleteAllPeriods(
      customerId,
      groupId,
      weekScheduleName,
      handleDeletePeriodsModalClose
    )
  }

  const handleSelectSlot = event => {
    // week day
    const clickedWeekDayIndex = new Date(event.start).getDay()
    const clickedWeekDay = WEEK_DAYS_ARR[clickedWeekDayIndex].toLowerCase()
    // start/end time
    const transformedTime = transformTime(event.start, event.end)
    setPeriodToAdd(clickedWeekDay, transformedTime.start, transformedTime.stop) // e.g. monday, 02:00, 02:30
    setIsAddPeriodModalOpen(true)
  }

  // DATA
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

  const titleData = {
    mainText: `${t('week_schedules')}: ${weekScheduleName}`,
    iconCapture: t('add_slot'),
    Icon: <AddOutlinedIcon />,
    titleIcon: (
      <img src={blueEditIcon} className={classes.editIcon} alt='edit' />
    )
  }

  const popoverButtons = [
    {
      Icon: editIcon,
      label: t('edit'),
      handleClick: handleEditPeriodModalOpen
    },
    {
      Icon: deleteIcon,
      label: t('delete'),
      handleClick: handleDeletePeriodModalOpen
    }
  ]

  // To show empty periods on view with only time (by default)
  const EventComponent = () => null

  // To disable lib warning
  const handleOnViewChange = () => null

  return (
    <Fragment>
      {isWeekScheduleLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <ExtendedTitleBlock
                titleData={titleData}
                handleClick={handleOpenAddPeriodModal}
                handleTitleIconClick={handleEditScheduleClick}
              />
            </CustomContainer>
            <Box className={classes.main}>
              <Calendar
                view='week'
                events={weekSchedulePeriods}
                onView={handleOnViewChange}
                toolbar={false}
                formats={formats}
                defaultDate={new Date(2020, 5, 7)}
                localizer={globalizeLocalizer}
                className={classes.calendarCustomStyles}
                onSelectEvent={(event, e) => {
                  setCurrentPeriod(event)
                  setAnchorEl(e.currentTarget)
                }}
                onSelectSlot={handleSelectSlot}
                components={{
                  event: EventComponent
                }}
                tooltipAccessor={null}
                showMultiDayTimes={null}
                selectable
              />
              <PopoverBlock
                popoverId={popoverId}
                isPeriodPopoverOpen={isPeriodPopoverOpen}
                anchorEl={anchorEl}
                handlePopoverClose={handlePopoverClose}
                classes={classes}
                popoverButtons={popoverButtons}
              />
              {isAddPeriodModalOpen && (
                <AddPeriodModal
                  open={isAddPeriodModalOpen}
                  handleClose={handleCloseAddPeriodModal}
                />
              )}
              {isEditScheduleModalOpen && (
                <EditScheduleModal
                  open={isEditScheduleModalOpen}
                  handleClose={handleCloseEditScheduleModal}
                  isSinglePeriodEditActive={isSinglePeriodEditActive}
                />
              )}
              {isDeletePeriodsModalOpen && (
                <DeletePeriodsModal
                  open={isDeletePeriodsModalOpen}
                  handleClose={handleDeletePeriodsModalClose}
                  handleDeleteThisPeriod={handleDeleteThisPeriod}
                  isPeriodDeleting={isPeriodDeleting}
                  handleDeleteThisTimeSlot={handleDeleteThisTimeSlot}
                  isThisSlotDeleting={isThisSlotDeleting}
                  handleDeleteAllPeriods={handleDeleteAllPeriods}
                  isAllPeriodsDeleting={isAllPeriodsDeleting}
                />
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedule)
