import React from 'react'
import { NavLink } from 'react-router-dom'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'

const SecondLevelTabItem = ({
  classes,
  link,
  name,
  childLinks,
  text,
  activeChildNav,
  activeBasicSubChild,
  handleActiveChildNav,
  handleActiveSubChildNav
}) => {
  return (
    <Box key={`${link}`}>
      <ListItem
        component={NavLink}
        className={classes.subMenuItem}
        activeClassName={classes.activeSubMenuItem}
        to={link}
        onClick={() => handleActiveChildNav(name)}
        button
      >
        <Box
          className={
            name === 'if tab with icon added'
              ? classes.secondLevelTitleWithIcon
              : classes.secondLevelTitle
          }
        >
          {childLinks && (
            <ExpandMoreIcon
              className={
                activeChildNav === name
                  ? classes.activeExpandIcon
                  : classes.expandIcon
              }
            />
          )}
          <ListItemText
            className={
              activeChildNav === name
                ? classes.activeSecondLevelItemText
                : classes.secondLevelItemText
            }
            primary={text}
          />
        </Box>
      </ListItem>
      <Collapse in={activeChildNav === name} timeout='auto' unmountOnExit>
        <List className={classes.collapse}>
          {childLinks &&
            childLinks.map(subChild => {
              console.log(subChild, 'subChild')
              return (
                <Box key={`${subChild.link}`}>
                  <ListItem
                    className={classes.activeSubMenuItem}
                    component={NavLink}
                    to={subChild.link}
                    onClick={() => handleActiveSubChildNav(subChild.name, name)}
                    button
                  >
                    <ListItemText
                      className={
                        activeBasicSubChild === subChild.name
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
}

export default SecondLevelTabItem
