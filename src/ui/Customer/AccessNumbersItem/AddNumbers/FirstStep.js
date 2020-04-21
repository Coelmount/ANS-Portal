import React, { useEffect, useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import CallOutlined from '@material-ui/icons/CallOutlined'

import Input from 'components/Input'

import CustomerStore from 'stores/Customers'

import useStyles from './styles'
import Loading from 'components/Loading'

const FirstStep = props => {
  const {
    handleClose,
    t,
    isCreateSubaccount,
    store,
    isEditCustomer,
    changeStep,
    numbers
  } = props
  const classes = useStyles()
  const match = useParams()

  const { customer, getCustomer, isLoadingCustomer } = CustomerStore

  useEffect(() => {
    getCustomer(match.customerId)
  }, [])

  if (isLoadingCustomer) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_numbers_inv')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.paragraphBox}>
          <CallOutlined />
          <div className={classes.boldText}>{numbers.length}</div>
          {t('numbers_reserved')}
          <div
            className={classes.boldText}
          >{`${customer.name} (id: ${customer.tenantId}) `}</div>
        </Box>
        <Box className={classes.numbersTitleBlock}>{match.numbersId}</Box>
        <Box
          className={classes.numbersBlock}
        >{`${numbers[0].number} → ${numbers[numbers.length - 1].number} (${numbers.length})`}</Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => handleClose()}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(2)}
        >
          {t('select')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
