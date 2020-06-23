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
import DeleteModal from 'components/DeleteModal'
import PopoverBlock from 'components/PopoverBlock/index.jsx'
import AddPeriodModal from './components/AddPeriodModal'
import EditPeriodModal from './components/EditPeriodModal'
// import { WEEK_DAYS_ARR } from 'utils/schedules/weekDaysArr'
import transformTime from 'utils/schedules/transformTime'
import formatPeriodDateFormat from 'utils/schedules/formatPeriodDateFormat'

// import blueEditIcon from 'source/images/svg/edit-blue.svg'
import editIcon from 'source/images/svg/edit.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'
// import 'react-big-calendar/lib/css/react-big-calendar.css'

// import { toJS } from 'mobx'

const HolidaySchedule = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, holidayScheduleName } = match

  const {
    getHolidaySchedule,
    isHolidayScheduleLoading,
    periods,
    setPeriodToAdd,
    updatePeriod,
    setDefaultPeriods,
    setPeriodToEdit,
    deletePeriod,
    isPeriodDeleting,
    // deleteThisTimeSlot,
    // isThisSlotDeleting,
    // deleteAllPeriods,
    // isAllPeriodsDeleting,
    postPeriod
  } = HolidaySchedulesStore

  const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false)
  const [isEditPeriodModalOpen, setIsEditPeriodModalOpen] = useState(false)
  const [isDeletePeriodModalOpen, setIsDeletePeriodModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState(null)

  const isPeriodPopoverOpen = Boolean(anchorEl)
  const popoverId = isPeriodPopoverOpen ? 'period-popover' : undefined

  useEffect(() => {
    // postPeriod(customerId, groupId)
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
  }, [])

  const handleCloseAddPeriodModal = () => {
    setIsAddPeriodModalOpen(false)
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
  }

  const handleCloseEditScheduleModal = () => {
    setIsEditPeriodModalOpen(false)
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
    setDefaultPeriods()
  }

  // POPOVER CLOSE
  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  // POPOVER EDIT
  const handleEditPeriodModalOpen = () => {
    setIsEditPeriodModalOpen(true)
    setPeriodToEdit(currentPeriod)
    setAnchorEl(null)
  }

  // POPOVER  DELETE
  const handleDeletePeriodModalOpen = () => {
    setIsDeletePeriodModalOpen(true)
  }

  const handleDeletePeriodModalClose = () => {
    setIsDeletePeriodModalOpen(false)
    setAnchorEl(null)
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
  }

  // DELETE HANDLER
  const handleDeletePeriod = () => {
    const payload = {
      customerId,
      groupId,
      holidayScheduleName,
      periodId: currentPeriod.title,
      closeModal: handleDeletePeriodModalClose
    }
    deletePeriod(payload)
  }

  const handleSelectSlot = event => {
    const formatedClickedDate = formatPeriodDateFormat(event)
    setPeriodToAdd()
    const payload = {
      field: 'startDate',
      value: formatedClickedDate
    }
    updatePeriod(payload)
    setIsAddPeriodModalOpen(true)
  }

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
    mainText: `${t('holiday_schedules')}: ${holidayScheduleName}`
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

  // // To show empty periods on view with only time (by default)
  // const EventComponent = () => null

  // To disable lib warning
  const handleOnViewChange = () => null

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
              view='month'
              events={periods}
              onView={handleOnViewChange}
              formats={formats}
              localizer={globalizeLocalizer}
              className={classes.calendarCustomStyles}
              onSelectEvent={(event, e) => {
                setCurrentPeriod(event)
                setAnchorEl(e.currentTarget)
              }}
              onSelectSlot={handleSelectSlot}
              // toolbar={false}
              // defaultDate={new Date(2020, 5, 7)}
              // components={{
              //   event: EventComponent
              // }}
              // tooltipAccessor={null}
              // showMultiDayTimes={null}
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
            {isEditPeriodModalOpen && (
              <EditPeriodModal
                open={isEditPeriodModalOpen}
                handleClose={handleCloseEditScheduleModal}
              />
            )}
            {isDeletePeriodModalOpen && (
              <DeleteModal
                open={isDeletePeriodModalOpen}
                handleClose={handleDeletePeriodModalClose}
                handleDelete={handleDeletePeriod}
                isDeleting={isPeriodDeleting}
                deleteInfo={{ name: '', id: currentPeriod.title }}
                deleteSubject={`${t('holiday_schedule_period')}`}
                action={t('to_delete')}
                titleAction={t(`delete`)}
                identifier={' '}
              />
            )}
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(HolidaySchedule)