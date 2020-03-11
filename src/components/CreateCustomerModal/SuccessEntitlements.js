import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import accountCheck from 'source/images/svg/account-check.svg'

import CreateCustomerStore from 'stores/CreateCustomer'
import { useHistory } from 'react-router-dom'

import useStyles from './styles'

const SuccesPage = props => {
  const { changeStep, createdCustomer } = useContext(CreateCustomerStore)
  const history = useHistory()
  const classes = useStyles()
  const { handleClose } = props

  const goToCustomer = () => {
    history.push(`/customers/${createdCustomer.tenantId}/access-numbers`)
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
            Entitlements added successfully!
          </Box>
          <Box className={classes.successInfo}>
            You can go into the customer account or continue adding a subaccount
          </Box>
        </Box>
        <Box className={classes.boxOfButtons}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.leftButtonFromSP}
            onClick={() => goToCustomer()}
          >
            Go into account
          </Button>
          <Button
            variant='contained'
            color='primary'
            className={classes.rigthButtonFromSP}
          >
            Add subaccount
          </Button>
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPage))
