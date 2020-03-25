import React, { useContext, useEffect } from 'react'
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
  const {
    open,
    handleClose,
    successClose,
    isCreateSubaccount,
    store,
    createSubaccount,
    isEditCustomer
  } = props
  // const { step } = useContext(store)
  const step = 4
  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps
        step={step}
        handleClose={handleClose}
        successClose={successClose}
        isCreateSubaccount={isCreateSubaccount}
        store={store}
        createSubaccount={createSubaccount}
        isEditCustomer={isEditCustomer}
      />
    </Dialog>
  )
}

const Steps = props => {
  switch (props.step) {
    case 1:
      return (
        <FirstStep
          handleClose={props.handleClose}
          isCreateSubaccount={props.isCreateSubaccount}
          store={props.store}
          isEditCustomer={props.isEditCustomer}
        />
      )
    case 2:
      return (
        <SecondStep
          handleClose={props.handleClose}
          isCreateSubaccount={props.isCreateSubaccount}
          store={props.store}
          isEditCustomer={props.isEditCustomer}
        />
      )
    case 3:
      return (
        <SuccessPage
          handleClose={props.successClose}
          isCreateSubaccount={props.isCreateSubaccount}
          store={props.store}
          createSubaccount={props.createSubaccount}
        />
      )
    case 4:
      return (
        <SetEntitlements
          handleClose={props.successClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
    case 5:
      return (
        <SuccessEntitlements
          handleClose={props.successClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
    default:
      return (
        <FirstStep
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
  }
}

export default withNamespaces()(observer(CreateCustomer))
