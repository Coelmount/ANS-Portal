import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DateRangeIcon from '@material-ui/icons/DateRange'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PeriodForm from 'components/PeriodForm'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'
const DAYS = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday'
]
const EditScheduleModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, weekScheduleName } = match

  const {
    weekSchedulePeriods,
    pushPeriod,
    postPeriod,
    isPeriodPosting,
    periods,
    setEditPeriods,
    putPeriods,
    setInitPeriots,
    isScheduleEditing,
    setPeriodsBeforeUpdate
  } = WeekSchedulesStore

  useEffect(() => {
    let transformedPeriods = []
    const periodIds = weekSchedulePeriods.map(period => {
      return period.title.split(' ')[0]
    })
    const uniquePeriodIds = Array.from(new Set(periodIds))

    uniquePeriodIds.map(uniqueId => {
      let newWeekDays = {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      }
      let start
      let end
      let title
      let id
      // to refactor
      weekSchedulePeriods.forEach(period => {
        if (period.title.split(' ')[0] === uniqueId) {
          const initStartHours = new Date(period.start).getHours()
          const initStartMinutes = new Date(period.start).getMinutes()
          const startHours =
            String(initStartHours).length === 2
              ? String(initStartHours)
              : `0${initStartHours}`
          const startMinutes =
            String(initStartMinutes).length === 2
              ? String(initStartMinutes)
              : `${initStartMinutes}0`

          const initStopHours = new Date(period.end).getHours()
          const initStopMinutes = new Date(period.end).getMinutes()
          const endHours =
            String(initStopHours).length === 2
              ? String(initStopHours)
              : `0${initStopHours}`
          const endMinutes =
            String(initStopMinutes).length === 2
              ? String(initStopMinutes)
              : `${initStopMinutes}0`

          start = `${startHours}:${startMinutes}`
          end = `${endHours}:${endMinutes}`
          title = period.title
          id = period.id

          newWeekDays[period.title.split(' ')[1]] = true
        }
      })

      transformedPeriods.push({
        weekDays: newWeekDays,
        startTime: start,
        stopTime: end,
        id: title.split(' ')[0]
      })
    })
    setEditPeriods(transformedPeriods)
    setInitPeriots(transformedPeriods)
    setPeriodsBeforeUpdate(transformedPeriods)
  }, [])

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('edit_week_schedule')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.modalContent}>
        {isScheduleEditing ? (
          <Loading />
        ) : (
          <Fragment>
            <Input
              icon={<DateRangeIcon />}
              label={t('schedule_name')}
              variant='outlined'
              value={weekScheduleName}
              // className={classes.scheduleNameTitle}
            />
            <Box className={classes.periodFormsWrap}>
              {periods.map(period => (
                <PeriodForm period={period} key={period.id} />
              ))}
            </Box>
          </Fragment>
        )}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() =>
            putPeriods(customerId, groupId, weekScheduleName, handleClose)
          }
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditScheduleModal))
