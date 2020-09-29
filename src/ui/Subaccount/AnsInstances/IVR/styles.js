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
  link: {
    cursor: 'pointer',
    '&.MuiLink-underlineHover:hover': { textDecoration: 'none' },
    fontSize: 14
  },
  rootEditSchedule: {
    '& .MuiDialog-paperWidthSm': {
      width: '650px'
    },
    '& .MuiDialog-paperScrollPaper': {
      height: 540
    }
  },
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 700,
      fontSize: '24px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '25px 44px'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 20,
    '& > span > svg': {
      width: 25,
      height: 25
    }
  },
  dialogContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  dialogActions: {
    height: '110px',
    justifyContent: 'space-between'
  },
  cancelButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  assignButton: {
    width: '160px',
    marginRight: '32px'
  },
  select: {
    width: 254
  },
  editSchedulesText: {
    marginBottom: 10,
    fontSize: 16,
    fontFamily: 'MTN',
    fontWeight: 500
  },
  tabs: {
    padding: '0px 34px 0px 68px',
    width: '100%',
    '& .MuiTabs-indicator': {
      height: 4
    },
    overflow: 'unset',
    '& .MuiTabs-scrollable': {
      overflowX: 'unset'
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
  editSchedulesWrap: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  helperTextWrap: {
    margin: '0px 20px'
  }
}))

export default useStyles
