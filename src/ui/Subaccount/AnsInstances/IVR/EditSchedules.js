import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Select from 'components/Select'
import ModalHelperText from 'components/ModalHelperText'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'

import IVRStore from 'stores/IVR'
import WeekScheduleStore from 'stores/WeekSchedules'
import HolidayScheduleStore from 'stores/HolidaySchedules'

import useStyles from './styles'

const EditGreeting = props => {
  const {
    t,
    open,
    handleClose,
    menuType,
    defaultSchedule,
    addNewSchedule
  } = props
  const classes = useStyles()
  const match = useParams()
  const [schedulerSelection, setSchedulerSelection] = useState(defaultSchedule)

  const { putUpdateIVR } = IVRStore

  const {
    getSchedules: getWeekSchedules,
    schedules: weekSchedules,
    isSchedulesLoading: isWeekSchedulesLoading
  } = WeekScheduleStore
  const {
    getSchedules: getHolidaySchedules,
    schedules: holidaySchedules,
    isSchedulesLoading: isHolidaySchedulesLoading
  } = HolidayScheduleStore

  const title =
    menuType === 'businessHours' ? 'edit_business_hours' : 'edit_holiday_hours'

  useEffect(() => {
    if (menuType === 'businessHours') {
      getWeekSchedules(match.customerId, match.groupId)
    } else {
      getHolidaySchedules(match.customerId, match.groupId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateHours = () => {
    let data = {}
    if (menuType === 'businessHours') {
      data = {
        businessHours:
          schedulerSelection === 'Any time' ? {} : { name: schedulerSelection }
      }
    } else {
      data = {
        holidaySchedule:
          schedulerSelection === 'Any time' ? {} : { name: schedulerSelection }
      }
    }
    putUpdateIVR(
      match.customerId,
      match.groupId,
      match.ivrId,
      data,
      handleClose
    )
  }

  if (isWeekSchedulesLoading || isHolidaySchedulesLoading) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.rootEditSchedule}
      >
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootEditSchedule}
    >
      <DialogTitle className={classes.title}>
        {title}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className={classes.helperTextWrap}>
          <ModalHelperText title={title} />
        </div>
        <Box className={classes.editSchedulesWrap}>
          <Box className={classes.editSchedulesText}>
            {t('select_from_schedules_library')}
          </Box>
          <Select
            selectStyles={classes.select}
            value={schedulerSelection}
            options={
              menuType === 'businessHours'
                ? [
                    { label: `No schedule`, value: 'Any time' },
                    { label: 'Add new', value: 'Add new' },
                    ...weekSchedules.map(el => ({
                      label: el.name,
                      value: el.name
                    }))
                  ]
                : [
                    { label: `No schedule`, value: 'Any time' },
                    { label: 'Add new', value: 'Add new' },
                    ...holidaySchedules.map(el => ({
                      label: el.name,
                      value: el.name
                    }))
                  ]
            }
            onChange={e => {
              if (e.target.value === 'Add new') {
                addNewSchedule()
              } else {
                setSchedulerSelection(e.target.value)
              }
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          onClick={updateHours}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditGreeting))
