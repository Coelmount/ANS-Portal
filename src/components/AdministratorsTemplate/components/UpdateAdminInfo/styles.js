import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  editInfo: {
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
  editInfoHeader: {
    width: '100%',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0,
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
  editInfoTitleWrapper: {
    display: 'flex'
  },
  editInfoTitle: {
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
    flex: 1
  },
  inputes: {
    marginTop: 30,
    marginLeft: 'calc(104px - 24px)'
  },
  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 45,
    paddingRight: 40,
    height: 87,
    background: 'white',
    width: '100%'
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
  editButtonWrap: {
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
  editButtonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  dialogContent: {
    padding: '8px 44px'
  }
}))
export default useStyles
