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
import { useEffect } from 'react'

const Drawer = ({
  classes,
  getCurrentLevel,
  t,
  activeMainLevel,
  setActiveMainLevel,
  activeSecondLevel,
  setActiveSecondLevel
}) => {
  // const [isAnsInstancesOpen, setIsAnsInstancesOpen] = useState(false)
  // console.log(isAnsInstancesOpen, 'isAnsInstancesOpen')
  // const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  // const [activeSublevel, setActiveSublevel] = useState(null)

  // console.log(isAnsInstancesOpen, 'isAdvancedOpen')

  // const handleOpenAnsInstances = name => {
  //   name === 'ans_instances' && setIsAnsInstancesOpen(!isAnsInstancesOpen)
  // }

  useEffect(() => {}, [])
  // const handleOpenAdvanced = name => {
  //   name === 'advanced' && setIsAdvancedOpen(!isAdvancedOpen)
  // }

  return (
    <Fragment>
      <Box className='drawerHeader'>
        <img src={logo} className={classes.logo} alt='mtn-logo' />
      </Box>

      <List style={{ fontFamily: 'MTN', fontSize: 16 }}>
        {getCurrentLevel().map(navLink => {
          const { link, icon: Icon, text, name } = navLink
          return (
            <Box>
              <ListItem
                key={`${link}`}
                activeClassName={classes.activeMenuItem}
                component={NavLink}
                to={link}
                className={classes.menuItem}
                button
              >
                <Box
                  onClick={() => setActiveMainLevel(name)}
                  className={classes.topLevelTitle}
                >
                  <ListItemIcon className='icon'>
                    <Icon className='sidebarIcon' />
                  </ListItemIcon>
                  <ListItemText primary={t(`${text}`)} className='menu-text' />
                  {navLink.childLinks && (
                    <ExpandMoreIcon
                    // className={
                    //   isAnsInstancesOpen
                    //     ? classes.activeExpandIcon
                    //     : classes.expandIcon
                    // }
                    />
                  )}
                </Box>
              </ListItem>

              <Collapse
                // activeClassName={classes.activeMenuItem}
                // in={isAnsInstancesOpen}
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
                            activeClassName={classes.activeSubMenuItem}
                            to={childLink.link}
                            button
                          >
                            <Box
                              // onClick={() => setActiveSublevel(childLink.name)}
                              className={classes.secondLevelTitle}
                            >
                              <ListItemText
                                // className={
                                //   childLink.name === activeSublevel
                                //     ? classes.activeSecondLevelItemText
                                //     : classes.secondLevelItemText
                                // }
                                primary={childLink.text}
                              />
                              {childLink.childLinks && (
                                <ExpandMoreIcon
                                // className={
                                //   childLink.name === activeSublevel
                                //     ? classes.activeExpandIcon
                                //     : classes.expandIcon
                                // }
                                />
                              )}
                            </Box>
                          </ListItem>
                          <Collapse
                            // in={childLink.name === activeSublevel}
                            timeout='auto'
                            unmountOnExit
                          >
                            <List className={classes.collapse}>
                              {childLink.childLinks &&
                                childLink.childLinks.map(childLink => {
                                  return (
                                    <Box>
                                      <ListItem
                                        className={classes.activeSubMenuItem}
                                        component={NavLink}
                                        to={childLink.link}
                                        button
                                      >
                                        <ListItemText
                                          className={classes.thirdLevelItemText}
                                          primary={childLink.text}
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

export default withNamespaces()(Drawer)
