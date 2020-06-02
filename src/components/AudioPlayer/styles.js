import { makeStyles } from '@material-ui/core/styles'
import { flexbox } from '@material-ui/system'

const useStyles = makeStyles(theme => ({
  playerWrapper: {
    position: 'relative',
    width: '100%',
    height: 50
  },
  fakePlayerLayout: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    top: 0,
    left: 0
  },
  playerLayout: {
    height: '100%',
    display: 'flex'
  },
  seekBar: {
    width: '100%',
    cursor: 'pointer'
  },
  pauseIcon: {
    color: theme.palette.primary.main
  },
  playerBox: {
    width: '100%',
    marginLeft: 20,
    marginRight: 20
  },
  loadingIcon: {
    animation: '$rotateLoadingIcon 1.5s linear infinite'
  },
  '@keyframes rotateLoadingIcon': {
    '100%': { transform: 'rotate(360deg)' }
  },
  titleBox: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  timer: {
    marginLeft: 'auto'
  },
  seekTimer: {
    marginLeft: 20,
    width: 36
  },
  seekAndTimer: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
