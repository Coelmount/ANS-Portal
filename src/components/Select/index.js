import React from 'react'

import Select from '@material-ui/core/Select'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'

import has from 'lodash/has'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    zIndex: '1',
    left: '20px',
    height: '20px',
    width: '20px',
    textAlign: 'center'
  },
  inputIcon: {
    width: '392px',
    '& .MuiInputLabel-outlined': {
      left: '49px'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(-35px, -11px) scale(0.75)',
      color: '#666666'
    },
    '& .MuiOutlinedInput-input': {
      padding: '18.5px 14px 18.5px 60px'
    }
  },
  label: {
    width: 'auto',
    '& .MuiInputLabel-shrink': {
      transform: 'translate(13px, -11px) scale(0.75) !important',
      color: '#666666'
    },
    '& .MuiInputLabel-formControl': {
      transform: 'translate(62px, 20px) scale(1)'
    }
  },
  input: {
    width: '392px',
    '& .MuiInputLabel-outlined': {
      left: '24px'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'translate(-10px, -11px) scale(0.75)',
      color: '#666666'
    }
  }
}))

const CustomSelect = props => {
  const classes = useStyles()
  const { wrapperStyles, selectStyles, ...otherProps } = props

  return (
    <Box
      className={`${classes.root} ${
        props.wrapperStyles ? props.wrapperStyles : ''
      }`}
    >
      {!!props.icon && <Box className={classes.icon}>{props.icon}</Box>}
      <FormControl className={classes.label}>
        <InputLabel>{props.label}</InputLabel>
        <Select
          className={`${props.icon ? classes.inputIcon : classes.input} ${
            props.selectStyles ? props.selectStyles : ''
          }`}
          variant='outlined'
          {...otherProps}
        >
          {props.noneValue && (
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
          )}
          {has(props, 'options')
            ? props.options.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))
            : []}
        </Select>
      </FormControl>
    </Box>
  )
}

export default CustomSelect
