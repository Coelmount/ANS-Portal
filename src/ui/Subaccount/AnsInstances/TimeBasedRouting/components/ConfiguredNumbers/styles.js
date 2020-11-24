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
  accessHeadCell: {
    width: 268,
    paddingLeft: 52,
    '& span': {
      fontSize: 16,
      fontWeight: 600
    }
  },
  accessNumberCell: {
    paddingLeft: '52px !important'
  },
  availableTitle: {
    color: theme.palette.secondary.main,
    fontSize: 14,
    cursor: 'pointer'
  },
  toolbarButtonsBlockWrap: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    marginRight: 40,
    marginLeft: 20
  },
  searchParamWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  searchParamsTitle: {
    fontFamily: 'MTN',
    fontSize: 14,
    marginLeft: 10
  },
  searchParamSelect: {
    position: 'absolute',
    top: 10,
    left: 10,
    background: 'white',
    '& div': {
      marginLeft: 5,
      fontSize: 14
    },
    '& svg': {
      color: theme.palette.active.blue,
      top: 6,
      right: 3
    },
    '&:before': {
      display: 'none'
    },
    '&:after': {
      display: 'none'
    }
  },
  selectItem: {
    fontSize: 14
  },
  toolbarConfigureWrap: {
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
  addIcon: {
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
  configureButton: {
    '& > span': {
      fontSize: 14
    }
  },
  searchInput: {
    paddingLeft: props => props.widthOffset
  }
}))

export default useStyles
