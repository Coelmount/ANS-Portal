import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import AddDestination from './components/AddDestination'

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const Entitlements = ({ open, handleClose }) => {
  const classes = useStyles()
  const { step } = TimeSchedulesStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps step={step} handleClose={handleClose} />
    </Dialog>
  )
}

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case 1:
      return <AddDestination handleClose={handleClose} />
    case 2:
      return <div>step2</div>
    default:
      return <AddDestination handleClose={handleClose} />
  }
}

export default observer(Entitlements)
