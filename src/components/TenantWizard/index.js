import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'

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

const TenantWizard = () => {
  const classes = useStyles()
  const [step, setStep] = useState(2)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={classes.root}
    >
      <Steps
        step={step}
        handleClose={() => setIsOpen(false)}
        changeStep={setStep}
      />
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

export default withNamespaces()(observer(TenantWizard))
