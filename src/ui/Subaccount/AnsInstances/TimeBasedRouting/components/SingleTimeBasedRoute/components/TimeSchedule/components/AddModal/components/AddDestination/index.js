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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import Select from 'components/Select'
import ModalHelperText from 'components/ModalHelperText'
import {
  FREE_ENTRY_NUMBER_ID,
  ANS_NUMBER_ID
} from 'utils/types/addDestinationModalStepsId'

import ScheduleIcon from 'source/images/components/ScheduleIcon'
import useStyles from '../../../modalStyles'

const AddDestination = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId, tbrName } = useParams()
  const {
    scheduleIndexToAdd,
    isEditMode,
    setStep,
    setDestinationData,
    putTimeSchedule,
    postTimeSchedule
  } = TimeSchedulesStore
  const {
    getSchedules,
    schedules,
    isSchedulesLoading,
    isTimeScheduleAdding
  } = WeekSchedulesStore

  const formStore = useLocalStore(() => ({
    name: '',
    phoneType: FREE_ENTRY_NUMBER_ID,
    phoneNumber: '',
    schedule: '',
    scheduleOptions: [],

    set(field, value) {
      this[field] = value
    },
    get isFormValid() {
      const { name, phoneNumber, phoneType, schedule } = this
      return (
        name &&
        schedule &&
        (phoneNumber.length > 2 || phoneType === ANS_NUMBER_ID)
      )
    }
  }))

  const isLoading = isSchedulesLoading || isTimeScheduleAdding
  const isFreeNumberType = formStore.phoneType === FREE_ENTRY_NUMBER_ID

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
    // Trigger post request with free number
    if (isFreeNumberType) {
      const payload = {
        customerId,
        groupId,
        tbrId: tbrName,
        destination: formStore.phoneNumber,
        destinationName: formStore.name,
        destinationScheduleName: formStore.schedule,
        isPhoneNumberChanged: true,
        closeModal: handleClose
      }
      isEditMode ? putTimeSchedule(payload) : postTimeSchedule(payload)
    } else {
      // Go next step to choose ANS number
      setStep(ANS_NUMBER_ID)
      setDestinationData(payload)
    }
  }

  const handlePhoneNumberChange = e => {
    const value = e.target.value
    // Starts from + or number then only numbers
    const reg = /^[+\d]?(?:[\d-.\s()]*)$/

    if (value.length > 30) return
    if (reg.test(value) || value === '') {
      formStore.set('phoneNumber', value)
    }
  }

  const phoneOptions = [
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
        <div className={classes.helperTextWrap}>
          <ModalHelperText helperText='add_destination_tbr_time_schedule' />
        </div>
        {/* <Box className={classes.freeNumberStep}>{`${t('step')} 1/2`}</Box> */}
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
              <Box className={classes.radioWrap}>
                <RadioGroup>
                  {phoneOptions.map(item => (
                    <FormControlLabel
                      checked={formStore.phoneType === item.value}
                      onChange={e => formStore.set('phoneType', item.value)}
                      label={item.label}
                      control={
                        <Radio
                          classes={{
                            root: classes.radioButton,
                            checked: classes.checked
                          }}
                        />
                      }
                      key={item.value}
                    />
                  ))}
                </RadioGroup>
              </Box>

              {isFreeNumberType && (
                <Box className={classes.phoneInputWrap}>
                  <Input
                    label={t('phone_number')}
                    icon={<PhoneOutlinedIcon alt='phone' />}
                    value={formStore.phoneNumber}
                    placeholder={t('enter_number')}
                    onChange={handlePhoneNumberChange}
                  />
                </Box>
              )}

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
          {isFreeNumberType ? t('add') : t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddDestination))
