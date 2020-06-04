import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'

import MaterialTable, { MTableToolbar, MTableBody } from 'material-table'

import tableIcons from '../tableIcons'

import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import { makeStyles } from '@material-ui/core/styles'

import CloseIcon from '@material-ui/icons/Close'

import Loading from 'components/Loading'

import AnnouncementsStore from 'stores/Announcements'

import useStyles from './styles'
import AudioRecorder from 'components/AudioRecorder'

let announcementsForPost = []

const SelectMediaFile = props => {
  const { open, handleClose, t } = props
  const match = useParams()
  const classes = useStyles()
  const {} = AnnouncementsStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_announcements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <AudioRecorder />
      </DialogContent>
      {/* <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
          disabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          onClick={handleAddAnnouncements}
          disabled={isLoading}
        >
          {`${t('add')}`}
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}

export default withNamespaces()(observer(SelectMediaFile))
