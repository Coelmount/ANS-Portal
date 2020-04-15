import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import EntitlementsStore from 'stores/Entitlements'

import SetEntitlements from './SetEntitlements'
import TotalEntitlements from './TotalEntitlements'
import SuccessEntitlements from './SuccessEntitlements'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      width: '651px'
    },
    '& .MuiDialog-paperScrollPaper': {
      minHeight: '100%'
    }
  }
}))

const Entitlements = (props) => {
  const classes = useStyles()
  const {
    open,
    handleClose,
    successClose,
    isCreateSubaccount,
    store,
    createSubaccount,
    isEditCustomer
  } = props
  const { step } = EntitlementsStore

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

const Steps = (props) => {
  switch (props.step) {
    case 1:
      return (
        <SetEntitlements
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
    case 2:
      return (
        <TotalEntitlements
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
    case 3:
      return (
        <SuccessEntitlements
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
    default:
      return (
        <SetEntitlements
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
        />
      )
  }
}

export default observer(Entitlements)
