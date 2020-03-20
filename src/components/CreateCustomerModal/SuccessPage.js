import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory, useParams } from 'react-router-dom'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import accountCheck from 'source/images/svg/account-check.svg'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'

const SuccesPage = props => {
  const { handleClose, t, store, isCreateSubaccount, createSubaccount } = props
  const { changeStep, createdCustomerStore } = useContext(store)
  const history = useHistory()
  const match = useParams()
  const classes = useStyles()

  const goToCustomer = () => {
    if (isCreateSubaccount) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${createdCustomerStore.groupId}/ans_instances/basic`
      )
      return
    }
    history.push(`/customers/${createdCustomerStore.tenantId}/access-numbers`)
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
            <img src={accountCheck} alt='' />
          </Box>
          <Box className={classes.successTitle}>
            {isCreateSubaccount
              ? t('subaccount_added_success')
              : t('customer_added_success')}
          </Box>
          <Box className={classes.successInfo}>
            {isCreateSubaccount
              ? t('subaccount_added_success_info')
              : t('customer_added_success_info')}
          </Box>
        </Box>
        <Box className={classes.boxOfButtons}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.leftButtonFromSP}
            onClick={() => goToCustomer()}
          >
            {t('go_into_account')}
          </Button>
          {!isCreateSubaccount ? (
            <Button
              variant='contained'
              color='primary'
              className={classes.rigthButtonFromSP}
              onClick={createSubaccount}
            >
              {t('add_subaccount')}
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              className={classes.rigthButtonFromSP}
              onClick={() => changeStep(4)}
            >
              {t('set_entitlements')}
            </Button>
          )}
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPage))
