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

import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import CallOutlined from '@material-ui/icons/CallOutlined'
import EmailOutlined from '@material-ui/icons/EmailOutlined'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'

const FirstStep = props => {
  const { changeStep, customer, changeCustomer, createCustomer } = useContext(
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
        <Box className={classes.stepStyles}>STEP 2/2</Box>
        <Box className={classes.paragraphBox}>Contact information</Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PermIdentityOutlined />}
            label={'Customer name'}
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
            label={'Phone number'}
            variant='outlined'
            value={customer.contactInformation.phoneNumber}
            onChange={e =>
              changeCustomer('contactInformation.phoneNumber', e.target.value)
            }
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<EmailOutlined />}
            label={'Email'}
            variant='outlined'
            value={customer.contactInformation.emailAddress}
            onChange={e =>
              changeCustomer('contactInformation.emailAddress', e.target.value)
            }
          />
        </Box>
        <Box className={classes.paragraphBox}>
          Address information (optional)
        </Box>
        <Box className={classes.inputes}>
          <Input
            label={'Street'}
            variant='outlined'
            value={customer.addressInformation.addressLine1}
            onChange={e =>
              changeCustomer('addressInformation.addressLine1', e.target.value)
            }
          />
        </Box>
        <Box className={classes.zipCityRow}>
          <Box className={classes.zip}>
            <Input
              label={'Postal code'}
              variant='outlined'
              value={customer.addressInformation.postalCode}
              onChange={e =>
                changeCustomer('addressInformation.postalCode', e.target.value)
              }
            />
          </Box>
          <Box className={classes.city}>
            <Input
              label={'City'}
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
            label={'Country'}
            variant='outlined'
            value={customer.addressInformation.country}
            onChange={e =>
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
          Back
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => createCustomer().then(() => changeStep(3))}
        >
          Add
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
