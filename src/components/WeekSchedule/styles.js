import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    boxShadow: 'none'
  },
  popoverWrap: {
    width: 134,
    height: 86,
    cursor: 'pointer'
  },
  popoverButtonWrap: {
    display: 'flex',
    alignItems: 'center',
    height: 43,
    paddingLeft: 27,
    '&:first-child': {
      borderBottom: `1px solid ${theme.palette.active.main}`
    },
    '&:hover': {
      background: theme.palette.veryLightGrey
    }
  },
  popoverIcon: {
    marginRight: 10
  },
  popoverLabel: {
    fontSize: 14,
    fontFamily: 'MTN',
    color: theme.palette.black
  }
}))

export default useStyles
