import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import logo from 'source/images/svg/mtn-logo-nav.svg'

const Drawer = ({ classes, getCurrentLevel, t }) => {
  return (
    <Fragment>
      <Box className='drawerHeader'>
        <img src={logo} className={classes.logo} alt='mtn-logo' />
      </Box>

      <List>
        {getCurrentLevel().map(navLink => {
          const { link, icon: Icon, text } = navLink
          return (
            <ListItem
              key={`${link}`}
              activeClassName={classes.activeMenuItem}
              component={NavLink}
              to={link}
              className={classes.menuItem}
              button
            >
              <ListItemIcon className='icon'>
                <Icon className='sidebarIcon' />
              </ListItemIcon>
              <ListItemText primary={t(`${text}`)} className='menu-text' />
              {/* <List>
                  {navLink.childLinks &&
                    navLink.childLinks.map(childLink => {
                      return (
                        <ListItem to={childLink.link}>
                          <ListItemText primary={childLink.text}></ListItemText>
                        </ListItem>
                      )
                    })}
                </List> */}
            </ListItem>
          )
        })}
      </List>
    </Fragment>
  )
}

export default withNamespaces()(Drawer)
