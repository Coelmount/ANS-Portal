import React from 'react'
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

import DestinationsStore from 'stores/Destionations'
import Loading from 'components/Loading'
import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const AddModal = ({ t, open, handleClose }) => {
  const { isDestinationPosting, postDestination } = DestinationsStore

  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

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

  const handleAdd = () => {
    const payload = {
      customerId,
      groupId,
      name: inputStore.values.name,
      phoneNumber: inputStore.values.phoneNumber,
      closeModal: handleClose
    }
    postDestination(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
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

      <DialogContent className={classes.modalContent}>
        <div className={classes.helperTextWrap}>
          <ModalHelperText title='add_destination_destinations' />
        </div>
        {isDestinationPosting ? (
          <Loading />
        ) : (
          <Box className={classes.inputsWrap}>
            <Input
              icon={<PermIdentityOutlined />}
              label={t('name')}
              variant='outlined'
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <Box className={classes.phoneInputWrap}>
              <PhoneInput
                value={inputStore.values.phoneNumber}
                onChange={value => {
                  inputStore.set('phoneNumber', `+${value}`)
                }}
                placeholder={t('enter_number')}
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
          disabled={!inputStore.isFieldsFilled || isDestinationPosting}
          onClick={handleAdd}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
