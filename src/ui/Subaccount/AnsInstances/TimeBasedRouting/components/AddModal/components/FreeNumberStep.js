import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import ModalHelperText from 'components/ModalHelperText'
import Input from 'components/Input'

import useStyles from '../styles'

const FreeNumberStep = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const {
    postTimeBasedRoute,
    isTimeBasedRoutePosting,
    setConfigureStep
  } = TimeBaseRoutingStore

  const inputStore = useLocalStore(() => ({
    phoneNumber: '',
    set(value) {
      this.phoneNumber = value
    },
    get isPhoneNumberValid() {
      return this.phoneNumber.length > 1
    }
  }))

  const handlePhoneInputChange = e => {
    const value = e.target.value
    // Starts from + or number then only numbers
    const reg = /^[+\d]?(?:[\d-.\s()]*)$/

    if (value.length > 30) return
    if (reg.test(value) || value === '') {
      inputStore.set(value)
    }
  }

  // Back to first step
  const handleBackButtonClick = () => {
    setConfigureStep(1)
  }

  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      defaultDestination: inputStore.phoneNumber,
      closeModal: handleClose
    }
    postTimeBasedRoute(payload)
  }

  return (
    <>
      {isTimeBasedRoutePosting ? (
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

          <DialogContent className={classes.freeNumberStepModalContent}>
            <div className={classes.freeNumberContentWrap}>
              <ModalHelperText helperText='add_tbr_instance_tbr_step_2_free_number' />
              <Box className={classes.freeNumberStep}>{`${t('step')} 2/2`}</Box>
            </div>
            <Box className={classes.phoneInputWrap}>
              <Input
                label={`${t('default_forwarding_destination')}`}
                icon={<PhoneOutlinedIcon alt='phone' />}
                value={inputStore.phoneNumber}
                placeholder={t('enter_number')}
                onChange={handlePhoneInputChange}
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
              disabled={
                !inputStore.isPhoneNumberValid || isTimeBasedRoutePosting
              }
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
