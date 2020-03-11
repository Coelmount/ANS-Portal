import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import logo from 'source/images/svg/mtn-logo-nav.svg'

const Drawer = ({ classes, getCurrentLevel, t }) => {
  const [isAnsInstancesOpen, setIsAnsInstancesOpen] = useState(false)

  const handleOpenSettings = name => {
    name === 'ans_instances' && setIsAnsInstancesOpen(!isAnsInstancesOpen)
  }

  return (
    <Fragment>
      <Box className='drawerHeader'>
        <img src={logo} className={classes.logo} alt='mtn-logo' />
      </Box>

      <List>
        {getCurrentLevel().map(navLink => {
          const { link, icon: Icon, text, name } = navLink
          return (
            <ListItem
              key={`${link}`}
              activeClassName={classes.activeMenuItem}
              component={NavLink}
              to={link}
              className={classes.menuItem}
              button
            >
              <Box
                onClick={() => handleOpenSettings(name)}
                className={classes.topLevelTitle}
              >
                <ListItemIcon className='icon'>
                  <Icon className='sidebarIcon' />
                </ListItemIcon>
                <ListItemText primary={t(`${text}`)} className='menu-text' />
                {navLink.childLinks && (
                  <ExpandMoreIcon
                    className={
                      isAnsInstancesOpen
                        ? classes.activeSidebarExpandMoreIcon
                        : classes.sidebarExpandMoreIcon
                    }
                  />
                )}
              </Box>
              <Collapse in={isAnsInstancesOpen} timeout='auto' unmountOnExit>
                <List>
                  {navLink.childLinks &&
                    navLink.childLinks.map(childLink => {
                      return (
                        <ListItem to={childLink.link}>
                          <ListItemText primary={childLink.text}></ListItemText>
                        </ListItem>
                      )
                    })}
                </List>
              </Collapse>
            </ListItem>
          )
        })}
      </List>
    </Fragment>
  )
}

export default withNamespaces()(Drawer)
