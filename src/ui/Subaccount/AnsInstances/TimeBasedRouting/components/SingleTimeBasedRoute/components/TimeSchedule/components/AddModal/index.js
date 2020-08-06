import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import AddDestination from './components/AddDestination'
import AddPhoneNumber from './components/AddPhoneNumber'

import useStyles from './styles.js'

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case 1:
      return <AddDestination handleClose={handleClose} />
    case 2:
      return <AddPhoneNumber handleClose={handleClose} />
    case 3:
      return <div>select ans instance</div>
    default:
      return <AddDestination handleClose={handleClose} />
  }
}

const AddModal = ({ open, handleClose }) => {
  const classes = useStyles()
  const { step } = TimeSchedulesStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps step={step} handleClose={handleClose} />
    </Dialog>
  )
}

export default observer(AddModal)
