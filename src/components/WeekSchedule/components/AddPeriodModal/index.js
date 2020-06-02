import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import Loading from 'components/Loading'
import PeriodForm from 'components/PeriodForm'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const AddPeriodModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const isSchedulePosting = false

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_period')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isSchedulePosting ? (
          <Loading />
        ) : (
          <Fragment>
            <PeriodForm
            //  scheme={periodFormScheme}
            />
          </Fragment>
        )}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          // onClick={handleGeneralAddButtonClick}
          // disabled={!name.length || isSchedulePosting}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(AddPeriodModal)
