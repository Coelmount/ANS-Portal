import React, { useState, useRef, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Slider from '@material-ui/core/Slider'

import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined'
import MicOffOutlinedIcon from '@material-ui/icons/MicOffOutlined'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import StopIcon from '@material-ui/icons/Stop'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

import Loading from 'components/Loading'
import Input from 'components/Input'

import AnnouncementsStore from 'stores/Announcements'

import useStyles from './styles'
import './styles'

const AudioRecorder = props => {
  const { t, handleClose } = props
  const classes = useStyles()
  const match = useParams()
  const recordingTimeMS = 30000
  let preview = useRef(null)
  let recording = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMediaAvalible, setIsMediaAvalible] = useState(true)
  const [isRecoding, setIsRecording] = useState('notStarted')
  const [recordedTime, setRecordedTime] = useState(0)
  const [playingTime, setPlayingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioName, setAudioName] = useState('')
  const [base64, setBase64] = useState('')
  const { postAddAnnouncements } = AnnouncementsStore

  const timer = setInterval(() => {
    setCurrentTime(preview.current ? preview.current.currentTime : 0)
  })

  const timerPlayingId = setInterval(() => {
    setPlayingTime(recording.current ? recording.current.currentTime : 0)
  })

  useEffect(() => {
    return () => {
      clearInterval(timer)
      clearInterval(timerPlayingId)
    }
  }, [])

  const startRecording = (stream, lengthInMS) => {
    const recorder = new MediaRecorder(stream)
    setIsRecording('recording')
    let data = []

    recorder.ondataavailable = event => data.push(event.data)
    recorder.start()

    const stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve
      recorder.onerror = event => reject(event.name)
    })

    const recorded = wait(lengthInMS).then(() => {
      recorder.state == 'recording' && recorder.stop()
    })

    return Promise.race([stopped, recorded]).then(() => data)
  }

  const stop = stream => {
    stream.getTracks().forEach(track => track.stop())
  }

  const wait = delayInMS => {
    return new Promise(resolve => setTimeout(resolve, delayInMS))
  }

  const handleStartRecord = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true
      })
      .then(stream => {
        setIsMediaAvalible(true)
        preview.current.srcObject = stream
        preview.current.captureStream =
          preview.current.captureStream || preview.current.mozCaptureStream
      })
      .then(() =>
        startRecording(preview.current.captureStream(), recordingTimeMS)
      )
      .then(recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: 'audio/mpeg' })
        let reader = new FileReader()
        reader.readAsDataURL(recordedBlob)
        reader.onloadend = () => {
          let base64data = reader.result
          setBase64(base64data)
        }
        recording.current.src = URL.createObjectURL(recordedBlob)
      })
      .catch(e => {
        setIsMediaAvalible(false)
      })
  }

  const handleStopRecord = () => {
    stop(preview.current.srcObject)
    setIsRecording('recorded')
    setRecordedTime(currentTime)
    clearInterval(timer)
  }

  const handleStartPlaying = () => {
    setIsPlaying(true)
    recording.current.play()
  }

  const handlePausePlaying = () => {
    setIsPlaying(false)
    recording.current.pause()
  }

  const seekTime = value => {
    setPlayingTime(value)
    recording.current.currentTime = value
  }

  const handleSaveRecord = () => {
    postAddAnnouncements(match.customerId, match.groupId, {
      name: audioName,
      content: base64
    }).then(() => handleClose())
  }

  return (
    <div className={classes.playerWraper}>
      {isRecoding === 'notStarted' &&
        (isMediaAvalible ? (
          <div className={classes.infoBox}>
            <div>Press button to start recording...</div>
            <Button
              className={classes.startRecord}
              onClick={() => handleStartRecord()}
              variant='contained'
              color='primary'
            >
              <MicNoneOutlinedIcon />
            </Button>
          </div>
        ) : (
          <div className={classes.infoBox}>
            <div>Please allow access to the device’s microphone</div>
            <MicOffOutlinedIcon className={classes.microDisabled} />
          </div>
        ))}
      {isRecoding === 'recording' && (
        <React.Fragment>
          <div className={classes.audioNameWrapper}></div>
          <div className={classes.playerBox}>
            <Slider
              max={30}
              min={0}
              value={currentTime}
              color={'secondary'}
              className={classes.slider}
            />
            <div className={classes.limitTime}>
              <div>{`00:${
                currentTime.toFixed() < 10
                  ? '0' + currentTime.toFixed()
                  : currentTime.toFixed()
              }`}</div>
              <div></div>
            </div>
          </div>
          <div className={classes.stopWrapper}>
            <Button
              className={classes.stopRecord}
              onClick={() => handleStopRecord()}
              variant='contained'
              color='primary'
            >
              <StopIcon />
            </Button>
            <div>{`00:${
              currentTime.toFixed() < 10
                ? '0' + currentTime.toFixed()
                : currentTime.toFixed()
            }`}</div>
          </div>
        </React.Fragment>
      )}
      {isRecoding === 'recorded' && (
        <React.Fragment>
          <div className={classes.audioNameWrapper}>
            <Input
              onChange={e => setAudioName(e.target.value)}
              label={t('audio_name')}
              icon={<VolumeUpIcon />}
            ></Input>
          </div>
          <div className={classes.playerBox}>
            <Slider
              max={recordedTime.toFixed()}
              min={0}
              value={playingTime.toFixed()}
              step={1}
              onChange={(e, newValue) => {
                let time = newValue
                seekTime(parseFloat(time))
              }}
              color={'secondary'}
              className={classes.slider}
            />
            <div className={classes.playingTime}>
              <div>{`00:${
                playingTime.toFixed() < 10
                  ? '0' + playingTime.toFixed()
                  : playingTime.toFixed()
              }`}</div>
              <div>{`00:${
                recordedTime.toFixed() < 10
                  ? '0' + recordedTime.toFixed()
                  : recordedTime.toFixed()
              }`}</div>
            </div>
          </div>
          <div className={classes.playerControls}>
            <Button
              className={classes.playPauseBotton}
              onClick={() => {
                isPlaying ? handlePausePlaying() : handleStartPlaying()
              }}
              variant='contained'
              color='primary'
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.saveButton}
              disabled={!(audioName && base64)}
              onClick={handleSaveRecord}
            >
              {t('save')}
            </Button>
          </div>
        </React.Fragment>
      )}
      <audio ref={preview} autoPlay muted></audio>
      <audio ref={recording} />
    </div>
  )
}

export default withNamespaces()(AudioRecorder)
