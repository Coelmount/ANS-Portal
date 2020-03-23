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
  titleWrap: {
    display: 'flex',
    height: 91,
    alignItems: 'center'
  },
  titleSearchIcon: {
    width: 25,
    height: 25,
    marginRight: 16
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
  mainWrap: {
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.active.main,
    // alignItems: 'center',
    height: 98,
    paddingLeft: '9.4%',
    paddingRight: 55,
    paddingTop: 45
  },
  searchWrap: {
    paddingLeft: 121,
    background: theme.palette.active.main
  },
  searchContent: {
    position: 'relative',
    width: 362
  },
  searchInput: {
    width: 362,
    height: 50,
    padding: '0px 19px',
    border: 'none',
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)'
  },
  searchIconWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 3,
    marginTop: 1,
    width: 74,
    height: 48,
    background: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchIcon: {
    // top: 15,
    // right: 20,
    width: 25,
    height: 25,
    color: theme.palette.black
  }
}))

export default useStyles
