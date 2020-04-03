import React, { useContext, useState, useEffect } from 'react'
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
import Loading from 'components/Loading'
import EntitlementsStore from 'stores/Entitlements'

import ChevronLeft from '@material-ui/icons/ChevronLeft'

import useStyles from './styles'

const TotalEntitlements = ({ handleClose, t }) => {
  const {
    changeStep,
    selectedEntitlements,
    updateTotalEntitlements,
    postEntitlements,
    isSending,
    objTotals
  } = EntitlementsStore
  const [emptyFieldsCounter, setEmptyFieldsCounter] = useState(2)
  const [isNextButtonActive, setIsNextButtonActive] = useState(false)

  const handleClick = () => {
    console.log('11')
  }

  useEffect(() => {
    if (
      !Object.values(objTotals).includes('') &&
      Object.keys(objTotals).length === selectedEntitlements.length
    )
      setIsNextButtonActive(true)
    else setIsNextButtonActive(false)
  }, [objTotals, selectedEntitlements.length])

  const classes = useStyles()
  const columns = [
    {
      id: 'name',
      label: 'entitlement'
    },
    {
      id: 'total',
      label: 'total',
      getCellData: row => {
        return (
          <Box>
            <Input
              onChange={e => {
                updateTotalEntitlements(e.target.value, row.id)
                if (e.target.value === '')
                  setEmptyFieldsCounter(emptyFieldsCounter + 1)
                else if (
                  e.target.value.length === 1 &&
                  emptyFieldsCounter >= e.target.value.length
                )
                  setEmptyFieldsCounter(emptyFieldsCounter - 1)
              }}
              className={classes.totalInput}
              variant='outlined'
            />
          </Box>
        )
      }
    }
  ]
  const handleAddButton = () => {
    postEntitlements(changeStep)
  }

  return (
    <React.Fragment>
      {isSending ? (
        <Loading />
      ) : (
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
            <Box className={classes.secondStepSubtitle}>
              <Typography className={classes.stepStyles}>{`${t(
                'step'
              )} 2/2`}</Typography>
              <Typography className={classes.setEntitlementsTitle}>
                {t('set_entitlements_limit')}
              </Typography>
            </Box>
            <CustomTable
              isFullVersion={false}
              rowsColor={false}
              withFilters={false}
              classes={classes}
              columns={columns}
              rows={selectedEntitlements}
              handleClick={handleClick}
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
              onClick={handleAddButton}
              disabled={!isNextButtonActive}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(TotalEntitlements))
