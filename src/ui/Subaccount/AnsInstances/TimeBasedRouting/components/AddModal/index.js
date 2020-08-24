import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import FirstStep from './components/FirstStep'
import FreeNumberStep from './components/FreeNumberStep'
import AnsNumberStep from './components/AnsNumberStep'
import { FREE_ENTRY_NUMBER_ID, ANS_NUMBER_ID } from 'utils/types/numberTypes'

import useStyles from './styles'

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case 1:
      return <FirstStep handleClose={handleClose} />
    case FREE_ENTRY_NUMBER_ID:
      return <FreeNumberStep handleClose={handleClose} />
    case ANS_NUMBER_ID:
      return <AnsNumberStep handleClose={handleClose} />
    default:
      return <FirstStep handleClose={handleClose} />
  }
}

const AddModal = ({ open, handleClose }) => {
  const classes = useStyles()
  const { configureStep } = TimeSchedulesStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps step={configureStep} handleClose={handleClose} />
    </Dialog>
  )
}

export default observer(AddModal)
