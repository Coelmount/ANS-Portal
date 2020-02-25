import React from 'react'
import { withNamespaces } from 'react-i18next'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    }
  }
}))

const CreateCustomer = props => {
  const classes = useStyles()
  const { open, handleClose } = props

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <FirstStep handleClose={handleClose} />
    </Dialog>
  )
}

export default withNamespaces()(CreateCustomer)
