import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

import CreateCustomerStore from 'stores/CreateCustomer'

import FirstStep from './FirstStep'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      height: 'calc(100% - 64px)'
    }
  }
}))

const CreateCustomer = props => {
  const { step } = useContext(CreateCustomerStore)
  const classes = useStyles()
  const { open, handleClose } = props

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps step={step} handleClose={handleClose} />
    </Dialog>
  )
}

const Steps = props => {
  console.log(props)
  switch (props.step) {
    case 1:
      return <FirstStep handleClose={props.handleClose} />
    case 2:
      return <Box>1231</Box>
    default:
      return <FirstStep handleClose={props.handleClose} />
  }
}

export default withNamespaces()(observer(CreateCustomer))
