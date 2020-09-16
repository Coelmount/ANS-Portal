import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import CloseIcon from '@material-ui/icons/Close'
import uploadIcon from 'source/images/svg/upload.svg'

import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const FirstStep = props => {
  const { handleClose, setStep, t, setAnnouncements } = props

  const classes = useStyles()

  const importFile = e => {
    const target = e.target
    let promiseArr = []
    let newAnnouncements = []
    for (let i = 0; i < target.files.length; i++) {
      const file = target.files[i]
      promiseArr.push(
        readFile(target.files[i]).then(res => {
          newAnnouncements.push({
            lastModified: file.lastModified,
            size: file.size,
            url: res,
            name: file.name
          })
          setAnnouncements(newAnnouncements)
        })
      )
    }
    Promise.all(promiseArr).finally(() => setStep(2))
  }

  const readFile = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
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
        <Box className={classes.helperTextContainer}>
          <ModalHelperText helperText='add_announcements_upload_media_file_step_1' />
        </Box>
        <Box className={classes.uploadBoxWrapper}>
          <Box className={classes.uploadFileTitle}>
            {t('upload_announcement')}
          </Box>
          <Box>
            <input
              className={classes.uploadInput}
              id='contained-button-file'
              type='file'
              accept='audio/mpeg, audio/vnd.wav, video/x-ms-wma'
              onChange={importFile}
              multiple
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
          <Box className={classes.uploadFileInfo}>
            {t('upload_announcement_info')}
          </Box>
        </Box>
      </DialogContent>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
