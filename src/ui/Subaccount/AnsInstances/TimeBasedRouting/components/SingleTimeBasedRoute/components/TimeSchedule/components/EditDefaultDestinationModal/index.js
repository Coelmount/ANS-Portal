import React, { useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import PhoneInput from 'react-phone-input-2'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import TimeBasedRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import Input from 'components/Input'

import useStyles from './styles'

const EditDefaultDestinationModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, tbrName } = match

  const {
    timeBasedRoute,
    isLoadingSingleTBR,
    isTbrUpdating,
    getTimeBasedRoute,
    putTimeBasedRoute
  } = TimeBasedRoutingStore

  const isLoading = isLoadingSingleTBR || isTbrUpdating

  const inputStore = useLocalStore(() => ({
    values: {
      name: '',
      phoneNumber: ''
    },
    set(field, value) {
      this.values[field] = value
    },
    get isFieldsFilled() {
      return this.values.name && this.values.phoneNumber.length > 6
    }
  }))

  useEffect(() => {
    const payload = {
      customerId,
      groupId,
      tbrName
    }
    getTimeBasedRoute(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (timeBasedRoute && Object.keys(timeBasedRoute).length) {
      inputStore.set('name', timeBasedRoute.name)
      inputStore.set('phoneNumber', timeBasedRoute.defaultDestination)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeBasedRoute])

  const handleSave = () => {
    const payload = {
      customerId,
      groupId,
      tbrName,
      name: inputStore.values.name,
      defaultDestination: inputStore.values.phoneNumber,
      closeModal: handleClose
    }
    putTimeBasedRoute(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('edit_default_destination')}
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
          <Box className={classes.inputsWrap}>
            <Input
              icon={<PermIdentityOutlined />}
              label={t('name')}
              variant='outlined'
              value={inputStore.values.name}
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <PhoneInput
              value={inputStore.values.phoneNumber}
              onChange={value => {
                inputStore.set('phoneNumber', `+${value}`)
              }}
              placeholder={t('enter_number')}
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
          disabled={!inputStore.isFieldsFilled || isLoading}
          onClick={handleSave}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditDefaultDestinationModal))
