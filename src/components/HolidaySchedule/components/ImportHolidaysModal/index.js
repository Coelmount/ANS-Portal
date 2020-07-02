import React, { useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import Loading from 'components/Loading'
import CountryInput from 'components/CountryInput'
import Select from 'components/Select'

import useStyles from './styles'

const ImportHolidaysModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, holidayScheduleName } = match
  const {
    getImportCountriesList,
    getImportYearsList,
    importCountriesList,
    importYearsList,
    importData: { country, year },
    updateImportData,
    importPublicHolidays,
    isHolidaysImporting,
    isImportButtonActive,
    isImportCountriesListLoading,
    isImportYearsListLoading
  } = HolidaySchedulesStore

  const isLoading =
    isHolidaysImporting ||
    isImportCountriesListLoading ||
    isImportYearsListLoading

  useEffect(() => {
    getImportCountriesList()
    getImportYearsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleYearChange = e => {
    const payload = {
      field: 'year',
      value: e.target.value
    }
    updateImportData(payload)
  }

  const handleCountryChange = e => {
    const payload = {
      field: 'country',
      value: e
    }
    updateImportData(payload)
  }

  const handleImportClick = () => {
    const payload = {
      customerId,
      groupId,
      holidayScheduleName,
      closeModal: handleClose
    }
    importPublicHolidays(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('import_public_holidays')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent className={classes.contentWrap}>
            <CountryInput
              value={country}
              setValue={handleCountryChange}
              countries={importCountriesList}
              className={classes.countryInput}
            />
            <Select
              label={t('choose_year')}
              selectStyles={classes.select}
              options={importYearsList}
              value={year}
              onChange={handleYearChange}
            />
          </DialogContent>

          <DialogActions className={classes.dialogActions}>
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
              onClick={handleImportClick}
              disabled={!isImportButtonActive}
            >
              {t('import')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(ImportHolidaysModal))
