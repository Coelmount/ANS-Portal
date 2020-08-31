import React from 'react'
import { withNamespaces } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'

import DefaultLayoutStore from 'stores/DefaultLayout'

import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const FirstLevelTabItem = ({
  t,
  classes,
  link,
  name,
  activeParentNav,
  navLink,
  Icon,
  text
}) => {
  const { handleActiveParentNav } = DefaultLayoutStore

  return (
    <ListItem
      activeClassName={classes.activeMenuItem}
      component={NavLink}
      to={link}
      className={classnames(classes.menuItem, {
        [classes.menuItemAnsInstances]:
          name === 'ans_instances' || name === 'schedules',
        [classes.activeMenuItem]:
          name === 'schedules' && activeParentNav === 'schedules'
      })}
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
  )
}

export default withNamespaces()(FirstLevelTabItem)
