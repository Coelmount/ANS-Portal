import React, { useState } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import { makeStyles } from '@material-ui/core/styles'

import checked from './checked.svg'
//import unchecked from './unchecked.svg'
import unchecked from './checkbox.svg'

const useStyles = makeStyles(theme => ({
  label: {
    margin: 0,
    '& .MuiTypography-body1': {
      fontSize: '14px'
    }
  }
}))

const CheckboxItem = props => {
  const [isChecked, setChecked] = useState(false)
  const handleChange = () => {
    setChecked(!isChecked)
  }

  const classes = useStyles()

  return (
    <FormGroup row>
      <FormControlLabel
        className={classes.label}
        control={
          <Checkbox
            onChange={handleChange}
            icon={<img src={unchecked} alt='unchecked icon' />}
            checkedIcon={<img src={checked} alt='checked icon' />}
            value='checkedA'
            {...props}
          />
        }
        label={props.label ? props.label : null}
      />
    </FormGroup>
  )
}

export default CheckboxItem
