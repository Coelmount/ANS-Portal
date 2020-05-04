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
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  },
  addCustomerWrap: {
    display: 'flex',
    alignItems: 'center'
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
  addIcon: {
    color: theme.palette.black
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
  toolbarButtonsBlockWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 40,
    marginLeft: 40
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
    paddingBottom: 19,
    '& > span': {
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
    marginTop: 7,
    color: theme.palette.black,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  deleteCell: {
    paddingRight: '38px !important'
  }
}))

export default useStyles
