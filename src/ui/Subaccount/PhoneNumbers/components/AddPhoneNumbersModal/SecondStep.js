import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Input from 'components/Input'
import Checkbox from 'components/Checkbox'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'

const SecondStep = ({ handleClose, t }) => {
  const classes = useStyles()

  const {
    changeStep,
    selectedPhoneNumber: number,
    postPhoneNumbers
  } = PhoneNumbersStore
  const defaultPhoneNumber = number.phoneNumbers
    ? `${number.countryCode} ${number.rangeStart}`
    : `${number.countryCode} ${number.phoneNumber}`

  const [enteredPhoneNumber, setEnteredPhoneNumber] = useState(
    defaultPhoneNumber
  )
  const [enteredAmountOfNumbers, setEnteredAmountOfNumbers] = useState(1)

  const handleAddButton = () => {
    if (
      checkIsNumberInRange() &&
      enteredAmountOfNumbers &&
      enteredAmountOfNumbers > 0 &&
      enteredAmountOfNumbers <= number.phoneNumbers.length
    )
      postPhoneNumbers(number, enteredAmountOfNumbers, enteredPhoneNumber)
  }

  const checkIsNumberInRange = () => {
    const phoneNumberSymbolsArr = enteredPhoneNumber.split('')
    phoneNumberSymbolsArr.splice(0, 4)
    const phoneNumberWithCountryCode = phoneNumberSymbolsArr.join('')
    return number.phoneNumbers.some(
      (item) => item.phoneNumber === phoneNumberWithCountryCode
    )
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_numbers_from_customer_level')}
        <CloseIcon onClick={handleClose} className={classes.closeButton} />
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.selectedRangeSubtitle}>
          {t('selected_range')}
        </Box>
        <Box className={classes.selectedNumberWrap}>
          <Typography className={classes.rangeStartTitle}>
            {number.phoneNumbers
              ? `${number.countryCode} ${number.rangeStart}`
              : `${number.countryCode} ${number.phoneNumber}`}
          </Typography>
          {number.phoneNumbers && (
            <img
              className={classes.rightArrowIcon}
              src={RightArrowIcon}
              alt='right icon'
            />
          )}
          <Box className={classes.endRangeWrap}>
            <Typography className={classes.rangeEndTitle}>
              {number.phoneNumbers &&
                `${number.countryCode} ${number.rangeEnd}`}
            </Typography>
            <Typography className={classes.numbersLengthTitle}>
              {number.phoneNumbers && `(${number.phoneNumbers.length})`}
            </Typography>
          </Box>
        </Box>
        <Typography className={classes.fromWhatNumberTitlte}>
          {t('from_what_number_do_you_want_to_start?')}
        </Typography>
        <Box className={classes.startWithWrap}>
          <Typography className={classes.inputTitles}>
            {t('start_with_number')}
          </Typography>
          <Input
            onChange={(e) => setEnteredPhoneNumber(e.target.value)}
            className={classes.input}
            defaultValue={defaultPhoneNumber}
          />
        </Box>
        <Box className={classes.amountOfNumbersWrap}>
          <Typography className={classes.inputTitles}>
            {t('amount_of_numbers')}
          </Typography>
          <Input
            onChange={(e) => setEnteredAmountOfNumbers(e.target.value)}
            defaultValue={enteredAmountOfNumbers}
            className={classes.amountOfNumbersInput}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => changeStep(1)}
        >
          <ChevronLeft />
          {t('back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleAddButton}
        >
          {t('add')}
          {enteredAmountOfNumbers && `(${enteredAmountOfNumbers})`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
