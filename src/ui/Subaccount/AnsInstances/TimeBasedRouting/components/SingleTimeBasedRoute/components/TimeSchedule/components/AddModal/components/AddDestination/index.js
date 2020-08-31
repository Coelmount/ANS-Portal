import React, { useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
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
import useStyles from '../../../modalStyles'

const AddDestination = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()
  const { scheduleIndexToAdd, setStep, setDestinationData } = TimeSchedulesStore
  const { getSchedules, schedules, isSchedulesLoading } = WeekSchedulesStore
  const isLoading = isSchedulesLoading

  const formStore = useLocalStore(() => ({
    name: '',
    phoneNumber: FREE_ENTRY_NUMBER_ID,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      label: t('select_free_enter_number'),
      value: FREE_ENTRY_NUMBER_ID
    },
    {
      label: t('select_ans_number'),
      value: ANS_NUMBER_ID
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

      <DialogContent className={classes.addDestinationModalContent}>
        <Box className={classes.freeNumberStep}>{`${t('step')} 1/2`}</Box>
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

export default withNamespaces()(observer(AddDestination))
