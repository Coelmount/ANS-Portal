import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import Loading from 'components/Loading'
import PeriodForm from '../PeriodForm'

import useStyles from './styles'

const AddPeriodModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, holidayScheduleName } = match
  const { postPeriod, isPeriodPosting, isPeriodValid } = HolidaySchedulesStore

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      {isPeriodPosting ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('add_period')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Box className={classes.periodFormsWrap}>
              <PeriodForm />
            </Box>
          </DialogContent>

          <DialogActions className={classes.dialogActions}>
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
              onClick={() => {
                const payload = {
                  customerId,
                  groupId,
                  holidayScheduleName,
                  closeModal: handleClose
                }
                postPeriod(payload)
              }}
              disabled={!isPeriodValid}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(AddPeriodModal))
