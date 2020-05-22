import React, { Fragment, useEffect } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react-lite'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DefaultLayoutStore from 'stores/DefaultLayout'

import logo from 'source/images/svg/mtn-logo-nav.svg'

const CustomDrawer = ({ classes, getCurrentLevel, match, t }) => {
  const history = useHistory()
  const {
    activeParentNav,
    activeChildNav,
    activeBasicSubChild,
    activeAdvancedSubChild,
    handleActiveParentNav,
    handleActiveChildNav,
    handleActiveSubChildNav,
    getActiveNavsAfterUpdate,
    setDefaultValues
  } = DefaultLayoutStore

  useEffect(() => {
    getActiveNavsAfterUpdate(match.url)
    return () => {
      setDefaultValues()
    }
  }, [getActiveNavsAfterUpdate, match.url])

  const redirectToMainPage = () => {
    if (!!localStorage.getItem('ids')) {
      const ids = JSON.parse(localStorage.getItem('ids'))
      if (ids.tenant_id && ids.group_id) {
        history.push(
          `/customers/${ids.tenant_id}/subaccounts/${ids.group_id}/ans_instances`
        )
        return
      }
      if (ids.tenant_id) {
        history.push(`/customers/${ids.tenant_id}/access_numbers`)
        return
      }
    } else {
      history.push('/customers')
    }
  }

  return (
    <Fragment>
      <Box className='drawerHeader'>
        <img
          src={logo}
          className={classes.logo}
          alt='mtn-logo'
          onClick={redirectToMainPage}
        />
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
                className={
                  name === 'ans_instances'
                    ? classes.menuItemAnsInstances
                    : classes.menuItem
                }
                onClick={() => handleActiveParentNav(name)}
                button
              >
                <Box className={classes.topLevelTitle}>
                  {navLink.childLinks && (
                    <ExpandMoreIcon
                      className={
                        activeParentNav === name
                          ? classes.activeExpandIcon
                          : classes.expandIcon
                      }
                    />
                  )}
                  <ListItemIcon className='icon'>
                    <Icon className='sidebarIcon' />
                  </ListItemIcon>
                  <ListItemText primary={t(`${text}`)} className='menu-text' />
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
                            <Box
                              className={
                                childLink.name === 'advanced'
                                  ? classes.secondLevelTitleWithIcon
                                  : classes.secondLevelTitle
                              }
                            >
                              {childLink.childLinks && (
                                <ExpandMoreIcon
                                  className={
                                    activeChildNav === childLink.name
                                      ? classes.activeExpandIcon
                                      : classes.expandIcon
                                  }
                                />
                              )}
                              <ListItemText
                                className={
                                  activeChildNav === childLink.name
                                    ? classes.activeSecondLevelItemText
                                    : classes.secondLevelItemText
                                }
                                primary={childLink.text}
                              />
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
                                          handleActiveSubChildNav(
                                            subChild.name,
                                            childLink.name
                                          )
                                        }
                                        button
                                      >
                                        <ListItemText
                                          className={
                                            activeBasicSubChild ===
                                              subChild.name ||
                                            activeAdvancedSubChild ===
                                              subChild.name
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

export default withNamespaces()(withRouter(observer(CustomDrawer)))
