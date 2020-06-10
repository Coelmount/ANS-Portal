import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  successClose: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  successDialog: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ' space-between',
    alignItems: 'center'
  },
  successBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    marginRight: '94px',
    marginLeft: '94px'
  },
  successIconBox: {
    marginBottom: '28px',
    marginTop: '125px'
  },
  successTitle: {
    whiteSpace: 'nowrap',
    fontFamily: 'MTN',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  successInfo: {
    fontSize: '16px',
    textAlign: 'center'
  },
  boxOfButtons: {
    paddingRight: '40px',
    paddingLeft: '40px',
    marginBottom: '22px',
    marginTop: '133px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  button: {
    minWidth: '224px',
    '& a': {
      textDecoration: 'none',
      color: theme.palette.black
    }
  }
}))

export default useStyles
