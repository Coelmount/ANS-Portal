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

import DestinationGroupsStore from 'stores/DestinationGroups'
import Loading from 'components/Loading'
import Input from 'components/Input'
import PeriodForm from 'components/PeriodForm'
import transformTime from 'utils/schedules/transformTime'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const AddModal = ({ t, open, handleClose }) => {
  const {
    isDestinationGroupPosting,
    postDestinationGroup
  } = DestinationGroupsStore

  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const inputStore = useLocalStore(() => ({
    values: {
      name: '',
      policy: '',
      noAnswerTreatment: ''
    },
    set(field, value) {
      this.values[field] = value
    },
    get isFieldsFilled() {
      return (
        this.values.name && this.values.policy && this.values.noAnswerTreatment
      )
    }
  }))

  const handleAdd = () => {
    const payload = {
      customerId,
      groupId,
      name: inputStore.values.name,
      policy: inputStore.values.policy,
      noAnswerTreatment: inputStore.values.noAnswerTreatment,
      closeModal: handleClose
    }
    postDestinationGroup(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_group_destination')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.modalContent}>
        {isDestinationGroupPosting ? (
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
              label={t('phone_number')}
              variant='outlined'
              onChange={e => inputStore.set('policy', e.target.value)}
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
          disabled={!inputStore.isFieldsFilled}
          onClick={handleAdd}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
