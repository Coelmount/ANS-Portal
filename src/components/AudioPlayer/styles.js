import { makeStyles } from '@material-ui/core/styles'

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
    paddingLeft: 20,
    paddingRight: 20
  }
}))

export default useStyles
