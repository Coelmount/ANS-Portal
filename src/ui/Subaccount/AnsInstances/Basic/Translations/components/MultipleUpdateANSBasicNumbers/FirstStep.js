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
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined'
import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, t } = props

  const classes = useStyles()

  const importFile = () => {
    setStep(3)
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('update_ans_basic_instances')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>{`${t('step')} 1/2`}</Box>
        <Box className={classes.downloadBoxWrapper}>
          <Box className={classes.downloadFileTitle}>
            {t('download_template_file')}
          </Box>
          <Box>
            <Button
              variant='contained'
              color='primary'
              className={classes.downloadButton}
              onClick={() => setStep(2)}
            >
              <GetAppOutlinedIcon className={classes.downloadIcon} />
            </Button>
          </Box>
          <Box className={classes.downloadInfoBox}>{t('download_info')}</Box>
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
