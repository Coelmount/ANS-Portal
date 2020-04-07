import React, { useState, useContext } from 'react'
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

import Input from 'components/Input'
import Checkbox from 'components/Checkbox'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'

const CountryList = ({
  classes,
  country,
  phoneNumbers,
  setCheckedRow,
  checkedRow
}) => {
  const countryNumbers = phoneNumbers.filter((item) => item.country === country)
  // console.log(countryNumbers, 'countryNumbers comp')

  return (
    <Box>
      <Typography className={classes.countryTitle}>{country}</Typography>
      {countryNumbers.map((number) => (
        <Box key={number.phoneNumber} className={classes.countryNumbersWrap}>
          <Checkbox
            onChange={() => {
              if (number.phoneNumber === checkedRow.phoneNumber)
                setCheckedRow({})
              else setCheckedRow(number)
            }}
            // checked={
            //   checkedRow && checkedRow.phoneNumber === number.phoneNumber
            // }
          />
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
      ))}
    </Box>
  )
}
const FirstStep = ({ handleClose, t }) => {
  const classes = useStyles()
  const {
    changeStep,
    uniqueCountries,
    phoneNumbers,
    setSelectedRow
  } = PhoneNumbersStore
  const [checkedRow, setCheckedRow] = useState({})
  console.log(checkedRow, 'checkedRow')

  const handleNextButton = () => {
    // setSelectedRow(checkedRow)
    changeStep(2)
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_numbers_from_customer_level')}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        className={classes.closeButton}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.subtitle}>{t('select_available_range')}</Box>
        {uniqueCountries.map((country) => (
          <CountryList
            classes={classes}
            country={country}
            phoneNumbers={phoneNumbers}
            key={country}
            setCheckedRow={setCheckedRow}
            checkedRow={checkedRow}
          />
        ))}
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => handleNextButton()}
          disabled={!Object.keys(checkedRow).length}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
