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

import Input from 'components/Input'
import CustomTable from './CustomTable'
import EntitlementsStore from 'stores/Entitlements'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

import useStyles from './styles'

const ENTITLEMENTS = [
  {
    id: 1,
    name: 'fafa',
    total: 5
  },
  {
    id: 2,
    name: 'South Africa - GEO - ANS basic',
    total: 10
  },
  {
    id: 3,
    name: 'South Africa - GEO - ANS advanced',
    total: 3
  },
  {
    id: 4,
    name: 'Angola - GEO - basic',
    total: 80
  },
  {
    id: 5,
    name: 'South Africa - GEO - ANS basic',
    total: 10
  },
  {
    id: 6,
    name: 'South Africa - GEO - ANS advanced',
    total: 3
  }
]

const TotalEntitlements = props => {
  const { handleClose, t } = props
  const { changeStep } = useContext(EntitlementsStore)
  const [entitlements, setEntitlements] = useState(ENTITLEMENTS)
  const classes = useStyles()

  const columns = [
    {
      id: 'name',
      label: 'entitlement'
    },
    {
      id: 'total',
      label: 'total',
      getCellData: () => (
        <Box>
          <Input className={classes.totalInput} variant='outlined' />
        </Box>
      )
    }
  ]

  return (
    <React.Fragment>
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
        <Box className={classes.stepStyles}>{`${t('step')} 2/2`}</Box>
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
          onClick={() => changeStep(1)}
        >
          <ChevronLeft />
          {t('back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(3)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(TotalEntitlements))
