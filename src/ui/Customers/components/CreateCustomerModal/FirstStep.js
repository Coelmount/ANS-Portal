import React from 'react'
import { withNamespaces } from 'react-i18next'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import SvgIcon from '@material-ui/core/SvgIcon'
import MuiDialogTitle from '@material-ui/core/DialogTitle'

import sharp from 'source/images/svg/sharp.svg'

import Input from 'components/Input'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 500,
      fontSize: '30px'
    }
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  }
}))

const FirstStep = props => {
  const classes = useStyles()
  const { handleClose } = props

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        Add customer
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box>STEP 1/2</Box>
        <Box>Customer details</Box>
        <Input
          icon={<img src={sharp} />}
          label={'Customer ID'}
          variant='outlined'
        />
      </DialogContent>
      <DialogActions />
    </React.Fragment>
  )
}

export default withNamespaces()(FirstStep)
