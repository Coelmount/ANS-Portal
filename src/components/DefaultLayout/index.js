import React, { useContext, useState, Fragment } from 'react'
import { observer } from 'mobx-react'
import { NavLink, useParams } from 'react-router-dom'

import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import LinkMaterial from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'

import AuthStore from 'stores/Auth'

import logo from 'source/images/svg/mtn-logo-nav.svg'
import { LANGUAGES } from 'source/config'

import i18n from 'i18n'
import { withNamespaces } from 'react-i18next'

import './styles.css'

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
    '& .sidebarIcon': {
      color: theme.palette.primary.main
    },
    '& .menu-text': {
      '& span': {
        fontWeight: 600
      }
    }
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

const DefaultLayout = props => {
  const { t } = props
  const match = useParams()
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logOut } = useContext(AuthStore)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  const adminNavLinks = [
    {
      link: '/customers',
      text: t('customers'),
      icon: PeopleAltOutlinedIcon
    },
    {
      link: '/search',
      text: t('search'),
      icon: SearchOutlinedIcon
    }
  ]

  const customerNavLinks = [
    {
      link: `/customers/${match.customerId}/subaccounts`,
      text: 'Subaccaunts',
      icon: PeopleAltOutlinedIcon
    }
  ]

  const drawer = (
    <Fragment>
      <Box className='drawerHeader'>
        <img src={logo} className={classes.logo} alt='mtn-logo' />
      </Box>
      <List>
        {match.customerId
          ? customerNavLinks.map(navLink => {
              let iconComponent = React.createElement(navLink.icon, {
                className: 'sidebarIcon'
              })
              return (
                <ListItem
                  key={`${navLink.link}`}
                  activeClassName={classes.activeMenuItem}
                  component={NavLink}
                  to={navLink.link}
                  className={classes.menuItem}
                  button
                >
                  <ListItemIcon className='icon'>{iconComponent}</ListItemIcon>
                  <ListItemText
                    primary={t(`${navLink.text}`)}
                    className='menu-text'
                  />
                </ListItem>
              )
            })
          : adminNavLinks.map(navLink => {
              let iconComponent = React.createElement(navLink.icon, {
                className: 'sidebarIcon'
              })
              return (
                <ListItem
                  key={`${navLink.link}`}
                  activeClassName={classes.activeMenuItem}
                  component={NavLink}
                  to={navLink.link}
                  className={classes.menuItem}
                  button
                >
                  <ListItemIcon className='icon'>{iconComponent}</ListItemIcon>
                  <ListItemText
                    primary={t(`${navLink.text}`)}
                    className='menu-text'
                  />
                </ListItem>
              )
            })}
      </List>
    </Fragment>
  )

  return (
    <Fragment>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <LinkMaterial component='button' onClick={() => logOut()}>
              <Box className={classes.headerBlock}>
                <AccountCircleIcon className={classes.userIcon} />
                <Typography className={classes.userName}>
                  {user.username}
                </Typography>
                <ExpandMoreOutlinedIcon className={classes.expandMoreIcon} />
              </Box>
            </LinkMaterial>
            <Box className={classes.headerBlock}>
              <Select
                className={classes.langBlock}
                value={localStorage.getItem('i18nextLng')}
                onChange={e => changeLanguage(e.target.value)}
                IconComponent={ExpandMoreOutlinedIcon}
              >
                {LANGUAGES.map((lang, index) => (
                  <MenuItem
                    value={lang.value}
                    key={`${index}`}
                    className={classes.listItem}
                  >
                    <img
                      className={classes.langIcon}
                      src={lang.img}
                      alt='language icon'
                    />
                    {` ${lang.lable}`}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Fragment>
  )
}

export default withNamespaces()(observer(DefaultLayout))
