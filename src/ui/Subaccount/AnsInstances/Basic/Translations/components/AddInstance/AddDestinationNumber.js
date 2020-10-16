import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'

import BasicTranslationsStore from 'stores/BasicTranslations'
import Input from 'components/Input'
import Loading from 'components/Loading'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'
import './customPhoneInputStyles.css'

const AddDestinationNumber = ({ handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()

  const { postInstance, isPostingInstance } = BasicTranslationsStore

  const localStore = useLocalStore(() => ({
    phoneNumber: '',
    setPhoneNumber(number) {
      this.phoneNumber = number
    },
    get calculateNumberType() {
      if (!this.phoneNumber.length) return 'None'

      if (
        this.phoneNumber.startsWith('+999') ||
        this.phoneNumber.startsWith('00999')
      ) {
        return 'Onward routing'
      } else if (
        this.phoneNumber.startsWith('+') ||
        this.phoneNumber.startsWith('00')
      ) {
        return 'International call forwarding'
      }
      return 'Custom routing'
    }
  }))

  const isAddButtonDisabled =
    localStore.phoneNumber.length < 2 || localStore.phoneNumber.length > 30

  const handlePhoneNumberChange = e => {
    const value = e.target.value
    // Starts from + or number then only numbers
    const reg = /^[+\d]?(?:[\d-.\s()]*)$/

    if (value.length > 30) return
    if (reg.test(value) || value === '') {
      localStore.setPhoneNumber(value)
    }
  }

  // triggers store POST request
  const handleAddButton = () => {
    postInstance(
      match.customerId,
      match.groupId,
      localStore.phoneNumber,
      history
    )
  }

  return (
    <Fragment>
      {isPostingInstance ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('add_ans_basic_instance')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.entitlementsDialogContent}>
            <Box className={classes.helperTextWrap}>
              <ModalHelperText title={t('add_ans_basic_instance')} />
            </Box>
            <Box className={classes.subtitle}>
              <Typography className={classes.setEntitlementsTitle}>
                {t('add_destination_number')}
              </Typography>
            </Box>

            <Box className={classes.inputsWrap}>
              <Box className={classes.phoneInputWrap}>
                <Input
                  label={t('phone_number')}
                  icon={<PhoneOutlinedIcon alt='phone' />}
                  value={localStore.phoneNumber}
                  placeholder={t('enter_number')}
                  onChange={handlePhoneNumberChange}
                />
              </Box>

              <Box className={classes.phoneInputWrap}>
                <Input
                  label={t('number_type')}
                  icon={<LocationOnOutlinedIcon alt='location' />}
                  value={localStore.calculateNumberType}
                  placeholder={t('enter_number')}
                  disabled
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
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
              onClick={handleAddButton}
              disabled={isAddButtonDisabled}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(AddDestinationNumber))
