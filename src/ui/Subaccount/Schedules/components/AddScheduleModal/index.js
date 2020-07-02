import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Input from 'components/Input'
import Loading from 'components/Loading'

import useStyles from './styles'
import scheduleIcon from 'source/images/svg/schedule.svg'

const AddScheduleModal = ({
  t,
  open,
  handleClose,
  title,
  postSchedule,
  isSchedulePosting,
  closeModal
}) => {
  const classes = useStyles()
  const match = useParams()

  const [name, setName] = useState('')

  const handleAddButtonClick = () => {
    const payload = {
      customerId: match.customerId,
      groupId: match.groupId,
      closeModal,
      name
    }
    postSchedule(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {title}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isSchedulePosting ? (
          <Loading />
        ) : (
          <Box className={classes.inputes}>
            <Input
              icon={<img src={scheduleIcon} alt='schedule' />}
              label={t('schedule_name')}
              variant='outlined'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </Box>
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
          onClick={handleAddButtonClick}
          disabled={!name.length || isSchedulePosting}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(AddScheduleModal)
