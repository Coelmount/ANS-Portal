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

      <List className={classes.wrapper}>
        {getCurrentLevel().map(navLink => {
          const { link, icon: Icon, text, name } = navLink
          return (
            <Box
              className={activeParentNav === name ? classes.mainActive : null}
              key={`${link}`}
            >
              <ListItem
                activeClassName={classes.activeMenuItem}
                component={NavLink}
                to={link}
                className={classes.menuItem}
                onClick={() => handleActiveParentNav(name)}
                button
              >
                <Box className={classes.topLevelTitle}>
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
                in={activeParentNav === name}
                timeout='auto'
                unmountOnExit
              >
                <List className={classes.collapse}>
                  {navLink.childLinks &&
                    navLink.childLinks.map(childLink => {
                      return (
                        <Box key={`${childLink.link}`}>
                          <ListItem
                            component={NavLink}
                            className={classes.subMenuItem}
                            activeClassName={classes.activeSubMenuItem}
                            to={childLink.link}
                            onClick={() => handleActiveChildNav(childLink.name)}
                            button
                          >
                            <Box className={classes.secondLevelTitle}>
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
                                    <Box key={`${subChild.link}`}>
                                      <ListItem
                                        className={classes.activeSubMenuItem}
                                        component={NavLink}
                                        to={subChild.link}
                                        onClick={() =>
                                          handleActiveSubChildNav(subChild.name)
                                        }
                                        button
                                      >
                                        <ListItemText
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
