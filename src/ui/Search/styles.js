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
    height: 98,
    paddingLeft: 121,
    paddingRight: 55,
    paddingTop: 45,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 50
    },
    [theme.breakpoints.down(470)]: {
      paddingLeft: 20
    }
  },
  searchWrap: {
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
    boxShadow: '0px 4px 8px rgba(204, 204, 204, 0.25)',
    borderRadius: 3
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
    width: 25,
    height: 25,
    color: theme.palette.black
  },
  alertMessage: {
    color: theme.palette.grey40,
    fontSize: 12,
    marginTop: 7
  },
  noResultMessage: {
    background: theme.palette.active.main,
    paddingTop: 50,
    paddingLeft: 121,
    fontWeight: 600,
    fontSize: 16,
    [theme.breakpoints.down('xs')]: {
      paddingLeft: 50
    },
    [theme.breakpoints.down(470)]: {
      paddingLeft: 20
    }
  },
  tableContainer: {
    background: theme.palette.active.main,
    paddingTop: 60
  },
  headCell: {
    width: 200,
    fontWeight: 600,
    fontSize: 16,
    borderBottom: 'none',
    '&:first-child': {
      paddingLeft: 140,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 60
      },
      [theme.breakpoints.down(470)]: {
        paddingLeft: 30
      }
    }
  },
  bodyRow: {
    background: 'white'
  },
  bodyCell: {
    width: 200,
    borderBottom: 'none',
    '&:first-child': {
      paddingLeft: 140,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 60
      },
      [theme.breakpoints.down(470)]: {
        paddingLeft: 30
      }
    }
  }
}))

export default useStyles
