import React, { useState, useEffect } from 'react'

import TextField from '@material-ui/core/TextField'
import InputMask from 'react-input-mask'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  input: {
    width: '154px',
    height: '50px'
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
  )
}

export default PhoneNumberInput
