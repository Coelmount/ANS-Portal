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
        <Box className={classes.stepStyles}>{`${t('step')} 1/2`}</Box>
        <Box className={classes.infoBoxWrapper}>
          <InfoOutlinedIcon />
          <Box className={classes.infoBoxContent}>
            <Box className={classes.infoTitle}>{t('required_file_format')}</Box>
            <Box className={classes.infoTextTitle}>{`${t('header')}:`}</Box>
            <Box
              className={classes.infoTextRequirement}
            >{`customerId, subaccountId, accessNumber, destinationNumber`}</Box>
            <Box className={classes.infoTextTitle}>{`${t('rows')}:`}</Box>
            <Box
              className={classes.infoTextRequirement}
            >{`value1, value2, value3, value4`}</Box>
          </Box>
        </Box>
        <Box className={classes.uploadBoxWrapper}>
          <Box className={classes.uploadFileTitle}>{t('upload_csv_file')}</Box>
          <Box>
            <input
              className={classes.uploadInput}
              id='contained-button-file'
              type='file'
              accept='text/csv'
              onChange={importFile}
            />
            <label htmlFor='contained-button-file'>
              <Button
                variant='contained'
                color='primary'
                className={classes.uploadButton}
                component='span'
              >
                <img
                  src={uploadIcon}
                  alt='upload-icon'
                  //className={classes.accountNameIcon}
                />
              </Button>
            </label>
          </Box>
        </Box>
      </DialogContent>
      {/* <DialogActions className={classes.dialogActionsSecond}>
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
          //onClick={() => changeStep(2)}
        >
          {t('next')}
        </Button>
      </DialogActions> */}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))