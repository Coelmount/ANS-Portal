import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import globalize from 'globalize'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'

import CustomContainer from 'components/CustomContainer'
import ExtendedTitleBlock from 'components/ExtendedTitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import PopoverBlock from './components/PopoverBlock/index.jsx'
import AddPeriodModal from './components/AddPeriodModal'
import EditScheduleModal from './components/EditScheduleModal'
import DeletePeriodsModal from './components/DeletePeriodsModal'

import * as dates from './dates'
import useStyles from './styles'
import 'react-big-calendar/lib/sass/styles.scss'
import blueEditIcon from 'source/images/svg/edit-blue.svg'
import editIcon from 'source/images/svg/edit.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const WeekSchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
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
    isAllPeriodsDeleting
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
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }, [])

  // Add period(s)
  const handleOpenAddPeriodModal = () => {
    setIsAddPeriodModalOpen(true)
    setDefaultPeriods()
  }

  const handleCloseAddPeriodModal = () => {
    setIsAddPeriodModalOpen(false)
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }

  // Periods and single edit modal open (isSinglePeriodEditActive === TRUE => open single)
  const handleEditScheduleClick = () => {
    setIsEditScheduleModalOpen(true)
  }

  const handleCloseEditScheduleModal = () => {
    setIsEditScheduleModalOpen(false)
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
    setDefaultPeriods()
    setIsSinglePeriodEditActive(false)
  }

  // POPOVER
  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  // POPOVER EDIT
  const handleEditPeriodModalOpen = () => {
    setIsEditScheduleModalOpen(true)
    setIsSinglePeriodEditActive(true)
    findPeriodAndSetToEdit(currentPeriod)
  }

  // POPOVER  DELETE
  const handleDeletePeriodModalOpen = () => {
    setIsDeletePeriodsModalOpen(true)
  }

  const handleDeletePeriodsModalClose = () => {
    setIsDeletePeriodsModalOpen(false)
    setAnchorEl(null)
    getWeekSchedule(match.customerId, match.groupId, match.weekScheduleName)
  }

  // DELETE HANDLERS
  const handleDeleteThisPeriod = () => {
    const periodName = currentPeriod.title.split(' ')[0]
    deletePeriod(
      match.customerId,
      match.groupId,
      match.weekScheduleName,
      periodName,
      handleDeletePeriodsModalClose
    )
  }
  const handleDeleteThisTimeSlot = () => {
    const fullPeriodName = currentPeriod.title
    deleteThisTimeSlot(
      match.customerId,
      match.groupId,
      match.weekScheduleName,
      fullPeriodName,
      handleDeletePeriodsModalClose
    )
  }

  const handleDeleteAllPeriods = () => {
    deleteAllPeriods(
      match.customerId,
      match.groupId,
      match.weekScheduleName,
      handleDeletePeriodsModalClose
    )
  }

  // DATA
  const globalizeLocalizer = localizer(globalize)
  let formats = {
    dayFormat: 'ddd'
  }

  const titleData = {
    mainText: `${t('week_schedules')}: ${match.weekScheduleName}`,
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
            <Calendar
              selectable
              events={weekSchedulePeriods}
              view='week'
              toolbar={false}
              formats={formats}
              defaultDate={new Date(2020, 5, 7)}
              localizer={globalizeLocalizer}
              onSelectEvent={(event, e) => {
                setCurrentPeriod(event)
                setAnchorEl(e.currentTarget)
              }}

              // onSelectEvent={event => }
              // step={60}
              // showMultiDayTimes={false}
              // max={dates.add(
              //   dates.endOf(new Date(2015, 17, 1), 'day'),
              //   -1,
              //   'hours'
              // )}
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
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedule)
