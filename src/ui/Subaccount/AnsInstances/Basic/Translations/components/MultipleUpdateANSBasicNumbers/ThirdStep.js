import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined'
import CloseIcon from '@material-ui/icons/Close'
import bulkLaunched from 'source/images/svg/bulkLaunched.svg'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, t } = props

  const classes = useStyles()

  const importFile = () => {
    setStep(3)
  }

  return (
    <DialogContent>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        className={classes.closeButton}
      >
        <CloseIcon />
      </IconButton>
      <Box className={classes.redirectToBulkJob}>
        <img src={bulkLaunched} alt='bulk-launched' />
        <Box className={classes.addedBulkJobTitle}>
          {t('bulk_job_launched')}
        </Box>
        <Link
          className={classes.addedBulkJobLink}
          to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/bulk_jobs`}
        >
          {t('to_bulk_jobs')}
        </Link>
      </Box>
    </DialogContent>
  )
}

export default withNamespaces()(observer(FirstStep))
