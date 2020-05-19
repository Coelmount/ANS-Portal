import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import CloseIcon from '@material-ui/icons/Close'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import ConfigStore from 'stores/Config'

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

  const radioRows = [{ name: 'local' }, { name: 'geo' }, { name: 'toll-free' }]

  const switchRows = [
    { name: 'all' },
    { name: 'assigned' },
    { name: 'available' }
  ]

  // get countries array for CountryInput
  useEffect(() => {
    getCountries()
  }, [getCountries])

  useEffect(() => {
    filterValues.country && setSelectedCountry(filterValues.country)
    filterValues.type && setSelectedType(filterValues.type)
    filterValues.status && setSelectedStatus(filterValues.status)
  }, [filterValues.country, filterValues.type, filterValues.status])

  const handleClearButtonClick = () => {
    setPage(1)
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
        {t('filters')}
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

              <Box className={classes.radioWrap}>
                <RadioGroup>
                  {radioRows.map(item => (
                    <FormControlLabel
                      checked={selectedType === item.name}
                      onChange={e =>
                        setSelectedType(e.target.checked ? item.name : '')
                      }
                      label={item.name}
                      control={
                        <Radio
                          classes={{
                            root: classes.radioButton,
                            checked: classes.checked
                          }}
                        />
                      }
                      key={item.name}
                    />
                  ))}
                </RadioGroup>
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
