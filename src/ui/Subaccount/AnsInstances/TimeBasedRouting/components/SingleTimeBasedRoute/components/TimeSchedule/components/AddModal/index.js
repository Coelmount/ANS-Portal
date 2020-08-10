import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import AddDestination from './components/AddDestination'
import AddPhoneNumber from './components/AddPhoneNumber'
import {
  ADD_DESTINATION_DEFAULT,
  PHONE_NUMBER_ID,
  ANS_INSTANCE_ID,
  ANS_DESTINATION_ID,
  ANS_IVR_ID
} from 'utils/types/addDestinationModalStepsId'

import useStyles from './styles.js'

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case ADD_DESTINATION_DEFAULT:
      return <AddDestination handleClose={handleClose} />
    case PHONE_NUMBER_ID:
      return <AddPhoneNumber handleClose={handleClose} />
    case ANS_INSTANCE_ID:
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
