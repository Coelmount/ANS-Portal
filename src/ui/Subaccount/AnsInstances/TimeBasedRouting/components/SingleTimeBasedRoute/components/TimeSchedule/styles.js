import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none',
    background: theme.palette.active.main
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  addButtonWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  disabledAddButtonWrap: {
    opacity: 0.5,
    '& > span': {
      background: theme.palette.lightGrey
    }
  },
  updateWrap: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 30
  },
  deleteBlockWrap: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 50
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
  activeIcon: {
    background: theme.palette.primary.main
  },
  disabledIcon: {
    backgroundColor: theme.palette.lightGrey
  },
  addIcon: {
    color: theme.palette.black
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
  disabledText: {
    opacity: 0.5
  },
  deleteIcon: {
    width: 14,
    height: 16
  },
  numbersWrap: {
    display: 'flex'
  },
  rightArrowIcon: {
    marginRight: 31,
    marginLeft: 31
  },
  numbersAmount: {
    marginLeft: 10
  },
  numbersTitle: {
    fontSize: 14,
    fontWeight: 600
  },
  toolbarWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15
  },
  toolbarLabel: {
    fontSize: 16,
    fontWeight: 600
  },
  checkbox: {
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    height: '18px',
    marginLeft: '2px',
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
  accessNumberText: {
    color: theme.palette.active.blue,
    fontSize: 14,
    letterSpacing: '0.05em'
  },
  destinationNumberText: {
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: '0.05em'
  },
  accessNumberCell: {
    paddingLeft: '52px !important'
  },
  accessHeadCell: {
    width: 268,
    paddingLeft: 52,
    '& span': {
      fontSize: 16,
      fontWeight: 600
    }
  },
  switchCell: {
    paddingLeft: '46px !important'
  },
  switchBase: {
    color: 'white',
    '&$checked': {
      color: 'white'
    },
    '&$checked + $track': {
      color: 'white',
      background: theme.palette.primary.main,
      opacity: 1
    }
  },
  track: {
    background: 'grey'
  },
  checked: {},
  upArrowIcon: {
    position: 'absolute',
    right: -14,
    top: -3,
    color: theme.palette.active.blue
  },
  downArrowIcon: {
    position: 'absolute',
    right: -14,
    top: 5,
    color: theme.palette.active.blue
  },
  addCustomerTitle: {
    marginRight: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'MTN',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
  addTitleWrap: {
    position: 'relative'
  },
  addPopoverWrap: {
    width: 268,
    height: 101
  },
  addPopoverItem: {
    height: '50%',
    paddingLeft: 30,
    '&:nth-child(1)': {
      borderBottom: `1px solid ${theme.palette.active.main}`
    },
    '& > a': {
      textDecoration: 'none'
    }
  },
  addPopoverItemText: {
    color: theme.palette.black
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
    alignItems: 'center',
    height: '63px !important'
  },
  toolbarButton: {
    width: 30,
    height: 30,
    minWidth: 30,
    marginRight: 8,
    borderRadius: 100,
    padding: '6px 15px'
  },
  updateIcon: {
    width: 18,
    height: 18
  },
  titleWrap: {
    display: 'flex'
  },
  titleNotification: {
    padding: 23,
    marginRight: 9,
    fontSize: 14,
    background: 'white',
    border: `0.5px solid ${theme.palette.silver}`,
    boxShadow:
      '0px 4px 8px rgba(204, 204, 204, 0.25), inset 0px 2px 4px rgba(204, 204, 204, 0.25)',
    borderRadius: 3
  },
  notificationIcon: {
    marginRight: 5
  },
  deleteName: {
    fontWeight: 'bold'
  },
  editButtonWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    marginLeft: 11,
    background: 'white',
    borderRadius: 100,
    boxShadow: '0px 4px 4px rgba(204, 204, 204, 0.25)',
    cursor: 'pointer'
  },
  defaultDestinationWrap: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
    borderBottom: '1px solid #E8E8E8'
  },
  pageViewWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 21
  },
  blockLabel: {
    fontSize: 14,
    fontWeight: 600,
    marginRight: 10
  },
  pageViewIconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    border: '0.5px solid #CCCCCC',
    borderRadius: 3,
    marginLeft: 15,
    marginRight: 5,
    cursor: 'pointer'
  },
  inputWrap: {
    width: 250
  },
  colorCell: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 10
  },
  pageViewBlock: {
    display: 'flex',
    alignItems: 'center'
  }
}))

export default useStyles
