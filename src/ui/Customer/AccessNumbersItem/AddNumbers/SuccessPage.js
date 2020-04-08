import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory, useParams } from 'react-router-dom'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import phonesSuccessIcon from 'source/images/svg/phones-success.svg'

import CreateCustomerStore from 'stores/CreateCustomer'

import useStyles from './styles'

const SuccesPage = props => {
  const { handleClose, t, changeStep, addedNumbers } = props
  const history = useHistory()
  const match = useParams()
  const classes = useStyles()

  return (
    <React.Fragment>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        className={classes.successClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.successDialog}>
        <Box className={classes.successBox}>
          <Box className={classes.successIconBox}>
            <img src={phonesSuccessIcon} alt='' />
          </Box>
          <Box className={classes.successInfo}>
            {`${addedNumbers.length} ${t('numbers_added_success')}`}
          </Box>
        </Box>
        <Box className={classes.boxOfButtons}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.okButton}
            onClick={() => handleClose()}
          >
            {t('ok')}
          </Button>
          <Button
            variant='contained'
            color='primary'
            disabled
            className={classes.assignButton}
            //onClick={() => changeStep(4)}
          >
            {t('assign_them_to_subacc')}
          </Button>
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPage))
