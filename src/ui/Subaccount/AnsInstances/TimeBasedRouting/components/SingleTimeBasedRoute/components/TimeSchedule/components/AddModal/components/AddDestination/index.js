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
import Loading from 'components/Loading'
import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'
import {
  FREE_ENTRY_NUMBER_ID,
  ANS_NUMBER_ID
} from 'utils/types/addDestinationModalStepsId'

import useStyles from '../../../modalStyles'

const AddDestination = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId, tbrName } = useParams()
  const {
    scheduleIndexToAdd,
    isEditMode,
    currentTimeSchedule,
    isTimeScheduleAdding,
    isTimeScheduleEditing,
    setStep,
    setField,
    putTimeSchedule,
    postTimeSchedule,
    findTimeSchedule
  } = TimeSchedulesStore

  const formStore = useLocalStore(() => ({
    name: '',
    phoneType: FREE_ENTRY_NUMBER_ID,
    phoneNumber: '',
    scheduleOptions: [],

    set(field, value) {
      this[field] = value
    },
    get isFormValid() {
      const { name, phoneNumber, phoneType } = this
      return (
        name &&
        ((phoneNumber && phoneNumber.length > 2) || phoneType === ANS_NUMBER_ID)
      )
    }
  }))

  const isLoading = isTimeScheduleAdding || isTimeScheduleEditing
  const isFreeNumberType = formStore.phoneType === FREE_ENTRY_NUMBER_ID

  // Initial request
  useEffect(() => {
    if (isEditMode) findTimeSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (currentTimeSchedule && Object.keys(currentTimeSchedule)) {
      formStore.set('name', currentTimeSchedule.name)
      formStore.set('phoneNumber', currentTimeSchedule.forwardToPhoneNumber)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeSchedule])

  const handleAddClick = () => {
    // Trigger post request with free number
    if (isFreeNumberType) {
      const payload = {
        customerId,
        groupId,
        tbrId: tbrName,
        destination: formStore.phoneNumber,
        destinationName: formStore.name,
        isFreeNumber: true,
        closeModal: handleClose
      }
      isEditMode ? putTimeSchedule(payload) : postTimeSchedule(payload)
    } else {
      // Set name and destination values to store and go next step to choose ANS number
      setStep(ANS_NUMBER_ID)
      setField('name', formStore.name)
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

  const getButtonTitle = () => {
    if (!isFreeNumberType) return t('next')
    else {
      if (isEditMode) return t('save')
      else return t('add')
    }
  }
  const buttonTitle = getButtonTitle()

  const phoneOptions = [
    {
      label: `${t('select_free_enter_number')}:`,
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
        {isEditMode ? t('edit_destination') : t('add_destination')}
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

        <div className={classes.ansNumberStep}>
          {`${t('select_name_and_phonenumber')}:`}
        </div>

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
                value={formStore.name}
                icon={<PermIdentityOutlined />}
                label={t('name')}
                variant='outlined'
                onChange={e => formStore.set('name', e.target.value)}
              />
              <Box className={classes.radioWrap}>
                <RadioGroup>
                  {phoneOptions.map(item => (
                    <div className={classes.freeNumberRow}>
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
                      {item.value === FREE_ENTRY_NUMBER_ID && isFreeNumberType && (
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
                    </div>
                  ))}
                </RadioGroup>
              </Box>
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
          {buttonTitle}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddDestination))
