import React, { useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import SuccessPage from './SuccessPage'
import Entitlements from 'components/Entitlements'

import ConfigStore from 'stores/Config'
import Loading from 'components/Loading'

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
    isEditCustomer,
    isEditSubaccount
  } = props
  const { step, changeCustomer, setCreateSubaccount } = store

  const { getConfig, isLoadingConfig } = ConfigStore

  // const step = 4
  const classes = useStyles()

  useEffect(() => {
    getConfig()
    setCreateSubaccount && setCreateSubaccount(createSubaccount)
  }, [])

  if (isLoadingConfig) {
    return (
      <Dialog open={open} onClose={handleClose} className={classes.root}>
        <Loading />
      </Dialog>
    )
  }

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
        isEditSubaccount={isEditSubaccount}
        open={open}
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
          isEditSubaccount={props.isEditSubaccount}
        />
      )
    case 2:
      return (
        <SecondStep
          handleClose={props.handleClose}
          isCreateSubaccount={props.isCreateSubaccount}
          store={props.store}
          isEditCustomer={props.isEditCustomer}
          isEditSubaccount={props.isEditSubaccount}
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
        <Entitlements
          handleClose={props.handleClose}
          store={props.store}
          isCreateSubaccount={props.isCreateSubaccount}
          open={props.open}
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
