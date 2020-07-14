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
    padding: '0px 34px 0px 68px',
    width: '100%',
    '& .MuiTabs-indicator': {
      height: 4
    },
    overflow: 'unset',
    '& .MuiTabs-scrollable': {
      overflow: 'unset'
    }
  },
  tab: {
    fontFamily: 'MTN',
    backgroundColor: 'white',
    borderRight: '0.5px solid #CCCCCC',
    textTransform: 'none',
    width: 'calc(100% / 5)',
    color: '#212529',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  lastTab: {
    fontFamily: 'MTN',
    backgroundColor: 'white',
    textTransform: 'none',
    width: 'calc(100% / 5)',
    color: '#212529',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  popper: {
    width: 'calc(100% / 5)',
    border: '0.5px solid #CCCCCC',
    borderRadius: '0px 0px 3px 3px'
  },
  displayNone: {
    display: 'none'
  },
  ivrMenuLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}))

export default useStyles
