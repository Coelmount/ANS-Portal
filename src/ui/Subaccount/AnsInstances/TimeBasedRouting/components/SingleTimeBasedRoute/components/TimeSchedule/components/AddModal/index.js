import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import AddDestination from './components/AddDestination'
import FreeNumberStep from './components/FreeNumberStep'
// import AddPhoneNumber from './components/AddPhoneNumber'
// import SelectAnsIntance from './components/SelectAnsInstance'
// import SelectAnsDestination from './components/SelectAnsDestination'
// import SelectAnsIvr from './components/SelectAnsIvr'
// import EditDestination from '../EditDestinationListModal'
import {
  ADD_DESTINATION_DEFAULT_ID,
  FREE_ENTRY_NUMBER_ID
  // PHONE_NUMBER_ID,
  // ANS_INSTANCE_ID,
  // ANS_DESTINATION_ID,
  // ANS_IVR_ID,
  // EDIT_DESTINATION_ID
} from 'utils/types/addDestinationModalStepsId'

import useStyles from '../modalStyles'

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case ADD_DESTINATION_DEFAULT_ID:
      return <AddDestination handleClose={handleClose} />
    case FREE_ENTRY_NUMBER_ID:
      return <FreeNumberStep handleClose={handleClose} />
    // case ANS_NUMBER_ID:
    //   return <AnsNumberStep handleClose={handleClose} />
    // case ANS_INSTANCE_ID:
    //   return <SelectAnsIntance handleClose={handleClose} />
    // case ANS_DESTINATION_ID:
    // case PHONE_NUMBER_ID:
    //   return <AddPhoneNumber handleClose={handleClose} />
    // case ANS_INSTANCE_ID:
    //   return <SelectAnsIntance handleClose={handleClose} />
    // case ANS_DESTINATION_ID:
    //   return <SelectAnsDestination handleClose={handleClose} />
    // case ANS_IVR_ID:
    //   return <SelectAnsIvr handleClose={handleClose} />
    // case EDIT_DESTINATION_ID:
    //   return <EditDestination handleClose={handleClose} />
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
