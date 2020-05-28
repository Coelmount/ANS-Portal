import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  playerWrapper: {
    position: 'relative',
    width: 650,
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
    marginLeft: 20,
    marginRight: 20,
    '& .MuiSlider-rail': {
      height: 6
    },
    '& .MuiSlider-thumb': {
      marginTop: -3
    },
    '& .MuiSlider-track': {
      height: 6
    }
  }
}))

export default useStyles
