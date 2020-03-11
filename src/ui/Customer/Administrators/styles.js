import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  breadcrumbsWrap: {
    paddingLeft: 62,
    paddingTop: 24,
    color: theme.palette.gray40
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  titleWrap: {
    display: 'flex',
    height: 91,
    alignItems: 'center',
    paddingLeft: 62,
    paddingRight: 34
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: '0.02em',
    color: theme.palette.black
  },
  addCustomerWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  addIconWrap: {
    width: 34,
    height: 34,
    background: theme.palette.primary.main,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  addIcon: {
    color: theme.palette.black
  },
  addCustomerTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  adminsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    background: theme.palette.active.main,
    padding: '50px 58px 0px 68px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      padding: '50px 10% 0px 10%'
    }
  },
  cardWrapper: {
    width: '30%',
    background: '#FFFFFF',
    boxShadow: '0px 4px 16px rgba(196, 196, 196, 0.5)',
    borderRadius: '3px',
    margin: '0px 15px 25px 0px',
    padding: '15px 0px',
    flexWrap: 'wrap',
    [theme.breakpoints.down(1298)]: {
      width: '40%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '80%'
    }
  },
  cardContentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  accountInfoWrapper: {
    width: '100%',
    minWidth: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  accountNameWrapper: {
    display: 'flex',
    marginLeft: 10,
    width: '40%',
    marginBottom: 15
  },
  accountNameIcon: { width: 20, height: 20 },
  accountName: {
    width: '60%',
    marginLeft: 15,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18
  },
  editDeleteButtonWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    width: '18%',
    marginBottom: 16,
    marginRight: 10
  },
  icon: {
    color: ' #00678F'
  },
  adminFullNameWrapper: {
    display: 'flex',
    marginLeft: 46,
    marginBottom: 10,
    alingItems: 'center'
  },
  adminFullName: {
    marginLeft: 5,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16
  },
  adminFullNameIcon: {
    marginTop: 3
  },
  languageWrapper: {
    display: 'flex',
    marginLeft: 46,
    alingItems: 'center'
  },
  language: {
    marginLeft: 5,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16
  },
  languageIcon: {
    marginTop: 3
  },
  deleteModal: {
    '& .MuiDialog-paperWidthSm': {
      width: 646,
      minHeight: 350,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: theme.shadows[5],
      outline: 'none',
      borderRadius: 3,
      background: theme.palette.active.main
    }
  },
  deleteHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 45,
    paddingRight: 40,
    height: 87,
    background: 'white'
  },
  deleteTitleBlock: {
    display: 'flex'
  },
  deleteTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 24,
    marginLeft: 14
  },
  closeIcon: {
    width: 26,
    height: 26,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  deleteMain: {
    height: 263,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '55px 0px 23px 0px'
  },
  deleteMainText: {
    width: 450,
    marginLeft: 10
  },
  boldText: {
    fontWeight: 'bold'
  },
  deleteButtonsBlock: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
  },
  deleteButtonWrap: {
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
  buttonTitle: {
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  iconWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    width: 27,
    height: 27,
    borderRadius: 20,
    background: theme.palette.active.main
  }
}))

export default useStyles
