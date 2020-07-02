import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { Link, useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

import noAccessNumbersIcon from 'source/images/svg/no-access-numbers.svg'
import useStyles from './styles'

const NoNumbersModal = ({ t, open, handleClose, clickedGroupId }) => {
  const match = useParams()
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        className={classes.successClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.successDialog}>
        <Box className={classes.successBox}>
          <Box className={classes.successIconBox}>
            <img src={noAccessNumbersIcon} alt='no access numbers' />
          </Box>
          <Box className={classes.successTitle}>
            {t('no_access_numbers_assigned')}
          </Box>
          <Box className={classes.successInfo}>
            {t('no_access_numbers_assigned_message')}
          </Box>
        </Box>
        <Box className={classes.boxOfButtons}>
          <Button variant='outlined' color='primary' className={classes.button}>
            <Link to={`/customers/${match.customerId}/access_numbers`}>
              {t('assign_numbers')}
            </Link>
          </Button>

          <Button
            variant='contained'
            color='primary'
            className={classes.button}
          >
            <Link
              to={`/customers/${match.customerId}/subaccounts/${clickedGroupId}/ans_instances`}
            >
              {t('go_into_subaccount')}
            </Link>
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default withNamespaces()(observer(NoNumbersModal))
