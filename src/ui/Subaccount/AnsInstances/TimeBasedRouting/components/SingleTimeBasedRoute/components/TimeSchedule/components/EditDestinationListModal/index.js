import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
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

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import Select from 'components/Select'
import {
  FREE_ENTRY_NUMBER_ID,
  ANS_NUMBER_ID
} from 'utils/types/addDestinationModalStepsId'

import ScheduleIcon from 'source/images/components/ScheduleIcon'
import useStyles from '../modalStyles.js'
import { toJS } from 'mobx'

const EditModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()
  const {
    findTimeSchedule,
    scheduleIndexToAdd,
    currentTimeSchedule,
    scheduleIndexToEdit,
    setStep,
    setDestinationData,
    putTimeSchedule,
    isTimeScheduleEditing
  } = TimeSchedulesStore

  const { getSchedules, schedules, isSchedulesLoading } = WeekSchedulesStore

  const formStore = useLocalStore(() => ({
    name: '',
    phoneNumber: '',
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

  const isLoading = isSchedulesLoading || isTimeScheduleEditing
  const isAddButtonDisabled = !formStore.isFormValid || isLoading

  // Initial request
  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getSchedules(customerId, groupId)
    findTimeSchedule()
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
    }
  }, [schedules])

  useEffect(() => {
    if (Object.keys(currentTimeSchedule)) {
      formStore.set('name', currentTimeSchedule.name)
      formStore.set('phoneNumber', currentTimeSchedule.forwardToPhoneNumber)
      formStore.set('schedule', currentTimeSchedule.timeSchedule)
    }
  }, [currentTimeSchedule])

  const handleAddClick = () => {
    const payload = {
      customerId,
      groupId,
      schedule: {
        name: formStore.name,
        destination: formStore.phoneNumber,
        timeSchedule: formStore.schedule
      },
      isPhoneNumberChanged: false,
      closeModal: handleClose
    }

    const destinationData = {
      destinationName: formStore.name,
      scheduleName: formStore.schedule
    }
    // if number didn't changed and needed to instantly send request without phonenumber step
    if (phoneNumberOptionsWithCurrent[0].value === formStore.phoneNumber) {
      putTimeSchedule(payload)
    } else {
      // go to choose number step
      setStep(formStore.phoneNumber)
      setDestinationData(destinationData)
    }
  }

  const phoneNumberOptions = [
    {
      label: t('select_free_enter_number'),
      value: FREE_ENTRY_NUMBER_ID
    },
    {
      label: t('select_ans_number'),
      value: ANS_NUMBER_ID
    }
  ]

  const phoneNumberOptionsWithCurrent = [
    {
      label: currentTimeSchedule.forwardToPhoneNumber,
      value: currentTimeSchedule.forwardToPhoneNumber
    },
    ...phoneNumberOptions
  ]

  return (
    <Fragment>
      <DialogTitle className={classes.title}>
        {t('edit_destination')}
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
                {`${t('destination')} ${scheduleIndexToEdit}`}
              </Typography>
            </Box>
            <Box className={classes.formContentWrap}>
              <Input
                icon={<PermIdentityOutlined />}
                label={t('name')}
                variant='outlined'
                value={formStore.name}
                onChange={e => formStore.set('name', e.target.value)}
              />
              {
                <Select
                  label={t('phone_number')}
                  icon={<PhoneOutlinedIcon alt='phone' />}
                  options={phoneNumberOptionsWithCurrent}
                  value={formStore.phoneNumber}
                  onChange={e => formStore.set('phoneNumber', e.target.value)}
                />
              }

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
          disabled={isAddButtonDisabled}
          onClick={handleAddClick}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(EditModal))
