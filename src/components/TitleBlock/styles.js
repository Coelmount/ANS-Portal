import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  titleWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 75
  },
  leftTextWrap: {
    paddingRight: 20
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
  helperText: {
    fontSize: 14
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
