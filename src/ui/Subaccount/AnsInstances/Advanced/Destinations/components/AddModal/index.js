import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
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
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PeriodForm from 'components/PeriodForm'
import transformTime from 'utils/schedules/transformTime'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const AddModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()

  const inputStore = useLocalStore(() => ({
    values: {
      name: '',
      phoneNumber: ''
    },
    set(field, value) {
      this.values[field] = value
    }
  }))

  const { customerId, groupId } = match
  const {
    periods,
    putPeriods,
    isScheduleEditing,
    putPeriod
  } = WeekSchedulesStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_destination')}
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
          <Box className={classes.inputsWrap}>
            <Input
              icon={<PhoneOutlinedIcon />}
              label={t('name')}
              variant='outlined'
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <Input
              icon={<PhoneOutlinedIcon />}
              label={t('phonenumber')}
              variant='outlined'
              onChange={e => inputStore.set('phoneNumber', e.target.value)}
            />
          </Box>
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
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
