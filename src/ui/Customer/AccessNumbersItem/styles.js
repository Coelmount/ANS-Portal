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
  customHeadIconWrap: {
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
  toolbarButtonsBlockWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    marginRight: 40,
    marginLeft: 40
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
    color: theme.palette.black,
    opacity: 0.5,
    '&:hover': {
      cursor: 'pointer'
    }
  },
  enabledButton: {
    opacity: 1
  },
  deleteIcon: {
    width: 14,
    height: 16
  },
  assignIcon: {
    width: 19,
    height: 19,
    marginLeft: 2
  },
  addCustomerTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
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
    paddingTop: 11,
    paddingRight: '38px !important'
  },
  deassignWrap: {
    marginLeft: 30
  },
  extraTitleWrap: {
    marginRight: 45
  },
  disconnectIcon: {
    width: 19,
    height: 19,
    marginRight: 1
  },
  boldDeassignText: {
    fontWeight: 600
  }
}))

export default useStyles
