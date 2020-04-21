import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory, useParams } from 'react-router-dom'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import successIcon from 'source/images/svg/icon-entitlements-added.svg'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'

const SuccesPage = props => {
  const { handleClose, t } = props
  const { createdCustomerStore: createdCustomer } = CreateCustomerStore

  const history = useHistory()
  const match = useParams()
  const classes = useStyles()

  const goIntoCustomerAccount = () => {
    if (Object.keys(createdCustomer).length)
      history.push(`/customers/${createdCustomer.tenantId}/access_numbers`)
    else handleClose()
  }

  const goToCustomerList = () => {
    if (Object.keys(createdCustomer).length) handleClose()
    else history.push(`/customers`)
  }

  return (
    <React.Fragment>
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
            <img src={successIcon} alt='' />
          </Box>
          <Box className={classes.successTitle}>
            {t('entitlements_added_success')}
          </Box>
          <Box className={classes.successInfo}>
            {t('entitlements_added_success_info')}
          </Box>
        </Box>
        <Box className={classes.boxOfButtonsSuccess}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.leftButtonFromSP}
            onClick={() => goToCustomerList()}
          >
            {t('go_to_the_customer_list')}
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.nextButtonEntitlements}
            onClick={() => goIntoCustomerAccount()}
          >
            {t('go_into_customer_account')}
          </Button>
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPage))
