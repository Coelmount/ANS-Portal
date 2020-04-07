import React, { useContext } from 'react'
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

const SecondStep = (props) => {
  const { handleClose, t, store, isCreateSubaccount, isEditCustomer } = props
  const {
    changeStep,
    customer,
    changeCustomer,
    createCustomer,
    updateCustomer
  } = store
  const createdCustomerStore = CreateCustomerStore
  const classes = useStyles()
  const match = useParams()

  const handleCreate = () => {
    if (isEditCustomer) {
      updateCustomer(match.customerId).then(() => handleClose())
      return
    }
    if (isCreateSubaccount) {
      createCustomer(
        createdCustomerStore.tenantId || match.customerId
      ).then(() => changeStep(3))
      return
    }
    createCustomer().then(() => changeStep(3))
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {isEditCustomer
          ? 'Edit customer'
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
        <Box className={classes.stepStyles}>{`${t('step')} 2/2`}</Box>
        <Box className={classes.paragraphBox}>{t('contact_information')}</Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={
              isCreateSubaccount ? t('subaccount_name') : t('customer_name')
            }
            variant='outlined'
            value={customer.contactInformation.name}
            onChange={(e) =>
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
            onChange={(e) =>
              changeCustomer('contactInformation.phoneNumber', e.target.value)
            }
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<EmailOutlined />}
            label={t('email')}
            variant='outlined'
            value={customer.contactInformation.emailAddress}
            onChange={(e) =>
              changeCustomer('contactInformation.emailAddress', e.target.value)
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
            onChange={(e) =>
              changeCustomer('addressInformation.addressLine1', e.target.value)
            }
          />
        </Box>
        <Box className={classes.zipCityRow}>
          <Box className={classes.zip}>
            <Input
              label={t('postal_code')}
              variant='outlined'
              value={customer.addressInformation.postalCode}
              onChange={(e) =>
                changeCustomer('addressInformation.postalCode', e.target.value)
              }
            />
          </Box>
          <Box className={classes.city}>
            <Input
              label={t('city')}
              variant='outlined'
              value={customer.addressInformation.city}
              onChange={(e) =>
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
            onChange={(e) =>
              changeCustomer('addressInformation.country', e.target.value)
            }
          />
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => changeStep(1)}
        >
          <ChevronLeft />
          {t('back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleCreate}
        >
          {isEditCustomer ? t('save') : t('add')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
