import React from 'react'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative'
  },
  icon: {
    position: 'absolute',
    zIndex: '1',
    left: '24px',
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
      padding: '18.5px 14px 18.5px 49px'
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
    },
    '& .MuiFormHelperText-contained': {
      margin: '0 !important',
      paddingTop: 3,
      backgroundColor: '#F9F9F9'
    }
  }
}))

const Input = props => {
  const classes = useStyles()
  const { wrapperStyles, inputStyles, ...otherProps } = props

  return (
    <Box
      className={`${classes.root} ${
        props.wrapperStyles ? props.wrapperStyles : ''
      }`}
    >
      {!!props.icon && <Box className={classes.icon}>{props.icon}</Box>}
      <TextField
        className={`${props.icon ? classes.inputIcon : classes.input} ${
          props.inputStyles ? props.inputStyles : ''
        }`}
        variant='outlined'
        {...otherProps}
      />
    </Box>
  )
}

export default Input
