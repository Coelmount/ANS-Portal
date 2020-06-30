import React, { useState, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'

import CloseIcon from '@material-ui/icons/Close'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import Loading from 'components/Loading'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles.js'

const DeletePeriodsModal = ({
  t,
  open,
  handleClose,
  handleDeleteThisPeriod,
  isPeriodDeleting,
  handleDeleteThisTimeSlot,
  isThisSlotDeleting,
  handleDeleteAllPeriods,
  isAllPeriodsDeleting
}) => {
  const classes = useStyles()
  const isLoading =
    isPeriodDeleting || isThisSlotDeleting || isAllPeriodsDeleting
  const [radioButtonValue, setRadioButtonValue] = useState('thisTimeSlot')

  const handleRadioButtonChange = event => {
    setRadioButtonValue(event.target.value)
  }

  // ACTION HANDLERS
  const handleCancelButtonClick = () => {
    handleClose()
  }

  const handleDeleteButtonClick = () => {
    switch (radioButtonValue) {
      case 'thisTimeSlot':
        handleDeleteThisTimeSlot()
        break
      case 'thisPeriod':
        handleDeleteThisPeriod()
        break
      case 'allPeriods':
        handleDeleteAllPeriods()
        break
      default: {
      }
    }
  }

  // DATA
  const contentMenu = [
    {
      value: 'thisTimeSlot',
      label: t('this_time_slot')
    },
    // {
    //   value: 'thisPeriod',
    //   label: t('this_period')
    // },
    {
      value: 'allPeriods',
      label: t('all_periods')
    }
  ]

  const dialogActions = [
    {
      label: t('cancel'),
      classname: `${classes.cancelButton}`,
      handleClick: handleCancelButtonClick,
      disabled: false
    },
    {
      label: t('delete'),
      classname: `${classes.deleteButton}`,
      handleClick: handleDeleteButtonClick,
      disabled: !radioButtonValue
    }
  ]

  // SMALL COMPONENTS
  const ContentMenu = () => {
    return (
      <Fragment>
        {contentMenu.map(({ value, label }) => (
          <FormControlLabel
            value={value}
            control={<Radio />}
            label={label}
            key={label}
          />
        ))}
      </Fragment>
    )
  }

  const DialogActionsBlock = () => {
    return (
      <DialogActions className={classes.dialogActionsWrap}>
        {dialogActions.map(({ label, classname, handleClick, disabled }) => (
          <Button
            variant='contained'
            color='primary'
            className={classname}
            onClick={handleClick}
            key={label}
            disabled={disabled}
          >
            {label}
          </Button>
        ))}
      </DialogActions>
    )
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialogWrap}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.dialogTitleWrap}>
            <Box className={classes.dialogTitleContentWrap}>
              <img src={deleteIcon} alt='delete' />
              <Typography className={classes.dialogTitleLabel}>
                {t('delete_recurring_period')}
              </Typography>
            </Box>
            <CloseIcon
              onClick={handleClose}
              className={classes.dialogTitleCloseIcon}
            />
          </DialogTitle>

          <DialogContent className={classes.dialogContentWrap}>
            <RadioGroup
              aria-label='content'
              name='modal-content'
              value={radioButtonValue}
              onChange={handleRadioButtonChange}
            >
              <ContentMenu />
            </RadioGroup>
          </DialogContent>

          <DialogActionsBlock />
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(DeletePeriodsModal)
