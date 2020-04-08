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

const FirstStep = (props) => {
  const { handleClose, t, isCreateSubaccount, store, isEditCustomer } = props
  const { changeStep, customer, changeCustomer } = useContext(store)
  const classes = useStyles()

  const changeId = (value) => {
    if (isCreateSubaccount) {
      changeCustomer('groupId', value)
      return
    }
    changeCustomer('tenantId', value)
  }

  const changeName = (value) => {
    if (isCreateSubaccount) {
      changeCustomer('groupName', value)
      return
    }
    changeCustomer('name', value)
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {isEditCustomer
          ? t('edit_customer')
          : isCreateSubaccount
          ? t('add_subaccount')
          : t('add_customer')}
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
        <Box className={classes.paragraphBox}>
          {isCreateSubaccount ? t('subaccount_details') : t('customer_details')}
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<img src={sharp} alt='' />}
            label={isCreateSubaccount ? t('subaccount_id') : t('customer_id')}
            variant='outlined'
            disabled={isEditCustomer}
            value={customer.tenantId || customer.groupId}
            onChange={(e) => changeId(e.target.value)}
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={
              isCreateSubaccount ? t('subaccount_name') : t('customer_name')
            }
            variant='outlined'
            value={customer.name || customer.groupName}
            onChange={(e) => changeName(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
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
          onClick={() => changeStep(2)}
          disabled={!customer.tenantId && !customer.groupName}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
