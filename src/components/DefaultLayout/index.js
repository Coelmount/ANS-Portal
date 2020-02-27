import React, { useContext, useState, Fragment } from 'react'
import { observer } from 'mobx-react'
import { NavLink, useParams } from 'react-router-dom'
import i18n from 'i18n'
import { withNamespaces } from 'react-i18next'

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
import SvgIcon from '@material-ui/core/SvgIcon'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'

import logo from 'source/images/svg/mtn-logo-nav.svg'
import { LANGUAGES } from 'source/config'
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
  }
}))

const DefaultLayout = props => {
  const { t } = props
  const match = useParams()
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logOut } = useContext(AuthStore)
  const { getLocale } = useContext(LanguagesStore)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const changeLanguage = lng => {
    getLocale(lng)
    i18n.changeLanguage(lng)
  }

  const AdministratorsIcon = () => {
    return (
      <SvgIcon>
        <path d='M5.83,10C5.42,8.83 4.31,8 3,8A3,3 0 0,0 0,11A3,3 0 0,0 3,14C4.31,14 5.42,13.17 5.83,12H8V14H10V12H11V10H5.83M3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10A1,1 0 0,1 4,11A1,1 0 0,1 3,12M16,4A4,4 0 0,0 12,8A4,4 0 0,0 16,12A4,4 0 0,0 20,8A4,4 0 0,0 16,4M16,10.1A2.1,2.1 0 0,1 13.9,8A2.1,2.1 0 0,1 16,5.9C17.16,5.9 18.1,6.84 18.1,8C18.1,9.16 17.16,10.1 16,10.1M16,13C13.33,13 8,14.33 8,17V20H24V17C24,14.33 18.67,13 16,13M22.1,18.1H9.9V17C9.9,16.36 13,14.9 16,14.9C18.97,14.9 22.1,16.36 22.1,17V18.1Z' />
      </SvgIcon>
    )
  }

  const DetailsIcon = () => {
    return (
      <SvgIcon>
        <path d='M11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6C9.66 6 11 7.34 11 9M14 20H2V18C2 15.79 4.69 14 8 14C11.31 14 14 15.79 14 18M7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9M4 18H12C12 16.9 10.21 16 8 16C5.79 16 4 16.9 4 18M22 12V14H13V12M22 8V10H13V8M22 4V6H13V4Z' />
      </SvgIcon>
    )
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
      link: `/customers/${match.customerId}/access-numbers`,
      text: 'Access Numbers',
      icon: PhoneOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/subaccounts`,
      text: 'Subaccaunts',
      icon: PeopleAltOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/administrators`,
      text: 'Administrators',
      icon: AdministratorsIcon
    },
    {
      link: `/customers/${match.customerId}/details`,
      text: 'Details',
      icon: DetailsIcon
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
              console.log(navLink.icon)
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
