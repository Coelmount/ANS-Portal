import React from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import SelectAccessPhoneNumber from './SelectAccessPhoneNumber'
import AddDestinationNumber from './AddDestinationNumber'
import AddInstanceSuccess from './AddInstanceSuccess'

import { makeStyles } from '@material-ui/core/styles'

import BasicTranslationsStore from 'stores/BasicTranslations'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const AddInstance = ({ open, handleClose }) => {
  const classes = useStyles()

  const { step } = BasicTranslationsStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps step={step} handleClose={handleClose}></Steps>
    </Dialog>
  )
}

const Steps = ({ step, handleClose }) => {
  switch (step) {
    case 1:
      return <SelectAccessPhoneNumber handleClose={handleClose} />
    case 2:
      return <AddDestinationNumber handleClose={handleClose} />
    case 3:
      return <AddInstanceSuccess handleClose={handleClose} />
    default:
      return <SelectAccessPhoneNumber handleClose={handleClose} />
  }
}

export default observer(AddInstance)
