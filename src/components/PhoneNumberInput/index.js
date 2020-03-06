import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import InputMask from 'react-input-mask'
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
  input: {
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
  }
}))

const PhoneNumberInput = props => {
  const classes = useStyles()
  const [inputValue, setInputValue] = useState('')
  const [valueArr, setValueArr] = useState('')

  useEffect(() => {
    let inputValArr = inputValue
      .split('')
      .map((el, index) => {
        if ((index + 1) % 3 === 0) {
          return el + ' '
        }
        return el
      })
      .join('')

    setValueArr(inputValArr)
  }, [inputValue])

  const handleInputChange = event => {
    let value = event.target.value.split(' ').join('')
    setInputValue(value)
  }

  return (
    <Box className={classes.root}>
      {!!props.icon && <Box className={classes.icon}>{props.icon}</Box>}
      <InputMask
        {...props}
        onChange={e => {
          props.onChange(inputValue)
          handleInputChange(e)
        }}
        mask='+29 999 999 999'
        value={valueArr}
      >
        {() => (
          <TextField
            placeholder='+2_ ___ ___ ___'
            className={classes.input}
            variant='outlined'
          />
        )}
      </InputMask>
    </Box>
  )
}

export default PhoneNumberInput
