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
    color: theme.palette.grey40
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
  successClose: {
    position: 'absolute',
    right: '10px',
    top: '10px'
  },
  girdTitle: {
    marginTop: '36px',
    marginBottom: '12px',
    fontWeight: 600,
    fontSize: '16px'
  },
  entitlementsHeader: {
    height: '50px',
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  entitlementsHeaderNumber: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '14px',
    fontSize: '14px'
  },
  entitlementsHeaderName: {
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontSize: '18px',
    cursor: 'pointer'
  },
  entitlementsHeaderTotal: {
    fontSize: '16px'
  },
  entitlementsItemTitle: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0 8px 0',
    borderBottom: '0.5px solid #E8E8E8',
    height: '66px',
    fontSize: '16px'
  },
  entitlementsItemTotal: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0 8px 0',
    width: '50px',
    borderBottom: '0.5px solid #E8E8E8',
    height: '66px'
  },
  entitlementsItemInput: {
    width: '50px',
    '& .MuiOutlinedInput-root': {
      height: '50px'
    }
  },
  entitlementsGrid: {
    marginBottom: '24px'
  },
  entitlementsDialogContent: {
    padding: '8px 0'
  }
}))

export default useStyles
