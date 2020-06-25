import React, { Fragment } from 'react'

import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

const countryToFlag = isoCode => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .toUpperCase()
        .replace(/./g, char =>
          String.fromCodePoint(char.charCodeAt(0) + 127397)
        )
    : isoCode
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18
    }
  }
})

const CountryInput = ({ value, setValue, countries, className }) => {
  const defaultClasses = useStyles()

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      id='country-select-demo'
      options={countries}
      classes={{
        option: defaultClasses.option
      }}
      className={className}
      autoHighlight
      getOptionLabel={option => option.label || ''}
      renderOption={option => (
        <Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) {option.phone}
        </Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label='Choose a country'
          variant='outlined'
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off' // disable autocomplete and autofill
          }}
        />
      )}
    />
  )
}

export default CountryInput
