import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  playerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  playerBox: {
    marginTop: 40,
    width: 540,
    height: 190,
    background: 'white',
    boxShadow: '0px 4px 16px rgba(196, 196, 196, 0.25)',
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  slider: {
    width: 426,
    height: 4,
    borderRadius: 3
  },
  startRecord: {
    marginTop: 30,
    minWidth: 44,
    width: 44,
    height: 44,
    padding: 0,
    borderRadius: 100
  },
  microDisabled: {
    marginTop: 30,
    height: 30,
    width: 30
  },
  infoBox: {
    marginTop: 270,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  limitTime: {
    width: 426,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  stopRecord: {
    minWidth: 30,
    width: 30,
    height: 30,
    padding: 0,
    borderRadius: 100,
    color: 'black'
  },
  stopWrapper: {
    marginTop: 48,
    display: 'flex',
    alignItems: 'center',
    width: 140,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'space-evenly'
  },
  playingTime: {
    width: 426,
    display: 'flex',
    justifyContent: 'space-between'
  },
  playerControls: {
    display: 'flex',
    marginTop: 48,
    width: 540,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  saveButton: {
    width: 140
  },
  playPauseButton: {
    minWidth: 44,
    width: 44,
    height: 44,
    padding: 0,
    backgroundColor: 'white',
    borderRadius: 100,
    boxShadow: '0px 4px 16px rgba(196, 196, 196, 0.25)'
  },
  audioNameWrapper: {
    height: 40,
    marginTop: 80
  }
}))

export default useStyles
