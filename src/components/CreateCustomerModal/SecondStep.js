import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import CallOutlined from '@material-ui/icons/CallOutlined'
import EmailOutlined from '@material-ui/icons/EmailOutlined'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'
import Loading from 'components/Loading'

const SecondStep = props => {
  const {
    handleClose,
    t,
    store,
    isCreateSubaccount,
    isEditCustomer,
    isEditSubaccount
  } = props

  const {
    changeStep,
    customer,
    changeCustomer,
    createCustomer,
    updateCustomer,
    addUpdateCustomer
  } = store

  const createdCustomerStore = CreateCustomerStore
  const classes = useStyles()
  const match = useParams()

  const handleCreate = () => {
    if (isEditCustomer) {
      updateCustomer(match.customerId, handleClose)
      return
    }
    if (isEditSubaccount) {
      updateCustomer(match.customerId, match.groupId, handleClose)
      return
    }
    if (isCreateSubaccount) {
      createCustomer(
        createdCustomerStore.customer.tenantId || match.customerId,
        handleClose
      )
      return
    }
    createCustomer()
  }

  return (
    <Fragment>
      {addUpdateCustomer ? (
        <Loading />
      ) : (
        <React.Fragment>
          <DialogTitle className={classes.title}>
            {(isCreateSubaccount && t('add_subaccount')) ||
              (isEditCustomer && t('edit_customer')) ||
              (isEditSubaccount && t('edit_subaccount')) ||
              t('add_customer')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Fragment>
              <Box className={classes.stepStyles}>{`${t('step')} 2/2`}</Box>
              <Box className={classes.paragraphBox}>
                {t('contact_information')}
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PermIdentityOutlined />}
                  label={t('name')}
                  variant='outlined'
                  value={customer.contactInformation.name}
                  onChange={e =>
                    changeCustomer('contactInformation.name', e.target.value)
                  }
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<CallOutlined />}
                  label={t('phone_number')}
                  variant='outlined'
                  value={customer.contactInformation.phoneNumber}
                  onChange={e =>
                    changeCustomer(
                      'contactInformation.phoneNumber',
                      e.target.value
                    )
                  }
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<EmailOutlined />}
                  label={t('email')}
                  variant='outlined'
                  value={customer.contactInformation.emailAddress}
                  onChange={e =>
                    changeCustomer(
                      'contactInformation.emailAddress',
                      e.target.value
                    )
                  }
                />
              </Box>
              <Box className={classes.paragraphBox}>
                {t('address_information_opt')}
              </Box>
              <Box className={classes.inputes}>
                <Input
                  label={t('street')}
                  variant='outlined'
                  value={customer.addressInformation.addressLine1}
                  onChange={e =>
                    changeCustomer(
                      'addressInformation.addressLine1',
                      e.target.value
                    )
                  }
                />
              </Box>
              <Box className={classes.zipCityRow}>
                <Box className={classes.zip}>
                  <Input
                    label={t('postal_code')}
                    variant='outlined'
                    value={customer.addressInformation.postalCode}
                    onChange={e =>
                      changeCustomer(
                        'addressInformation.postalCode',
                        e.target.value
                      )
                    }
                  />
                </Box>
                <Box className={classes.city}>
                  <Input
                    label={t('city')}
                    variant='outlined'
                    value={customer.addressInformation.city}
                    onChange={e =>
                      changeCustomer('addressInformation.city', e.target.value)
                    }
                  />
                </Box>
              </Box>
              <Box className={classes.inputes}>
                <Input
                  label={t('country')}
                  variant='outlined'
                  value={customer.addressInformation.country}
                  onChange={e =>
                    changeCustomer('addressInformation.country', e.target.value)
                  }
                />
              </Box>
            </Fragment>
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={() => changeStep(1)}
              disabled={addUpdateCustomer}
            >
              <ChevronLeft />
              {t('back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={handleCreate}
              disabled={addUpdateCustomer}
            >
              {isEditCustomer || isEditSubaccount ? t('save') : t('add')}
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
