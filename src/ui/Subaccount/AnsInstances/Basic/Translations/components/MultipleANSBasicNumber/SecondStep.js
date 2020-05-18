import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, t } = props

  const classes = useStyles()

  const importFile = () => {
    setStep(2)
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_multiple_ans_basic_instances')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.secondStepTitleBlock}>
          <Box className={classes.stepStyles}>{`${t('step')} 2/2`}</Box>
          <Box className={classes.secondStepTitleInfo}>
            {t('list_of_resilts')}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
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
          onClick={() => handleClose()}
        >
          {`${t('add')}()`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
