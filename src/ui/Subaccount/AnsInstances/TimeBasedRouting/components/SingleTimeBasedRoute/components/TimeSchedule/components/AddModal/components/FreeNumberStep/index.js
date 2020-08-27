import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-input-2'

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

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PeriodForm from 'components/PeriodForm'
import Select from 'components/Select'
import transformTime from 'utils/schedules/transformTime'
import { FREE_ENTRY_NUMBER_ID, ANS_NUMBER_ID } from 'utils/types/numberTypes'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const FreeNumberStep = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const {
    isEditMode,
    putTimeSchedule,
    postTimeSchedule,
    setStep,
    isTimeScheduleAdding,
    isTimeScheduleEditing
  } = TimeSchedulesStore

  const isLoading = isTimeScheduleAdding || isTimeScheduleEditing
  const inputStore = useLocalStore(() => ({
    phoneNumber: '',
    set(value) {
      this.phoneNumber = value
    },
    get isPhoneNumberValid() {
      return this.phoneNumber
    }
  }))

  const handlePhoneInputChange = value => {
    inputStore.set(`+${value}`)
  }

  // Back to first step
  const handleBackButtonClick = () => {
    setStep(1)
  }

  // Trigger store POST request
  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      destination: inputStore.phoneNumber,
      isPhoneNumberChanged: true,
      closeModal: handleClose
    }
    isEditMode ? putTimeSchedule(payload) : postTimeSchedule(payload)
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <DialogTitle className={classes.title}>
            {t('add_tbr_instance')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent className={classes.modalContent}>
            <Box className={classes.freeNumberStep}>{`${t('step')} 2/2`}</Box>
            <Box className={classes.phoneNumberWrap}>
              <PhoneInput
                value={inputStore.phoneNumber}
                placeholder={t('enter_number')}
                onChange={value => handlePhoneInputChange(value)}
              />
            </Box>
          </DialogContent>

          <DialogActions className={classes.dialogActions}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleBackButtonClick}
            >
              {t('back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              disabled={!inputStore.isPhoneNumberValid || isLoading}
              onClick={handleAddButtonClick}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </>
      )}
    </>
  )
}

export default withNamespaces()(observer(FreeNumberStep))
