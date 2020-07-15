import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Select from 'components/Select'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const UpdateMainNumber = props => {
  const { t, open, handleClose } = props
  const classes = useStyles()
  const match = useParams()
  const { isUpdatingMainNumber, putUpdateMainNumber, mainNumber } = IVRStore
  const [number, setNumber] = useState([''])

  useEffect(() => {
    setNumber(mainNumber)
  }, [])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootUpdateMainNumber}
    >
      <DialogTitle className={classes.title}>
        {t('update_main_number')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isUpdatingMainNumber ? (
          <Loading />
        ) : (
          <Box className={classes.content}>
            <Select />
          </Box>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
          disabled={isUpdatingMainNumber}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          disabled={isUpdatingMainNumber}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(UpdateMainNumber))
