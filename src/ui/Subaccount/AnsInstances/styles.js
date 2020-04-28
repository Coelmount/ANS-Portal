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
  mainWrap: {
    display: 'flex',
    background: theme.palette.active.main,
    padding: '0px 68px',
    [theme.breakpoints.down(1070)]: {
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: '50px 10% 0px 10%'
    },
    [theme.breakpoints.down(500)]: {
      justifyContent: 'center'
    }
  },
  instanceItemWrap: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    width: 136,
    height: 136,
    background: 'white',
    marginRight: 60,
    cursor: 'pointer',
    paddingBottom: 8,
    marginTop: 60,
    '& > p': {
      fontFamily: 'MTN'
    },
    [theme.breakpoints.down(500)]: {
      marginRight: 30
    }
  },
  iconWrap: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25,
    width: 55,
    height: 55,
    borderRadius: 60,
    background: 'white',
    boxShadow: '0px 8px 4px rgba(204, 204, 204, 0.25)'
  },
  labelTitle: {
    marginTop: 42
  },
  amountTitle: {
    fontSize: 21,
    fontWeight: 600,
    color: theme.palette.primary.main
  }
}))

export default useStyles
