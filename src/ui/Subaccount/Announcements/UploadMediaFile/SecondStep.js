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

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import AnnouncementsStore from 'stores/Announcements'

import AudioPlayer from 'components/AudioPlayer'
import Input from 'components/Input'

import useStyles from './styles'
import { darken } from '@material-ui/core'

const FirstStep = props => {
  const match = useParams()
  const { handleClose, setStep, t, announcements, setAnnouncements } = props

  const classes = useStyles()

  console.log(announcements)

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
          {announcements.map((el, i) => (
            <Box key={el.file.lastModified} className={classes.audioBoxWrapper}>
              <Box className={classes.indexBox}>{i + 1}</Box>
              <Box className={classes.inputAudio}>
                <Input
                  value={el.file.name}
                  className={classes.inputName}
                  label={t('audio_name')}
                />
                <AudioPlayer url={el.url} width={'100%'} />
              </Box>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsFirst}>
        {/* <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() =>
            downloadNumbers(
              [
                ...successAdded.map(el => ({ ...el, status: 'success' })),
                ...refusedAdded.map(el => ({ ...el, status: 'refused' })),
                ...errorAdded.map(el => ({ ...el, status: 'error' }))
              ],
              'output'
            )
          }
        >
          {t('see_detailed_output')}
        </Button> */}
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          onClick={() => handleClose()}
        >
          {`${t('done')}`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
