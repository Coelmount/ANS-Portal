import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import Papa from 'papaparse'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MaterialLink from '@material-ui/core/Link'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import CircularProgress from '@material-ui/core/CircularProgress'

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import AnnouncementsStore from 'stores/Announcements'

import useStyles from './styles'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, t } = props

  const classes = useStyles()

  const importFile = e => {
    const target = e.target
    readFile(target.files[0]).then(res => {})
  }

  const readFile = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_announcements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
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
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
