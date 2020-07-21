import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  titleWrap: {
    display: 'flex',
    height: 75,
    alignItems: 'center'
  },
  title: {
    flex: '1 1 100%',
    marginTop: 5,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: '0.02em',
    color: theme.palette.black
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
  iconButton: {
    width: 30,
    minWidth: 30,
    height: 30,
    marginRight: 8,
    padding: 0
  }
}))

export default useStyles
