import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import { makeStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import Select from 'components/Select'

import ScheduleIcon from 'source/images/components/ScheduleIcon'
import useStyles from '../../styles'
import { toJS } from 'mobx'

// Id's equal to steps id's in ../AddModal container - Steps switch
const PHONE_NUMBER_ID = 2
const ANS_INSTANCE_ID = 3
const ANS_DESTINATION_ID = 4
const ANS_IVR_ID = 5

const AddModal = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()
  const { scheduleIndexToAdd, setStep, setDestinationData } = TimeSchedulesStore
  const { getSchedules, schedules, isSchedulesLoading } = WeekSchedulesStore
  const isLoading = isSchedulesLoading

  const formStore = useLocalStore(() => ({
    name: '',
    phoneNumber: PHONE_NUMBER_ID,
    schedule: '',
    scheduleOptions: [],

    set(field, value) {
      this[field] = value
    },
    get isFormValid() {
      const { name, phoneNumber, schedule } = this
      return name && phoneNumber && schedule
    }
  }))

  // Initial request
  useEffect(() => {
    getSchedules(customerId, groupId)
  }, [])

  // On receive schedules from store
  useEffect(() => {
    if (schedules.length) {
      const options = schedules.map(({ name }) => ({
        label: name,
        value: name
      }))
      // Set schedule options to store
      formStore.set('scheduleOptions', options)
      // Set first option as default to store
      formStore.set('schedule', options[0].value)
    }
  }, [schedules])

  const handleAddClick = () => {
    const payload = {
      destinationName: formStore.name,
      scheduleName: formStore.schedule
    }
    // Change step depends on Phone number selected option
    setStep(formStore.phoneNumber)
    setDestinationData(payload)
  }

  const phoneNumberOptions = [
    {
      label: t('add_phone_number'),
      value: PHONE_NUMBER_ID
    },
    {
      label: t('select_ans_instance'),
      value: ANS_INSTANCE_ID
    },
    {
      label: t('select_ans_destination'),
      value: ANS_DESTINATION_ID
    },
    {
      label: t('select_ans_ivr'),
      value: ANS_IVR_ID
    }
  ]

  return (
    <Fragment>
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
        {isLoading ? (
          <Loading />
        ) : (
          <Box className={classes.formWrap}>
            <Box className={classes.formTitleWrap}>
              <Typography className={classes.formTitleLabel}>
                {`${t('destination')} ${scheduleIndexToAdd}`}
              </Typography>
            </Box>
            <Box className={classes.formContentWrap}>
              <Input
                icon={<PermIdentityOutlined />}
                label={t('name')}
                variant='outlined'
                onChange={e => formStore.set('name', e.target.value)}
              />
              <Select
                label={t('phone_number')}
                icon={<PhoneOutlinedIcon alt='phone' />}
                options={phoneNumberOptions}
                value={formStore.phoneNumber}
                onChange={e => formStore.set('phoneNumber', e.target.value)}
              />
              <Select
                label={t('schedule')}
                icon={
                  <ScheduleIcon
                    style={{
                      width: 30,
                      height: 25,
                      marginTop: 1,
                      marginLeft: 1
                    }}
                    alt='schedule'
                  />
                }
                options={formStore.scheduleOptions}
                value={formStore.schedule}
                onChange={e => formStore.set('schedule', e.target.value)}
              />
            </Box>
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
          disabled={!formStore.isFormValid || isLoading}
          onClick={handleAddClick}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddModal))
