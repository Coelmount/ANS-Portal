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

  addCustomerWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  addIconWrap: {
    width: 30,
    height: 30,
    background: theme.palette.primary.main,
    borderRadius: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    '&:hover': {
      cursor: 'pointer'
    },
    color: theme.palette.black
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
  deleteIcon: {
    width: 14,
    height: 16
  },
  rightArrowIcon: {
    marginRight: 31,
    marginLeft: 31
  },
  numbersAmount: {
    marginLeft: 10
  },
  toolbarWrap: {
    padding: '30px 33px 30px 68px',
    height: 'auto'
  },
  toolbarButtonsBlockWrap: {
    display: 'flex',
    width: '100%',
    marginRight: 10
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
  assignedTitle: {
    color: theme.palette.active.blue,
    fontSize: 14
  },
  availableTitle: {
    color: theme.palette.lightGreen,
    fontSize: 14
  },
  numberPhoneNumbersStoresAmount: {
    marginLeft: 12,
    fontSize: 14
  },
  countryNameColumn: {
    whiteSpace: 'nowrap',
    fontSize: 16
  },
  numbersWrap: {
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    display: 'flex'
  },
  rangeEndColumn: {
    maxWidth: 200
  },
  typeColumn: {
    width: 150,
    fontSize: 14
  },
  numbersTitle: {
    fontSize: 14,
    fontWeight: 600
  },
  deleteCustomerIcon: {
    width: 20,
    height: 20,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  deleteCell: {
    paddingRight: '38px !important',
    display: 'flex',
    alignItems: 'center'
  },
  statusCell: {
    '& > a': {
      textDecoration: 'none'
    }
  },
  filterChipsWrap: {
    marginRight: 25,
    '& > div': {
      marginRight: 10
    }
  },
  ////////////////
  subaccountHeadCell: {
    width: 200,
    padding: 0,
    '& span': {
      fontSize: 16,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      minWidth: 140
    }
  },
  deassignIcon: {
    width: 30,
    height: 20,
    marginRight: 2,
    cursor: 'pointer'
  },
  customSubaccountHeadIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginLeft: 11,
    borderRadius: 100,
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    cursor: 'pointer'
  },
  headCellInsideWrap: {
    display: 'flex'
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
  tableIconWrap: {
    padding: 0,
    width: 30,
    height: 30,
    //marginLeft: 11,
    opacity: 0.3
  },
  tableIconHeaderWrap: {
    padding: 0,
    width: 30,
    height: 30,
    minWidth: 30
  },
  btnBack: {
    background: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main
    }
  },
  enabledColumnButton: {
    opacity: 1
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  deassignWrap: {
    marginLeft: 30
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
  iconTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  },
  disabledButton: {
    backgroundColor: theme.palette.lightGrey,
    '&:hover': {
      backgroundColor: theme.palette.lightGrey,
      cursor: 'auto'
    }
  },
  deleteLoading: {
    width: '20px !important',
    height: '20px !important',
    marginLeft: 6
  }
}))

export default useStyles
