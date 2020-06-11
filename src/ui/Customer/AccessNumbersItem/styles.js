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
  textCenterBlue: {
    color: theme.palette.active.blue,
    textAlign: 'center'
  },
  textCenter: {
    textAlign: 'center'
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  headCellWithCustomButtons: {
    display: 'flex',
    alignItems: 'center'
  },
  assignedDoneIcon: {
    color: theme.palette.active.blue
  },
  customPhoneNumberHeadIconWrap: ({ isDisconnectAll }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginLeft: 11,
    background: isDisconnectAll ? theme.palette.primary.main : 'white',
    borderRadius: 100,
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    cursor: 'pointer'
  }),
  customSubaccountHeadIconWrap: ({ isDeassignAll }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginLeft: 11,
    background: isDeassignAll ? theme.palette.primary.main : 'white',
    borderRadius: 100,
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    cursor: 'pointer'
  }),
  toolbarButtonsBlockWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 40,
    marginLeft: 40
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  mainIconWrap: {
    background: theme.palette.primary.main,
    width: 30,
    height: 30,
    padding: 0,
    marginRight: 8,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  disabledButton: {
    backgroundColor: theme.palette.lightGrey,
    '&:hover': {
      backgroundColor: theme.palette.lightGrey,
      cursor: 'auto'
    }
  },
  tableIconWrap: {
    padding: 0,
    width: 30,
    height: 30,
    marginLeft: 11
  },
  btnBack: {
    background: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  disconnectIcon: {
    width: 14,
    height: 16
  },
  deassignIcon: {
    width: 20,
    height: 20,
    marginRight: 2
  },
  assignIcon: {
    width: 19,
    height: 19,
    marginLeft: 2
  },
  iconTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  disabledIconTitle: {
    opacity: 0.5
  },
  checkbox: {
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    width: '18px',
    height: '18px',
    marginRight: '9px',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    },
    '& .MuiIconButton-root': {
      padding: 0
    }
  },
  headCheckbox: {
    marginLeft: 5,
    marginBottom: 2
  },
  checkboxCell: {
    width: 85,
    paddingLeft: `20px !important`,
    '& > div': {
      marginLeft: 4
    }
  },
  indexHoverCheckbox: {
    marginLeft: 3
  },
  inUseTitle: {
    color: theme.palette.active.blue
  },
  avaliableTitle: {
    color: theme.palette.lightGreen
  },
  //delete cell without icon
  deleteCustomerIcon: {
    width: 20,
    height: 20,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  deleteCell: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: '38px !important'
  },
  deassignWrap: {
    marginLeft: 30
  },
  extraTitleWrap: {
    marginRight: 45
  },
  boldDeassignText: {
    fontWeight: 600
  },
  linkTitle: {
    color: theme.palette.active.blue,
    fontSize: 14,
    cursor: 'pointer'
  },
  subaccountCell: {
    display: 'flex',
    alignItems: 'center'
  },
  subaccountTitle: {
    // marginRight: 25,
    fontSize: 14,
    minWidth: 140
  },
  phoneTitle: {
    // marginRight: 25,
    fontSize: 14,
    minWidth: 160
  },
  deleteLoading: {
    width: '20px !important',
    height: '20px !important',
    marginLeft: 5
  },
  tableRow: {
    '& > th': {
      height: 50
    }
  },
  phoneNumberHeadCell: {
    padding: 0,
    '& p': {
      fontSize: 16,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      minWidth: 160
    }
  },
  subaccountHeadCell: {
    padding: 0,
    '& p': {
      fontSize: 16,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      minWidth: 140
    }
  }
}))

export default useStyles
