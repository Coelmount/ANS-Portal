import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const FreeNumberStep = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId, tbrName } = useParams()

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
      tbrId: tbrName,
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
              <div className={classes.topContentWrap}>
                <ModalHelperText helperText='add_destination_tbr_time_schedule_step_2_free_number' />
                <Box className={classes.freeNumberStep}>{`${t('step')} 2/2`}</Box>
              </div>

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
