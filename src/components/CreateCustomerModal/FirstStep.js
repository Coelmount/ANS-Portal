import React, { useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
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

import ConfigStore from 'stores/Config'

import Input from 'components/Input'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const {
    handleClose,
    t,
    isCreateSubaccount,
    store,
    isEditCustomer,
    isEditSubaccount
  } = props
  const { changeStep, customer, changeCustomer } = store
  const classes = useStyles()

  const { config, isLoadingConfig } = ConfigStore

  useEffect(() => {
    if (!isLoadingConfig) {
      if (isCreateSubaccount) {
        changeCustomer('templateName', config.templates.group)
      } else {
        changeCustomer('templateName', config.templates.tenant)
        changeCustomer('type', config.tenant_type)
      }
    }
  }, [isLoadingConfig, config])

  const changeId = value => {
    if (isCreateSubaccount) {
      changeCustomer('groupId', value)
    } else {
      changeCustomer('tenantId', value)
    }
  }

  const changeName = value => {
    if (isCreateSubaccount) {
      changeCustomer('groupName', value)
    } else if (isEditSubaccount) {
      changeCustomer('groupName', value)
    } else {
      changeCustomer('name', value)
    }
  }

  const getTitle = () => {
    if (isEditCustomer) {
      return t('edit_customer')
    } else if (isEditSubaccount) {
      return t('edit_subaccount')
    } else if (isCreateSubaccount) {
      return t('add_subaccount')
    } else return t('add_customer')
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {getTitle()}
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
          {(isCreateSubaccount && t('subaccount_details')) ||
            (isEditCustomer && t('customer_details')) ||
            (isEditSubaccount && t('subaccount_details')) ||
            t('customer_details')}
        </Box>
        <Box className={classes.inputes}>
          {!isCreateSubaccount && (
            <Input
              icon={<img src={sharp} alt='' />}
              label={
                (isCreateSubaccount && t('subaccount_id')) ||
                (isEditCustomer && t('customer_id')) ||
                (isEditSubaccount && t('subaccount_id')) ||
                t('customer_id')
              }
              variant='outlined'
              disabled={isEditCustomer || isEditSubaccount}
              value={customer.tenantId || match.groupId}
              onChange={e => changeId(e.target.value)}
            />
          )}
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={
              (isCreateSubaccount && t('subaccount_name')) ||
              (isEditCustomer && t('customer_name')) ||
              (isEditSubaccount && t('subaccount_name')) ||
              t('customer_name')
            }
            variant='outlined'
            value={customer.name || customer.groupName}
            onChange={e => changeName(e.target.value)}
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
          disabled={!(customer.tenantId || customer.groupName)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
