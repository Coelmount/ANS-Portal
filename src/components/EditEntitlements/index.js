import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

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

import useStyles from './styles'

const ENTITLEMENTS = [
  {
    id: 1,
    name: 'fafa',
    total: 5,
    assigned: 2
  },
  {
    id: 2,
    name: 'South Africa - GEO - ANS basic',
    total: 10,
    assigned: 2
  },
  {
    id: 3,
    name: 'South Africa - GEO - ANS advanced',
    total: 3,
    assigned: 2
  },
  {
    id: 4,
    name: 'Angola - GEO - basic',
    total: 80,
    assigned: 2
  },
  {
    id: 5,
    name: 'South Africa - GEO - ANS basic',
    total: 10,
    assigned: 2
  },
  {
    id: 6,
    name: 'South Africa - GEO - ANS advanced',
    total: 3,
    assigned: 2
  }
]

const EditEntitlements = props => {
  const { t } = props
  //const { changeStep } = useContext(store)
  const [entitlements, setEntitlements] = useState(ENTITLEMENTS)
  const classes = useStyles()

  const columns = [
    {
      id: 'name',
      label: 'entitlement',
      isSortAvailable: false
    },
    {
      id: 'assigned',
      label: 'assigned',
      getCellData: row => (
        <Typography style={{ color: 'blue' }}>{row.assigned}</Typography>
      ),
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
      getCellData: row => (
        <Box>
          <Input
            type='number'
            inputProps={{ min: '0' }}
            defaultValue={row.total}
            className={classes.totalInput}
            variant='outlined'
          />
        </Box>
      ),
      isSortAvailable: false
    }
  ]

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
          isFullVersion={false}
          classes={classes}
          columns={columns}
          rows={entitlements}
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
          onClick={props.handleClose}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditEntitlements))
