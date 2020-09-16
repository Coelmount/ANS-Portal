import React, { Fragment, useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'

import BasicTranslationsStore from 'stores/BasicTranslations'
import ConfigStore from 'stores/Config'
import CountryInput from 'components/CountryInput'
import Loading from 'components/Loading'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'
import './customPhoneInputStyles.css'

const AddDestinationNumber = ({ handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()

  const { postInstance, isPostingInstance } = BasicTranslationsStore
  const { getCountries, countries, isLoadingCountries } = ConfigStore

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCountryNameCode, setSelectedCountryNameCode] = useState('')
  const [destinationNumber] = useState('')
  const [selectedNsn, setSelectedNsn] = useState('')
  const [selectedNumberCode, setSelectedNumberCode] = useState(null)
  const [isCountryCodeEditable, setIsCountryCodeEditable] = useState(true)

  const isAddButtonDisabled = !selectedNsn || selectedNsn.length < 5

  // get countries array for CountryInput
  useEffect(() => {
    getCountries()
  }, [getCountries])

  // update country code after country selection
  useEffect(() => {
    if (selectedCountry) {
      setSelectedCountryNameCode(selectedCountry.code.toLowerCase())
    }
  }, [selectedCountry])

  // lock country code after country choose
  useEffect(() => {
    if (selectedCountryNameCode) {
      setIsCountryCodeEditable(false)
    }
  }, [selectedCountryNameCode])

  // clear nsn after request
  useEffect(() => {
    if (isPostingInstance) setSelectedNsn('')
  }, [isPostingInstance])

  // phone number input onChange; nsn/code => state
  const handlePhoneInputChange = (value, data) => {
    if (data.dialCode) {
      const initValue = value.slice(data.dialCode.length)
      const formattedValue = initValue.replace(/\s/g, '')
      setSelectedNsn(formattedValue)
      setSelectedNumberCode(data.dialCode)
    }
  }

  // triggers store POST request
  const handleAddButton = () => {
    postInstance(
      match.customerId,
      match.groupId,
      selectedNumberCode,
      selectedNsn,
      handleClose
    )
  }

  return (
    <Fragment>
      {isLoadingCountries || isPostingInstance ? (
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
              <CountryInput
                value={selectedCountry}
                setValue={setSelectedCountry}
                countries={countries}
                className={classes.countryInput}
              />
              <Box className={classes.phoneInputWrap}>
                <PhoneInput
                  country={selectedCountryNameCode}
                  value={destinationNumber}
                  placeholder={t('enter_number')}
                  disabled={!selectedCountryNameCode}
                  onChange={(value, data) =>
                    handlePhoneInputChange(value, data)
                  }
                  countryCodeEditable={isCountryCodeEditable}
                  disableDropdown
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
