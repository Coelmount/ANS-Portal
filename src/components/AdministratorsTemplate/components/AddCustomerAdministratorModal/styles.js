import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  createAdminModal: {
    '& .MuiDialog-paperWidthSm': {
      width: 646,
      minHeight: '100%',
      display: 'flex',
      margin: '0 auto 50px',
      flexDirection: 'column',
      boxShadow: theme.shadows[5],
      outline: 'none',
      borderRadius: 3,
      background: theme.palette.active.main
    }
  },
  addAdminHeader: {
    width: '100%',
    padding: '16px 0 0 0',
    '& .MuiTypography-h6': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 45,
      paddingRight: 40,
      height: 87,
      background: 'white'
    }
  },
  addAdminTitleWrapper: {
    display: 'flex'
  },
  addAdminTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24
  },
  closeIcon: {
    width: 26,
    height: 26,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  loginTitleWrapper: {
    paddingTop: 48,
    paddingLeft: 69
  },
  loginTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18
  },
  inputsWrapper: {
    flex: 1,
    paddingBottom: 90
  },
  inputes: {
    marginTop: '30px',
    marginLeft: 'calc(104px - 24px)',
    '&:nth-child(1)': {
      display: 'flex',
      position: 'relative'
    }
  },
  maskInput: {
    position: 'absolute',
    background: '#eee',
    left: 309,
    top: 0,
    height: 52,
    display: 'flex',
    alignItems: 'center',
    marginTop: 2,
    borderLeft: '1px solid grey',
    paddingLeft: 14,
    paddingRight: 14
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: 45,
    paddingRight: 40,
    height: 87,
    background: 'white'
  },
  cancelButtonWrap: {
    width: 140,
    height: 50,
    background: 'white',
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.primary.main}`,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  addButtonWrap: {
    width: 140,
    height: 50,
    background: theme.palette.primary.main,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30,
    '&:hover': {
      backgroundColor: '#FEDF63',
      boxShadow: '0px 6px 5px rgba(204,204,204,0.25)',
      cursor: 'pointer'
    }
  },
  addButtonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  addButtonDisablesWrap: {
    opacity: 0.5,
    width: 140,
    height: 50,
    background: theme.palette.primary.main,
    borderRadius: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    marginRight: 30
  },
  dialogActionsSecond: {
    height: '110px',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  backButton: {
    width: '160px',
    marginLeft: '32px',
    color: theme.palette.black
  },
  nextButton: {
    width: '160px',
    marginRight: '32px'
  },
  dialogContent: {
    padding: '8px 44px'
  }
}))
export default useStyles
