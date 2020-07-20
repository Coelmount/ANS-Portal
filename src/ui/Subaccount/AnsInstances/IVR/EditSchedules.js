import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Select from 'components/Select'

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
  const { t, open, handleClose, menuLvl, menuType, defaultSchedule } = props
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

  useEffect(() => {
    if (menuType === 'businessHours') {
      getWeekSchedules(match.customerId, match.groupId)
    } else {
      getHolidaySchedules(match.customerId, match.groupId)
    }
  }, [])

  const updateHours = () => {
    let data = {}
    if (menuType === 'businessHours') {
      data = {
        businessHours: { name: schedulerSelection }
      }
    } else {
      data = {
        holidaySchedule: { name: schedulerSelection }
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
        {menuType === 'businessHours'
          ? t('edit_business_hours')
          : t('edit_holiday_hours')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box>
          <Box className={classes.editSchedulesText}>
            {t('select_from_schedules_library')}
          </Box>
          <Select
            selectStyles={classes.select}
            value={schedulerSelection}
            options={
              menuType === 'businessHours'
                ? weekSchedules.map(el => ({ label: el.name, value: el.name }))
                : holidaySchedules.map(el => ({
                    label: el.name,
                    value: el.name
                  }))
            }
            onChange={e => setSchedulerSelection(e.target.value)}
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
