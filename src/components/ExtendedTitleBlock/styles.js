import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    height: 75,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  leftBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  title: {
    flex: '1 1 100%',
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: 24,
    letterSpacing: '0.02em',
    color: theme.palette.black,
    marginRight: 10
  },
  leftIconWrap: {
    boxShadow: '0px 2px 4px rgba(196, 196, 196, 0.25)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    minWidth: 0,
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 8,
    paddingLeft: 1,
    cursor: 'pointer'
  },
  rightBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  iconWrap: {
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
  rightBlockTitle: {
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontFamily: 'MTN',
    fontStyle: 'normal',
    fontWeight: 500
  }
}))

export default useStyles
