import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  wrap: {
    marginBottom: 20,
    marginTop: 20,
    display: 'flex'
  },
  buttonWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
    height: 22,
    marginTop: 2,
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    borderRadius: 3
  },
  buttonIcon: {
    width: 12,
    height: 16,
    color: theme.palette.active.blue
  },
  currentMonthTitle: {
    minWidth: 120,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    fontFamily: 'MTN'
  }
}))

export default useStyles
