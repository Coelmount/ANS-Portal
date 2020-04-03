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

import CustomTable from './CustomTable'
import EntitlementsStore from 'stores/Entitlements'

import useStyles from './styles'
import { useEffect } from 'react'

const columns = [
  {
    id: 'name',
    label: 'entitlement'
  }
]

const SetEntitlements = props => {
  const { handleClose, t } = props
  const {
    changeStep,
    getEntitlements,
    entitlements,
    isLoadingEntitlements,
    updateSelectedArr
  } = useContext(EntitlementsStore)

  const classes = useStyles()
  const [selected, setSelected] = useState([])

  useEffect(() => {
    updateSelectedArr(selected)
  }, [selected, selected.length, updateSelectedArr])

  useEffect(() => {
    getEntitlements()
  }, [getEntitlements])

  const handleClick = selectedRow => {
    if (selected.indexOf(selectedRow) === -1) {
      setSelected(selected.concat(selectedRow))
    } else {
      const newArr = selected.filter(item => {
        return item !== selectedRow
      })
      setSelected(newArr)
    }
  }
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
        <Box className={classes.subtitle}>
          <Typography className={classes.stepStyles}>{`${t(
            'step'
          )} 1/2`}</Typography>
          <Typography className={classes.setEntitlementsTitle}>
            {t('select_entitlement')}
          </Typography>
        </Box>
        <CustomTable
          isFullVersion={true}
          rowsColor={true}
          withFilters={true}
          classes={classes}
          columns={columns}
          rows={entitlements}
          isLoadingData={isLoadingEntitlements}
          setSelected={setSelected}
          handleClick={handleClick}
          selected={selected}
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
          onClick={() => changeStep(2)}
          disabled={selected.length <= 0}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SetEntitlements))
