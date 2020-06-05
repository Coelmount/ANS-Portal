import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import useStyles from './styles'
import AudioRecorder from 'components/AudioRecorder'

const SelectMediaFile = props => {
  const { open, handleClose, t } = props
  const classes = useStyles()
  const [notSupprotedBrowser, setNotSupprotedBrowser] = useState('')

  useEffect(() => {
    const ua = navigator.userAgent
    if (ua.search(/Safari/) > 0) {
      setNotSupprotedBrowser('Safari')
      return
    }
    if (ua.search(/MSIE/) > 0) {
      setNotSupprotedBrowser('Internet Explorer')
      return
    }
  }, [])

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        Record announcement(s)
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {notSupprotedBrowser ? (
          <AudioRecorder handleClose={handleClose} />
        ) : (
          <div className={classes.notSupprotedBrowserMessage}>
            Not supported in this browser
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default withNamespaces()(observer(SelectMediaFile))
