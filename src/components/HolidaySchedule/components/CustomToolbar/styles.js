import { makeStyles } from '@material-ui/core/styles/'

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  changeMonthWrap: {
    display: 'flex'
  },
  currentButton: {
    marginLeft: 36,
    padding: '3px 22px',
    border: `1.5px solid ${theme.palette.active.blue}`,
    borderRadius: 2,
    cursor: 'pointer'
  },
  currentButtonTitle: {
    fontFamily: 'MTN'
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
    minWidth: 160,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 18,
    fontFamily: 'MTN'
  }
}))

export default useStyles
