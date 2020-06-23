import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

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
import transformTime from 'utils/schedules/transformTime'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const EditScheduleModal = ({
  t,
  open,
  handleClose,
  isSinglePeriodEditActive
}) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, weekScheduleName } = match
  const {
    periods,
    putPeriods,
    isScheduleEditing,
    putPeriod
  } = WeekSchedulesStore

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
            />
            <Box className={classes.periodFormsWrap}>
              {periods.map(period => (
                <PeriodForm
                  isRemoveEnabled={false}
                  period={period}
                  key={period.id}
                />
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
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => {
            if (isSinglePeriodEditActive) {
              putPeriod(customerId, groupId, weekScheduleName, handleClose)
            } else {
              putPeriods(customerId, groupId, weekScheduleName, handleClose)
            }
          }}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditScheduleModal.propTypes = {
  isSinglePeriodEditActive: PropTypes.bool
}

EditScheduleModal.defaultProps = {
  isSinglePeriodEditActive: false
}

export default withNamespaces()(observer(EditScheduleModal))
