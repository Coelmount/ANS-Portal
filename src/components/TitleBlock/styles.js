import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  titleWrap: {
    display: 'flex',
    height: 91,
    alignItems: 'center',
    paddingLeft: 62,
    paddingRight: 34
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 30,
    letterSpacing: '0.02em',
    color: theme.palette.black
  },
  addCustomerWrap: {
    display: 'flex',
    alignItems: 'center'
  },
  addIconWrap: {
    width: 34,
    height: 34,
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
  }
}))

export default useStyles
