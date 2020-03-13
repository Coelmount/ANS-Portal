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
  const { handleClose, t, store, isCreateSubaccount } = props
  const { changeStep, createdCustomer } = useContext(store)
  const history = useHistory()
  const match = useParams()
  const classes = useStyles()

  const goToCustomer = () => {
    if (isCreateSubaccount) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${createdCustomer.groupId}/my_ans_instances/basic`
      )
      return
    }
    history.push(`/customer/${createdCustomer.tenantId}/access-numbers`)
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
            {t('entitlements_added_success')}
          </Box>
          <Box className={classes.successInfo}>
            {t('entitlements_added_success_info')}
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
          {!isCreateSubaccount && (
            <Button
              variant='contained'
              color='primary'
              className={classes.rigthButtonFromSP}
            >
              {t('add_subaccount')}
            </Button>
          )}
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPage))
