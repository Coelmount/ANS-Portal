import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'
import AuthStore from 'stores/Auth'
import has from 'lodash/has'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'
import FourthStep from './FourthStep'

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

const SubaccountWizard = () => {
  const { userLogin, changeUserLogin } = AuthStore
  const classes = useStyles()
  const [step, setStep] = useState(0)
  const [isOpen, setIsOpen] = useState(
    has(userLogin, 'profile.is_first_login')
      ? userLogin.profile.is_first_login
        ? userLogin.profile.is_first_login
        : false
      : false
  )

  const handleClose = () => {
    setIsOpen(false)
    changeUserLogin()
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className={classes.root}>
      <Steps step={step} handleClose={handleClose} changeStep={setStep} />
    </Dialog>
  )
}

const Steps = props => {
  switch (props.step) {
    case 0:
      return (
        <FirstStep
          handleClose={props.handleClose}
          step={props.step}
          changeStep={props.changeStep}
        />
      )
    case 1:
      return (
        <SecondStep
          handleClose={props.handleClose}
          step={props.step}
          changeStep={props.changeStep}
        />
      )
    case 2:
      return (
        <ThirdStep
          handleClose={props.handleClose}
          step={props.step}
          changeStep={props.changeStep}
        />
      )
    case 3:
      return (
        <FourthStep
          handleClose={props.handleClose}
          step={props.step}
          changeStep={props.changeStep}
        />
      )
    default:
      return (
        <FirstStep
          handleClose={props.handleClose}
          step={props.step}
          changeStep={props.changeStep}
        />
      )
  }
}

export default withNamespaces()(observer(SubaccountWizard))
