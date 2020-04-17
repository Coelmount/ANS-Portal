import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  mainWrap: {
    padding: '48px 68px',
    background: theme.palette.active.main
  },
  inputsWrap: {
    display: 'flex'
  },
  leftBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  rightBlock: {
    display: 'flex',
    flexDirection: 'column'
  },
  bottomInput: {
    marginTop: 31
  },
  arrowsIcon: {
    marginLeft: 60,
    marginRight: 60
  }
}))

export default useStyles
