import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    background: 'rgba(196, 196, 196, 0.5)',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  displayBlock: {
    display: 'block',
    position: 'fixed',
    width: '100%',
    height: '100%'
  },
  displayNone: {
    display: 'none'
  },
  modalMainWrapper: {
    width: 651,
    height: 1024,
    background: theme.palette.active.main,
    position: 'c'
  }
}))
export default useStyles
