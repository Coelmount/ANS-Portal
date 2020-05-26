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
  addIconButton: {
    minWidth: 30,
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 8,
    padding: 0
  },
  addTitleWrap: {
    position: 'relative'
  },
  addCustomerTitle: {
    marginRight: 10,
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: 'MTN',
    fontWeight: 500,
    whiteSpace: 'nowrap'
  },
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
  addPopoverWrap: {
    width: 300,
    height: 150
  },
  addPopoverItem: {
    height: '33%',
    padding: 24,
    '&:nth-child(1)': {
      borderBottom: `1px solid ${theme.palette.active.main}`
    },
    '& > a': {
      textDecoration: 'none'
    }
  },
  body: {
    '&.MuiPaper-elevation2': {
      boxShadow: 'none'
    },
    backgroundColor: theme.palette.active.main
  }
}))

export default useStyles
