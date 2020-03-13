import React, { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DefaultLayoutStore from 'stores/DefaultLayout'

import logo from 'source/images/svg/mtn-logo-nav.svg'

const CustomDrawer = ({ classes, getCurrentLevel, t }) => {
  const {
    activeParentNav,
    activeChildNav,
    activeSubChild,
    handleActiveParentNav,
    handleActiveChildNav,
    handleActiveSubChildNav
  } = useContext(DefaultLayoutStore)
  return (
    <Fragment>
      <Box className='drawerHeader'>
        <img src={logo} className={classes.logo} alt='mtn-logo' />
      </Box>

      <List style={{ fontFamily: 'MTN', fontSize: 16 }}>
        {getCurrentLevel().map(navLink => {
          const { link, icon: Icon, text, name } = navLink
          return (
            <Box className={activeParentNav === name && classes.mainActive}>
              <ListItem
                key={`${link}`}
                activeClassName={classes.activeMenuItem}
                component={NavLink}
                to={link}
                className={classes.menuItem}
                button
              >
                <Box
                  onClick={() => handleActiveParentNav(name)}
                  className={classes.topLevelTitle}
                >
                  <ListItemIcon className='icon'>
                    <Icon className='sidebarIcon' />
                  </ListItemIcon>
                  <ListItemText primary={t(`${text}`)} className='menu-text' />
                  {navLink.childLinks && (
                    <ExpandMoreIcon
                      className={
                        activeParentNav === name
                          ? classes.activeExpandIcon
                          : classes.expandIcon
                      }
                    />
                  )}
                </Box>
              </ListItem>

              <Collapse
                // activeClassName={classes.activeMenuItem}
                in={activeParentNav === name}
                timeout='auto'
                unmountOnExit
              >
                <List className={classes.collapse}>
                  {navLink.childLinks &&
                    navLink.childLinks.map(childLink => {
                      return (
                        <Box>
                          <ListItem
                            component={NavLink}
                            className={classes.subMenuItem}
                            activeClassName={classes.activeSubMenuItem}
                            to={childLink.link}
                            button
                          >
                            <Box
                              onClick={() =>
                                handleActiveChildNav(childLink.name)
                              }
                              className={classes.secondLevelTitle}
                            >
                              <ListItemText
                                className={
                                  activeChildNav === childLink.name
                                    ? classes.activeSecondLevelItemText
                                    : classes.secondLevelItemText
                                }
                                primary={childLink.text}
                              />
                              {childLink.childLinks && (
                                <ExpandMoreIcon
                                  className={
                                    activeChildNav === childLink.name
                                      ? classes.activeExpandIcon
                                      : classes.expandIcon
                                  }
                                />
                              )}
                            </Box>
                          </ListItem>
                          <Collapse
                            in={activeChildNav === childLink.name}
                            timeout='auto'
                            unmountOnExit
                          >
                            <List className={classes.collapse}>
                              {childLink.childLinks &&
                                childLink.childLinks.map(subChild => {
                                  return (
                                    <Box>
                                      <ListItem
                                        className={classes.activeSubMenuItem}
                                        component={NavLink}
                                        to={subChild.link}
                                        button
                                      >
                                        <ListItemText
                                          onClick={() =>
                                            handleActiveSubChildNav(
                                              subChild.name
                                            )
                                          }
                                          className={
                                            activeSubChild === subChild.name
                                              ? classes.activeThirdLevelItemText
                                              : classes.thirdLevelItemText
                                          }
                                          primary={subChild.text}
                                        />
                                      </ListItem>
                                    </Box>
                                  )
                                })}
                            </List>
                          </Collapse>
                        </Box>
                      )
                    })}
                </List>
              </Collapse>
            </Box>
          )
        })}
      </List>
    </Fragment>
  )
}

export default withNamespaces()(CustomDrawer)
