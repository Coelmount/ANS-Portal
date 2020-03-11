import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  drawerPaper: {
    width: drawerWidth,
    borderRight: 'none',
    boxShadow: 'inset 0px 12px 24px rgba(196, 196, 196, 0.25)'
  },

  logo: {
    width: 77.4,
    height: 77.4,
    position: 'absolute',
    top: 80,
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -40%)',
    zIndex: 2
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 22,
    paddingTop: 14,
    paddingBottom: 14,
    '& .icon': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexShrink: 1,
      minWidth: 0,
      width: 27,
      height: 27,
      borderRadius: 20,
      background: theme.palette.active.main
    },
    '& > div > svg': {
      color: theme.palette.black
    },
    '& .menu-text': {
      minWidth: 100,
      marginLeft: 5,
      '& span': {
        fontFamily: 'MTN',
        fontSize: 16
      }
    }
  },
  activeMenuItem: {
    background: theme.palette.active.main,
    '& .icon': {
      background: 'white'
    },
    '& > div > svg': {
      color: `${theme.palette.primary.main} !important`
    },
    '& .menu-text': {
      '& span': {
        fontWeight: 600
      }
    }
  },
  iconImg: {
    width: 20,
    height: 20
  },
  toolbar: theme.mixins.toolbar,
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '66px',
    width: '100%',
    background: theme.palette.primary.main
  },
  headerBlock: {
    display: 'flex',
    marginLeft: 30,
    '& .MuiInput-underline:before': {
      display: 'none'
    },
    alignItems: 'center'
  },
  userIcon: {
    width: 22,
    height: 22,
    color: theme.palette.black
  },
  userName: {
    marginLeft: 8,
    color: theme.palette.black
  },
  expandMoreIcon: {
    color: theme.palette.black,
    marginLeft: 8
  },
  langBlock: {
    '& > div': {
      display: 'flex',
      alignItems: 'flex-end'
    },
    '& > svg': {
      top: 7,
      color: theme.palette.black
    },
    '& .MuiList-padding': {
      padding: 0
    }
  },
  langIcon: {
    marginRight: 6
  },
  listItem: {
    '& > MuiList-padding': {
      padding: 0
    },
    borderBottom: '1px solid #F9F9F9'
  },
  instancesIcon: {
    marginTop: 5
  }
}))

export default useStyles
