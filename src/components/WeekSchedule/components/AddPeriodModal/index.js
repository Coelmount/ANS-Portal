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
import Typography from '@material-ui/core/Typography'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import PeriodForm from 'components/PeriodForm'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const AddPeriodModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, weekScheduleName } = match

  const {
    periods,
    pushPeriod,
    postPeriod,
    isPeriodPosting,
    isPeriodsValid
  } = WeekSchedulesStore

  // components -----
  const AddPeriodButton = () => (
    <Box className={classes.addPeriodButtonBlock}>
      <IconButton
        aria-label='add period icon button'
        component='span'
        className={classes.addPeriodIconWrap}
        onClick={pushPeriod}
      >
        <AddOutlinedIcon className={classes.addPeriodIcon} />
      </IconButton>
      <Typography className={classes.addPeriodTitle}>{t('add')}</Typography>
    </Box>
  )
  // ------

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
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
        <Box className={classes.helperTextWrap}>
          <ModalHelperText helperText='week_schedule_add_period' />
        </Box>
        {isPeriodPosting ? (
          <Loading />
        ) : (
          <Fragment>
            <Box className={classes.periodFormsWrap}>
              {periods.map(period => (
                <PeriodForm period={period} key={period.id} />
              ))}
            </Box>
            <AddPeriodButton />
          </Fragment>
        )}
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
          onClick={() =>
            postPeriod(customerId, groupId, weekScheduleName, handleClose)
          }
          disabled={!isPeriodsValid}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddPeriodModal))
