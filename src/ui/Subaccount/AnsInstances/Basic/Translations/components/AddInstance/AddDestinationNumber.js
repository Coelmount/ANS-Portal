import React, { Fragment, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import capitalize from 'lodash/capitalize'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'
import Select from 'components/Select'
import Input from 'components/Input'

import useStyles from './styles'

const selectCountries = [
  { value: 'africa', label: 'Africa' },
  { value: 'uganda', label: 'Uganda' }
]

const AddDestinationNumber = ({ handleClose, t }) => {
  const classes = useStyles()

  const { step, changeStep, postDestinationNumber } = BasicTranslationsStore

  const [selectedCountry, setSelectedCountry] = useState(null)
  const [destinationNumber, setDestinationNumber] = useState(null)
  console.log(selectedCountry, destinationNumber, 'data')

  const handleAddButton = () => {
    postDestinationNumber(selectedCountry, destinationNumber)
  }

  return (
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
        <Box className={classes.subtitle}>
          <Typography className={classes.stepStyles}>{`${t(
            'step'
          )} 2/2`}</Typography>
          <Typography className={classes.setEntitlementsTitle}>
            {t('add_destination_number')}
          </Typography>
        </Box>

        <Box className={classes.inputsWrap}>
          <Select
            label={capitalize(t('country'))}
            selectStyles={classes.select}
            wrapperStyles={classes.wrapper}
            options={selectCountries}
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          />

          <Input
            onChange={(e) => setDestinationNumber(e.target.value)}
            className={classes.input}
            placeholder={t('destination_number')}
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
          // disabled={!entitlements.every((item) => item.entitlement >= 1)}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddDestinationNumber))
