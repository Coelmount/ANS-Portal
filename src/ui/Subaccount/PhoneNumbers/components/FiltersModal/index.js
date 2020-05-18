import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import ConfigStore from 'stores/Config'

import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import Switch from 'components/Switch'
import Loading from 'components/Loading'
import CountryInput from 'components/CountryInput'

import useStyles from './styles'

const FiltersModal = ({ open, t, handleClose, setPage }) => {
  const classes = useStyles()

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const { setFilterValues, clearFilterParams, filterValues } = PhoneNumbersStore
  const { getCountries, countries, isLoadingCountries } = ConfigStore

  const checkboxRows = [
    { name: 'local', amount: 23 },
    { name: 'geo', amount: 18 },
    { name: 'toll-free', amount: 54 }
  ]

  const switchRows = [
    { name: 'all', amount: null },
    { name: 'assigned', amount: 10 },
    { name: 'available', amount: 17 }
  ]

  useEffect(() => {
    getCountries()
  }, [])

  useEffect(() => {
    filterValues.country && setSelectedCountry(filterValues.country)
    filterValues.type && setSelectedType(filterValues.type)
    filterValues.status && setSelectedStatus(filterValues.status)
  }, [filterValues.country, filterValues.type, filterValues.status])

  const handleClearButtonClick = () => {
    handleClose()
    clearFilterParams()
  }

  const handleFilterButtonClick = () => {
    setFilterValues(selectedCountry, selectedType, selectedStatus)
    setPage(1)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('Filters')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isLoadingCountries ? (
          <Loading />
        ) : (
          <Fragment>
            <Box>
              <Box className={classes.subtitle}>
                <Typography className={classes.subtitleText}>
                  {t('country')}
                </Typography>
              </Box>
              <CountryInput
                value={selectedCountry}
                setValue={setSelectedCountry}
                countries={countries}
                className={classes.countryInput}
              />
            </Box>

            <Box>
              <Box className={classes.subtitle}>
                <Typography className={classes.subtitleText}>
                  {t('type')}
                </Typography>
              </Box>
              <Box className={classes.checkboxesWrap}>
                {checkboxRows.map(item => (
                  <Box className={classes.checkboxRow} key={item.name}>
                    <Checkbox
                      checked={item.name === selectedType}
                      onChange={e =>
                        setSelectedType(e.target.checked ? item.name : '')
                      }
                    />
                    <Typography>
                      <span className={classes.nameTitle}>{item.name}</span>
                      <span>{`(${item.amount})`}</span>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Box className={classes.subtitle}>
                <Typography className={classes.subtitleText}>
                  {t('status')}
                </Typography>
              </Box>
              <Box className={classes.statusContentContainer}>
                {switchRows.map(item => (
                  <Box className={classes.statusContentRow} key={item.name}>
                    <Typography>{t(item.name).toLowerCase()}</Typography>
                    <Switch
                      checked={item.name === selectedStatus}
                      handleChange={e =>
                        setSelectedStatus(
                          e.target.checked === true ? item.name : ''
                        )
                      }
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Fragment>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClearButtonClick}
        >
          {t('clear_all')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          onClick={handleFilterButtonClick}
        >
          {t('filter')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(FiltersModal))
