import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { withNamespaces } from 'react-i18next'

import IconButton from '@material-ui/core/IconButton'

import Slider from '@material-ui/core/Slider'

import PlayCircleOutlineOutlinedIcon from '@material-ui/icons/PlayCircleOutlineOutlined'
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined'

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
    ...propsRP
  } = props
  const classes = useStyles()
  const [playing, setPlaying] = useState(false)
  const [seeking, setSeeking] = useState(false)
  const [played, setPlayed] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)

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

  const load = url => {
    this.setState({
      url,
      played: 0
      //loaded: 0,
      //pip: false
    })
  }

  const handleProgress = state => {
    if (!seeking) {
      setPlayed(state.played)
    }
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
      />
      <div className={classes.fakePlayerLayout}>
        <IconButton
          onClick={() => {
            getAnnouncement && getAnnouncement()
            setPlaying(!playing)
          }}
        >
          {playing ? (
            <PauseCircleOutlineOutlinedIcon className={classes.pauseIcon} />
          ) : (
            <PlayCircleOutlineOutlinedIcon />
          )}
        </IconButton>
        <div className={classes.playerBox}>
          {titleComponent}
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
        </div>
      </div>
    </div>
  )
}

export default withNamespaces()(AudioPlayer)
