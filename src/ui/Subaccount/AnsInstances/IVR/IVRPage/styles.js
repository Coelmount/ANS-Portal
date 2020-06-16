import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  tabs: {
    padding: '0px 33px 0px 68px'
  },
  tab: {
    fontFamily: 'MTN',
    backgroundColor: 'white',
    borderRight: '0.5px solid #CCCCCC',
    textTransform: 'none',
    width: 216,
    color: '#212529'
  },
  lastTab: {
    fontFamily: 'MTN',
    backgroundColor: 'white',
    textTransform: 'none',
    width: 216,
    color: '#212529'
  },
  popper: {
    top: '42px !important',
    width: 216,
    border: '0.5px solid #CCCCCC',
    borderRadius: '0px 0px 3px 3px'
  }
}))

export default useStyles
