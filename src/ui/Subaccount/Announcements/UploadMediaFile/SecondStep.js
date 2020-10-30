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

import CloseIcon from '@material-ui/icons/Close'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

import AnnouncementsStore from 'stores/Announcements'

import AudioPlayer from 'components/AudioPlayer'
import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'
import Loading from 'components/Loading'

const SecondStep = props => {
  const match = useParams()
  const { handleClose, t, announcements } = props
  const [isLoading, setIsLoading] = useState(false)
  const [stateAnnouncements, setStateAnnouncements] = useState([])

  const classes = useStyles()
  const { postAddAnnouncements } = AnnouncementsStore

  useEffect(() => {
    const tempAnnouncements = [...announcements]
    setStateAnnouncements(tempAnnouncements)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const changeName = (value, index) => {
    const newAnnouncements = [...stateAnnouncements]
    stateAnnouncements[index].name = value
    setStateAnnouncements(newAnnouncements)
  }

  const addAnnouncements = () => {
    const promiseArr = []
    stateAnnouncements.map(el =>
      promiseArr.push(
        postAddAnnouncements(match.customerId, match.groupId, {
          name: el.name,
          content: el.url.split(',')[1]
        })
      )
    )
    setIsLoading(true)
    Promise.all(promiseArr).finally(() => {
      setIsLoading(false)
      handleClose()
    })
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_announcements')}
        <IconButton
          aria-label='close'
          onClick={!isLoading && handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <div className={classes.helperTextWrap}>
              <ModalHelperText helperText='add_announcements_upload_media_file_step_2' />
            </div>
            <Box className={classes.secondStepTitleBlock}>
              {stateAnnouncements.map((el, i) => (
                <Box key={i} className={classes.audioBoxWrapper}>
                  <Box className={classes.indexBox}>{i + 1}</Box>
                  <Box className={classes.inputAudio}>
                    <Input
                      icon={<VolumeUpIcon />}
                      value={el.name}
                      label={t('audio_name')}
                      className={classes.inputName}
                      onChange={e => changeName(e.target.value, i)}
                    />
                    <Box className={classes.fakeInput}>
                      <Box className={classes.fakeInputLabel}>
                        {t('audio_content')}
                      </Box>
                      <AudioPlayer
                        url={el.url}
                        width={'100%'}
                        timerAlign='right'
                      />
                    </Box>
                  </Box>
                  <Box className={classes.sizeBox}>
                    {(el.size / 1024 / 1024).toFixed(2) + ' MB'}
                  </Box>
                </Box>
              ))}
            </Box>
          </React.Fragment>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
          disabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          disabled={isLoading}
          onClick={() => addAnnouncements()}
        >
          {`${t('add')}`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
