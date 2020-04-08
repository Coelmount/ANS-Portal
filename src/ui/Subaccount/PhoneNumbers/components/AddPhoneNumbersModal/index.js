import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Dialog from '@material-ui/core/Dialog'

import { makeStyles } from '@material-ui/core/styles'

import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import SuccessPage from './SuccessPage'
import AddedListStep from './AddedListStep'

import PhoneNumbersStore from 'stores/PhoneNumbers'

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

const AddPhoneNumbersModal = ({ open, handleClose, successClose }) => {
  const { step } = PhoneNumbersStore
  const { selectedPhoneNumber } = PhoneNumbersStore
  const classes = useStyles()
  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <Steps
        step={step}
        handleClose={handleClose}
        successClose={successClose}
        open={open}
      />
    </Dialog>
  )
}

const Steps = (props) => {
  switch (props.step) {
    case 1:
      return <FirstStep handleClose={props.handleClose} />
    case 2:
      return <SecondStep handleClose={props.handleClose} />
    case 3:
      return <SuccessPage handleClose={props.successClose} />
    case 4:
      return <AddedListStep handleClose={props.handleClose} />
    default:
      return <FirstStep handleClose={props.handleClose} />
  }
}

export default withNamespaces()(observer(AddPhoneNumbersModal))