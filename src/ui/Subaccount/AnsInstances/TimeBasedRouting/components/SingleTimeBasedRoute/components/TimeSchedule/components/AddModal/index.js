import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import AddDestination from './components/AddDestination'
import FreeNumberStep from './components/FreeNumberStep'
import AnsNumberStep from './components/AnsNumberStep'
import SelectSchedule from './components/SelectSchedule'
import {
  SELECT_SCHEDULE,
  ADD_DESTINATION_DEFAULT_ID,
  FREE_ENTRY_NUMBER_ID,
  ANS_NUMBER_ID,
  EDIT_DESTINATION_ID
} from 'utils/types/addDestinationModalStepsId'

import useStyles from '../modalStyles'

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case SELECT_SCHEDULE:
      return <SelectSchedule handleClose={handleClose} />
    case ADD_DESTINATION_DEFAULT_ID:
      return <AddDestination handleClose={handleClose} />
    case FREE_ENTRY_NUMBER_ID:
      return <FreeNumberStep handleClose={handleClose} />
    case ANS_NUMBER_ID:
      return <AnsNumberStep handleClose={handleClose} />
    case EDIT_DESTINATION_ID:
      return <AddDestination handleClose={handleClose} />
    default:
      return <SelectSchedule handleClose={handleClose} />
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
