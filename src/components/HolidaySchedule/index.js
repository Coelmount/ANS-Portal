import React, { Fragment, useEffect, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import globalize from 'globalize'
import { Calendar } from 'react-big-calendar'
import localizer from 'react-big-calendar/lib/localizers/globalize'

import DateRangeIcon from '@material-ui/icons/DateRange'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import CustomContainer from 'components/CustomContainer'
import ExtendedTitleBlock from 'components/ExtendedTitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Loading from 'components/Loading'
import DeleteModal from 'components/DeleteModal'
import PopoverBlock from 'components/PopoverBlock/index.jsx'
import ImportHolidaysModal from './components/ImportHolidaysModal'
import AddPeriodModal from './components/AddPeriodModal'
import EditPeriodModal from './components/EditPeriodModal'
import CustomToolbar from './components/CustomToolbar'
import formatPeriodDateFormat from 'utils/schedules/formatPeriodDateFormat'

import editIcon from 'source/images/svg/edit.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'

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
    clearImportData
  } = HolidaySchedulesStore

  const [isImportHolidaysModalOpen, setIsImportHolidaysModalOpen] = useState(
    false
  )
  const [isAddPeriodModalOpen, setIsAddPeriodModalOpen] = useState(false)
  const [isEditPeriodModalOpen, setIsEditPeriodModalOpen] = useState(false)
  const [isDeletePeriodModalOpen, setIsDeletePeriodModalOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [currentPeriod, setCurrentPeriod] = useState(null)

  const isPeriodPopoverOpen = Boolean(anchorEl)
  const popoverId = isPeriodPopoverOpen ? 'period-popover' : undefined

  useEffect(() => {
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setAnchorEl(null)
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

    const startDatePayload = {
      field: 'startDate',
      value: formatedClickedDate
    }

    const endDatePayload = {
      field: 'stopDate',
      value: formatedClickedDate
    }

    updatePeriod(startDatePayload)
    updatePeriod(endDatePayload)
    setIsAddPeriodModalOpen(true)
  }

  const handleImportClick = () => {
    setIsImportHolidaysModalOpen(true)
  }

  const handleImportModalClose = () => {
    setIsImportHolidaysModalOpen(false)
    getHolidaySchedule(customerId, groupId, holidayScheduleName)
    clearImportData()
  }

  // To disable lib warning
  const handleOnViewChange = () => null

  // DATA
  const globalizeLocalizer = localizer(globalize)

  const titleData = {
    mainText: `${t('holiday_schedules')}: ${holidayScheduleName}`,
    iconCapture: t('import_holidays'),
    Icon: <DateRangeIcon />
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
      {isHolidayScheduleLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <ExtendedTitleBlock
                titleData={titleData}
                handleClick={handleImportClick}
              />
            </CustomContainer>
            <Box className={classes.main}>
              <Calendar
                view='month'
                events={periods}
                onView={handleOnViewChange}
                localizer={globalizeLocalizer}
                className={classes.calendarCustomStyles}
                onSelectEvent={(event, e) => {
                  setCurrentPeriod(event)
                  setAnchorEl(e.currentTarget)
                }}
                onSelectSlot={handleSelectSlot}
                components={{
                  toolbar: CustomToolbar
                }}
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
              {isImportHolidaysModalOpen && (
                <ImportHolidaysModal
                  open={isImportHolidaysModalOpen}
                  handleClose={handleImportModalClose}
                />
              )}
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(HolidaySchedule)
