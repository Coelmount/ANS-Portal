import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'

import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined'
import LoopIcon from '@material-ui/icons/Autorenew'

import useStyles from './styles'
import './styles.css'

const AudioPlayer = props => {
  const {
    t,
    tReady,
    i18nOptions,
    defaultNS,
    reportNS,
    name,
    getAnnouncement,
    titleComponent,
    isLoading,
    timerAlign,
    ...propsRP
  } = props
  const classes = useStyles()
  const [playing, setPlaying] = useState(false)
  const [seeking, setSeeking] = useState(false)
  const [played, setPlayed] = useState(0)
  const [playbackRate] = useState(1)
  const [loadedSeconds, setLoadedSeconds] = useState(0)

  let player = null
  const handleSeekMouseDown = e => {
    setSeeking(true)
  }
  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value))
  }
  const handleSeekMouseUp = e => {
    setSeeking(false)
    player.seekTo(parseFloat(e.target.value))
  }

  const ref = refPlayer => {
    player = refPlayer
  }

  const getTimer = () => {
    return `${Math.trunc(loadedSeconds / 60)}:${
      Math.trunc(loadedSeconds - Math.trunc(loadedSeconds / 60) * 60) < 10
        ? '0' + Math.trunc(loadedSeconds - Math.trunc(loadedSeconds / 60) * 60)
        : Math.trunc(loadedSeconds - Math.trunc(loadedSeconds / 60) * 60)
    }`
  }

  const handleProgress = state => {
    setLoadedSeconds(state.loadedSeconds - state.playedSeconds)
    if (!seeking) {
      setPlayed(state.played)
    }
  }

  const handleEnded = () => {
    setPlaying(false)
    setPlayed(0)
  }

  return (
    <div className={classes.playerWrapper}>
      <ReactPlayer
        ref={ref}
        {...propsRP}
        playing={playing}
        className={classes.playerLayout}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={duration => setLoadedSeconds(duration)}
        onEnded={handleEnded}
      />
      <div className={classes.fakePlayerLayout}>
        {isLoading ? (
          <IconButton
            onClick={() => {
              setPlaying(!playing)
            }}
          >
            <LoopIcon className={classes.loadingIcon} />
          </IconButton>
        ) : playing ? (
          <IconButton
            onClick={() => {
              setPlaying(false)
            }}
          >
            <PauseCircleOutlineOutlinedIcon className={classes.pauseIcon} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              !propsRP.url && getAnnouncement && getAnnouncement()
              setPlaying(true)
            }}
          >
            <PlayCircleOutlineOutlinedIcon />
          </IconButton>
        )}

        <div className={classes.playerBox}>
          <div className={classes.titleBox}>
            {titleComponent}
            {timerAlign === 'top' && (
              <div className={classes.timer}>
                {loadedSeconds ? getTimer() : null}
              </div>
            )}
          </div>
          <div className={classes.seekAndTimer}>
            <input
              disabled={!propsRP.url}
              className={classes.seekBar}
              type='range'
              min={0}
              max={0.9999}
              step='any'
              value={played}
              onMouseDown={handleSeekMouseDown}
              onChange={handleSeekChange}
              onMouseUp={handleSeekMouseUp}
            />
            {timerAlign === 'right' && (
              <div className={classes.seekTimer}>
                {loadedSeconds ? getTimer() : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

AudioPlayer.propTypes = {
  timerAlign: PropTypes.string
}

AudioPlayer.defaultProps = {
  timerAlign: 'top'
}

export default withNamespaces()(AudioPlayer)
