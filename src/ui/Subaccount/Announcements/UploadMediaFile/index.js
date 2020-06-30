import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'

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

const UploadMediaFile = props => {
  const { open, handleClose } = props
  const [step, setStep] = useState(1)
  const [announcements, setAnnouncements] = useState([])

  const classes = useStyles()

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps
        step={step}
        handleClose={handleClose}
        setStep={setStep}
        announcements={announcements}
        setAnnouncements={setAnnouncements}
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
          setStep={props.setStep}
          announcements={props.announcements}
          setAnnouncements={props.setAnnouncements}
        />
      )
    case 2:
      return (
        <SecondStep
          handleClose={props.handleClose}
          setStep={props.setStep}
          announcements={props.announcements}
          setAnnouncements={props.setAnnouncements}
        />
      )
    default:
      return <FirstStep handleClose={props.handleClose} />
  }
}

export default withNamespaces()(observer(UploadMediaFile))
