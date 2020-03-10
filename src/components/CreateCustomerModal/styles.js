import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  sharpIcon: {
    textAlign: 'center'
  },
  title: {
    '& > *': {
      fontFamily: 'MTN',
      fontWeight: 500,
      fontSize: '30px',
      color: theme.palette.black
    },
    height: '90px',
    padding: '20px 24px'
  },
  closeButton: {
    position: 'absolute',
    right: '10px'
  },
  stepStyles: {
    marginTop: '32px',
    marginLeft: 'calc(40px - 24px)',
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '16px',
    color: theme.palette.gray40
  },
  paragraphBox: {
    marginTop: '19px',
    marginLeft: 'calc(88px - 24px)',
    fontFamily: 'MTN',
    fontWeight: 500,
    fontSize: '18px',
    color: theme.palette.black
  },
  inputes: {
    marginTop: '30px',
    marginLeft: 'calc(104px - 24px)'
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  dialogActionsFirst: {
    height: '110px'
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between'
  },
  zipCityRow: {
    marginTop: '30px',
    marginLeft: 'calc(104px - 24px)',
    display: 'flex'
    //width: '392px'
  },
  zip: {
    width: '35%',
    marginRight: '16px'
  },
  city: {
    width: '47%'
  },
  boxOfButtons: {
    paddingRight: '40px',
    paddingLeft: '40px',
    marginBottom: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  leftButtonFromSP: {
    width: '180px',
    color: theme.palette.black
  },
  rigthButtonFromSP: {
    width: '180px'
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
    marginBottom: '28px'
  },
  successTitle: {
    fontFamily: 'MTN',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  successInfo: {
    fontSize: '16px',
    textAlign: 'center'
  },
  successClose: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  }
}))

export default useStyles
