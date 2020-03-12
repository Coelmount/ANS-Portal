import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'

const FirstStep = props => {
  const { changeStep, customer, changeCustomer } = useContext(
    CreateCustomerStore
  )
  const classes = useStyles()
  const { handleClose, t } = props
  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_customer')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>{`${t('step')} 1/2`}</Box>
        <Box className={classes.paragraphBox}>{t('customer_details')}</Box>
        <Box className={classes.inputes}>
          <Input
            icon={<img src={sharp} alt='' />}
            label={t('customer_id')}
            variant='outlined'
            value={customer.tenantId}
            onChange={e => changeCustomer('tenantId', e.target.value)}
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={t('customer_name')}
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
          disabled={!customer.tenantId}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
