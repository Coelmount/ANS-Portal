import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
import ReactPlayer from 'react-player'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import Slider from '@material-ui/core/Slider'

import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined'

import imgDrag from 'source/Imagine-dragons-warrior.mp3'

import Loading from 'components/Loading'

import useStyles from './styles'
import './styles'

const AudioRecorder = props => {
  const { t } = props
  const recordingTimeMS = 30000
  let preview = useRef(null)
  let recording = useRef(null)
  const [currentTime, setCurrentTime] = useState(0)

  const startRecording = (stream, lengthInMS) => {
    const recorder = new MediaRecorder(stream)
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
        preview.current.srcObject = stream
        preview.current.captureStream =
          preview.current.captureStream || preview.current.mozCaptureStream
      })
      .then(() =>
        startRecording(preview.current.captureStream(), recordingTimeMS)
      )
      .then(recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: 'audio/mpeg' })
        recording.current.src = URL.createObjectURL(recordedBlob)
      })
  }

  const handleStopRecord = () => {
    stop(preview.current.srcObject)
  }

  return (
    <React.Fragment>
      <Slider value={currentTime} min={0} max={30} step={0.001} />
      <Button onClick={() => handleStartRecord()}>Start</Button>
      <Button onClick={() => handleStopRecord()}>Stop</Button>
      <audio ref={preview} autoPlay controls></audio>
      <audio ref={recording} controls />
    </React.Fragment>
  )
}

export default withNamespaces()(AudioRecorder)
