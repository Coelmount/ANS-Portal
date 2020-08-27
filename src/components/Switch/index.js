import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 48,
    height: 24,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 2,
    '&$checked': {
      transform: 'translateX(24px)',
      color: '#F9F9F9',
      '& + $track': {
        backgroundColor: '#FFCC00',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#C4C4C4',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 20,
    height: 20
  },
  track: {
    borderRadius: 30,
    backgroundColor: '#C4C4C4',
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  )
})

const CustomSwitch = props => {
  return (
    <FormControlLabel
      control={
        <IOSSwitch checked={props.checked} onChange={props.handleChange} />
      }
      label={props.label}
      labelPlacement={props.labelPlacement}
    />
  )
}

CustomSwitch.propTypes = {
  checked: PropTypes.bool,
  handleChange: PropTypes.func,
  label: PropTypes.string,
  labelPlacement: PropTypes.string
}

CustomSwitch.defaultProps = {
  labelPlacement: 'end'
}

export default CustomSwitch
