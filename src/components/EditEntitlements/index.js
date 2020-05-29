import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
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

import entitlementsStore from 'stores/Entitlements'

import useStyles from './styles'

const EditEntitlements = props => {
  const { t } = props
  const {
    entitlements: propsEntitlements,
    putTotalEntitlements
  } = entitlementsStore
  const [entitlements, setEntitlements] = useState(toJS(propsEntitlements))
  const [disabledSave, setDisabledSave] = useState(false)
  const classes = useStyles()
  const match = useParams()

  const columns = [
    {
      id: 'name',
      label: 'entitlement',
      isSortAvailable: false
    },
    {
      id: 'assigned',
      label: 'assigned',
      getCellData: row => <Typography>{''}</Typography>,
      isSortAvailable: false,
      extraProps: {
        className: classes.textCenter
      },
      extraHeadProps: {
        className: classes.totalHeader
      }
    },
    {
      id: 'total',
      label: 'total',
      extraHeadProps: {
        className: classes.totalHeader
      },
      extraProps: {
        className: classes.totalCell
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

  const changeTotal = (newTotal, id) => {
    const newEntitlements = [...entitlements]
    const index = entitlements.findIndex(el => el.id === id)
    newEntitlements[index].entitlement = Number(newTotal)
    setEntitlements(newEntitlements)
  }

  const handleSave = () => {
    setDisabledSave(true)
    const promiseArray = []
    propsEntitlements.forEach(propsEnt => {
      entitlements.forEach(stateEnt => {
        if (
          propsEnt.id === stateEnt.id &&
          propsEnt.entitlement !== stateEnt.entitlement
        ) {
          promiseArray.push(
            putTotalEntitlements(
              match.customerId,
              stateEnt.id,
              stateEnt.entitlement
            )
          )
        }
      })
    })
    Promise.all(promiseArray).then(() => {
      setDisabledSave(false)
      props.handleClose()
    })
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.modalDialog}
    >
      <DialogTitle className={classes.title}>
        {t('edit_entitlements')}
        <IconButton
          aria-label='close'
          onClick={props.handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <CustomTable
          showSearchBar={false}
          classes={classes}
          columns={columns}
          rows={entitlements}
          tableId={'edit_entitlements'}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={props.handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleSave}
          disabled={disabledSave}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditEntitlements))
