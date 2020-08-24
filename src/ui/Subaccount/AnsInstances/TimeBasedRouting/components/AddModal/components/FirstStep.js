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

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PeriodForm from 'components/PeriodForm'
import Select from 'components/Select'
import transformTime from 'utils/schedules/transformTime'
import { FREE_ENTRY_NUMBER_ID, ANS_NUMBER_ID } from 'utils/types/numberTypes'

import useStyles from '../styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const FirstStep = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const { postTimeBasedRoute, isTimeBasedRoutePosting } = TimeBaseRoutingStore

  const inputStore = useLocalStore(() => ({
    name: '',
    numberType: '',
    set(field, value) {
      this[field] = value
    },
    get isNameValid() {
      return this.name
    }
  }))

  const handleAdd = () => {
    const payload = {
      customerId,
      groupId,
      name: inputStore.name,
      closeModal: handleClose
    }
    postTimeBasedRoute(payload)
  }

  const phoneNumberTypeOptions = [
    {
      label: t('free_entry'),
      value: FREE_ENTRY_NUMBER_ID
    },
    {
      label: t('ans_number'),
      value: ANS_NUMBER_ID
    }
  ]

  return (
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
        {isTimeBasedRoutePosting ? (
          <Loading />
        ) : (
          <Box className={classes.inputsWrap}>
            <Input
              icon={<PhoneOutlinedIcon />}
              label={t('name')}
              variant='outlined'
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <Select
              label={t('phone_number_type')}
              icon={<PhoneOutlinedIcon alt='phone' />}
              options={phoneNumberTypeOptions}
              value={inputStore.numberType}
              onChange={e => inputStore.set('numberType', e.target.value)}
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
          disabled={!inputStore.isNameValid || isTimeBasedRoutePosting}
          onClick={handleAdd}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </>
  )
}

export default withNamespaces()(observer(FirstStep))
