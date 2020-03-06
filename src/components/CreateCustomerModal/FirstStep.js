import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import SvgIcon from '@material-ui/core/SvgIcon'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'

import { makeStyles } from '@material-ui/core/styles'
import color from '@material-ui/core/colors/lime'

import useStyles from './styles'

const FirstStep = props => {
  const { changeStep, customer, changeCustomer } = useContext(
    CreateCustomerStore
  )
  const classes = useStyles()
  const { handleClose } = props
  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        Add customer
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>STEP 1/2</Box>
        <Box className={classes.paragraphBox}>Customer details</Box>
        <Box className={classes.inputes}>
          <Input
            icon={<img src={sharp} />}
            label={'Customer ID'}
            variant='outlined'
            value={customer.tenantId}
            onChange={e => changeCustomer('tenantId', e.target.value)}
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={'Customer name'}
            variant='outlined'
            value={customer.name}
            onChange={e => changeCustomer('name', e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsFirst}>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(2)}
        >
          Next
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
