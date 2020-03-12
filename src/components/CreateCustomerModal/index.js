import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import CreateCustomerStore from 'stores/CreateCustomer'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import SuccessPage from './SuccessPage'
import SetEntitlements from './SetEntitlements'
import SuccessEntitlements from './SuccessEntitlements'

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const CreateCustomer = props => {
  const { step } = useContext(CreateCustomerStore)
  const classes = useStyles()
  const { open, handleClose, successClose } = props

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps
        step={step}
        handleClose={handleClose}
        successClose={successClose}
      />
    </Dialog>
  )
}

const Steps = props => {
  switch (props.step) {
    case 1:
      return <FirstStep handleClose={props.handleClose} />
    case 2:
      return <SecondStep handleClose={props.handleClose} />
    case 3:
      return <SuccessPage handleClose={props.successClose} />
    case 4:
      return <SetEntitlements handleClose={props.successClose} />
    case 5:
      return <SuccessEntitlements handleClose={props.successClose} />
    default:
      return <FirstStep handleClose={props.handleClose} />
  }
}

export default withNamespaces()(observer(CreateCustomer))
