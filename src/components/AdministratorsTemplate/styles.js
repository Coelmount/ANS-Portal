import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  adminsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    background: theme.palette.active.main,
    padding: '50px 58px 0px 68px',
    [theme.breakpoints.up(1250)]: {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      padding: '50px 10% 0px 10%'
    }
  },
  cardWrapper: {
    alignSelf: 'flex-start',
    width: '30%',
    height: 180,
    background: '#FFFFFF',
    boxShadow: '0px 4px 16px rgba(196, 196, 196, 0.5)',
    borderRadius: 3,
    margin: '0px 15px 25px 0px',
    padding: '15px 0px',
    flexWrap: 'wrap',
    [theme.breakpoints.down(1420)]: {
      width: '45%'
    },
    [theme.breakpoints.up(1250)]: {
      marginLeft: 10
    },

    [theme.breakpoints.down('sm')]: {
      width: '80%'
    },

    [theme.breakpoints.down('xs')]: {
      width: '100%'
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
    marginLeft: 14,
    width: '75%',
    marginBottom: 15,
    zIndex: 20,
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0
    }
  },
  accountNameIcon: { width: 20, height: 20 },
  accountName: {
    width: '60%',
    marginLeft: 15,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 18,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    '&:hover': {
      overflow: 'visible'
    }
  },
  editDeleteButtonWrapper: {
    alignSelf: 'flex-end',
    display: 'flex',
    width: '23%',
    marginBottom: 16,
    zIndex: 10
  },
  icon: {
    color: `${theme.palette.active.blue} !important`
  },
  editIcon: {
    color: theme.palette.active.blue,
    marginTop: 5,
    marginLeft: 5
  },
  adminFullNameWrapper: {
    display: 'flex',
    marginLeft: 56,
    marginBottom: 10,
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 46
    }
  },
  adminFullName: {
    marginLeft: 5,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16
  },
  languageWrapper: {
    display: 'flex',
    marginLeft: 56,
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 46
    }
  },
  language: {
    marginLeft: 5,
    fontFamily: 'Open Sans',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16
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
    background: theme.palette.active.main,
    marginRight: 8
  },
  buttonIconsWrapper: {
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    width: 27,
    height: 27,
    borderRadius: 20,
    marginRight: 8,
    paddingLeft: 1,
    cursor: 'pointer'
  },
  closeButtonIconWrapper: {
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    width: 27,
    height: 27,
    borderRadius: 20,
    marginLeft: 10,
    paddingLeft: 1,
    cursor: 'pointer'
  }
}))

export default useStyles
