import React, { useState, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { toJS } from 'mobx'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from 'components/Input'
import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import ModalHelperText from 'components/ModalHelperText'
import EntitlementsStore from 'stores/Entitlements'
import CreateCustomerStore from 'stores/CreateCustomer'
import CreateSubaccountStore from 'stores/CreateSubaccount'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

import useStyles from './totalStyles'

const TotalEntitlements = ({ handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()
  const {
    changeStep,
    checkedArr,
    postEntitlements,
    isSending
  } = EntitlementsStore
  const { createdCustomerStore, createSubaccountFunct } = CreateCustomerStore
  const { changeCustomer: changeSubaccount } = CreateSubaccountStore

  const [entitlements, setEntitlements] = useState(toJS(checkedArr))

  const changeTotal = (newTotal, id) => {
    const newEntitlements = [...entitlements]
    const index = entitlements.findIndex(el => el.id === id)
    newEntitlements[index].entitlement = Number(newTotal)
    setEntitlements(newEntitlements)
  }

  const handleBackButtonClick = () => {
    changeStep(1)
  }

  const createDefaultSubaccount = () => {
    if (createdCustomerStore.tenantId) {
      createSubaccountFunct()
      changeSubaccount('groupName', 'Default')
      return
    }
    handleClose()
  }

  const handleAddButton = () => {
    postEntitlements(
      createdCustomerStore.tenantId || match.customerId,
      entitlements,
      createDefaultSubaccount
    )
  }

  const columns = [
    {
      id: 'name',
      label: 'entitlement',
      isSortAvailable: false,
      extraHeadProps: {
        className: classes.entitlementHeadCell
      }
    },
    {
      id: 'total',
      label: 'total',
      extraHeadProps: {
        className: classes.totalHeader
      },
      extraProps: {
        className: classes.totalInputCell
      },
      getCellData: row => (
        <Box>
          <Input
            type='number'
            inputProps={{ min: '0' }}
            value={row.entitlement}
            className={classes.totalInput}
            onChange={e => changeTotal(e.target.value, row.id)}
            variant='outlined'
          />
        </Box>
      ),
      isSortAvailable: false
    }
  ]

  return (
    <Fragment>
      {isSending ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('add_entitlements')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.entitlementsDialogContent}>
            <ModalHelperText
              title='add_entitlements_set_limits_step'
              userLevel='customer'
            />
            <Box className={classes.subtitle}>
              <Typography className={classes.stepStyles}>{`${t(
                'step'
              )} 2/2`}</Typography>
              <Typography className={classes.setEntitlementsTitle}>
                {t('set_entitlements_limit')}
              </Typography>
            </Box>
            <CustomTable
              showSearchBar={false}
              classes={classes}
              columns={columns}
              rows={entitlements}
              isDataLoading={isSending}
              tableId={'total_entitlements'}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleBackButtonClick}
            >
              <ChevronLeft />
              {t('back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={handleAddButton}
              disabled={!entitlements.every(item => item.entitlement >= 1)}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(TotalEntitlements))
