import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    boxShadow: 'none'
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
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
  wrapper: {
    fontFamily: 'MTN',
    fontSize: 16
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
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
    '& .menu-text': {
      minWidth: 100,
      '& span': {
        fontFamily: 'MTN',
        fontSize: 16
      }
    }
  },
  mainActive: {
    background: theme.palette.active.main
  },
  activeMenuItem: {
    background: theme.palette.active.main,
    '& .icon': {
      background: 'white'
    },
    '& .icon > svg': {
      color: `${theme.palette.primary.main} !important`
    },
    '& .menu-text': {
      '& span': {
        fontWeight: 600
      }
    }
  },
  subMenuItem: {
    MuiListItem: {
      root: {
        paddingTop: 4
      }
    }
  },
  activeSubMenuItem: {
    background: theme.palette.active.secondary
  },
  topLevelTitle: {
    display: 'flex',
    width: '100%',
    alignItems: 'center'
  },
  secondLevelTitle: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 34,
    '& > svg': {
      marginLeft: -3
    }
  },
  expandIcon: {
    color: `${theme.palette.active.blue} !important`
  },
  activeExpandIcon: {
    color: `${theme.palette.active.blue} !important`,
    transform: 'rotate(180deg)'
  },
  secondLevelItemText: {
    '& span': {
      fontFamily: 'MTN'
    }
  },
  activeSecondLevelItemText: {
    color: theme.palette.active.blue
  },
  thirdLevelItemText: {
    marginTop: 0,
    marginLeft: 43,
    '& span': {
      fontFamily: 'MTN',
      fontSize: 14
    }
  },
  activeThirdLevelItemText: {
    marginTop: 0,
    marginLeft: 43,
    '& span': {
      fontFamily: 'MTN',
      fontSize: 14,
      fontWeight: 'bold'
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
  }
}))

export default useStyles
