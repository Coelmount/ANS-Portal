import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from 'components/Input'
import CustomTable from './CustomTable'

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
  const { handleClose, t, store } = props
  const { changeStep } = useContext(store)
  const [entitlements, setEntitlements] = useState(ENTITLEMENTS)
  const classes = useStyles()

  const columns = [
    {
      id: 'name',
      label: 'entitlement'
    },
    {
      id: 'assigned',
      label: 'assigned',
      getCellData: row => (
        <Typography style={{ color: 'blue' }}>{row.assigned}</Typography>
      )
    },
    {
      id: 'total',
      label: 'total',
      getCellData: row => (
        <Box>
          <Input
            value={row.total}
            className={classes.totalInput}
            variant='outlined'
          />
        </Box>
      )
    }
  ]

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('edit_entitlements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <CustomTable
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
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(5)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(EditEntitlements))
