import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { useHistory, NavLink, useParams } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { withRouter } from 'react-router'
import { observer } from 'mobx-react-lite'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import DefaultLayoutStore from 'stores/DefaultLayout'
import SubaccountsStore from 'stores/Subaccounts'
import CustomersStore from 'stores/Customers'

import logo from 'source/images/svg/mtn-logo-nav.svg'
import subaccountIcon from 'source/images/svg/users-subaccount.svg'
import customerIcon from 'source/images/svg/users-customer.svg'

const CustomDrawer = ({ classes, getCurrentLevel, t }) => {
  const history = useHistory()
  const match = useParams()
  const [userName, setUserName] = useState('')
  const [userSubtitle, setUserSubtitle] = useState('')

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

  const {
    getSubaccount,
    isLoadingSubaccount,
    customer: subaccount
  } = SubaccountsStore

  const {
    getCustomerName,
    isLoadingCustomerName,
    customerName,
    customer,
    isLoadingCustomer,
    getCustomer
  } = CustomersStore

  const isUserLoading =
    (match.customerId && !match.groupId && isLoadingCustomerName) ||
    (match.customerId && match.groupId && isLoadingSubaccount)

  useEffect(() => {
    getActiveNavsAfterUpdate(history.location.pathname)
    return () => {
      // setDefaultValues()
    }
  }, [getActiveNavsAfterUpdate, history.location.pathname])

  // get customer/subaccount data for sidebar user block
  useEffect(() => {
    if (match.customerId && !match.groupId) {
      if (customer.tenantId !== match.customerId) {
        getCustomerName(match.customerId)
        getCustomer(match.customerId)
      }
    }
    if (match.customerId && match.groupId) {
      if (subaccount.groupId !== match.groupId) {
        getSubaccount(match.customerId, match.groupId)
      }
    }
  }, [match.groupId, match.customerId])

  // update user data if store updated
  useEffect(() => {
    if (match.customerId && !match.groupId) {
      setUserName(customerName)
      setUserSubtitle(t('customer'))
    }
    if (match.customerId && match.groupId) {
      setUserName(subaccount.groupName)
      setUserSubtitle(t('subaccount'))
    }
  }, [subaccount.groupName, customerName])

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

  const redirectToDetailsPage = () => {
    if (match.customerId && match.groupId) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${match.groupId}/details`
      )
      return
    }
    if (match.customerId) {
      history.push(`/customers/${match.customerId}/details`)
      return
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
        {userSubtitle && (
          <Fragment>
            {isUserLoading && !userName ? (
              <CircularProgress className={classes.loadingIcon} />
            ) : (
              <Box className={classes.userWrap} onClick={redirectToDetailsPage}>
                <Typography className={classes.userSubtitle}>
                  {userSubtitle.toUpperCase()}
                </Typography>
                <Box className={classes.userNameWrap}>
                  <img
                    className={classes.usersIcon}
                    src={
                      userSubtitle === 'subaccount'
                        ? subaccountIcon
                        : customerIcon
                    }
                    alt='users'
                  />
                  <span>{userName}</span>
                </Box>
                {customer.status && (
                  <Box className={classes.statusBox}>
                    {customer.status === 'Active' ? '' : t('account_suspended')}
                  </Box>
                )}
              </Box>
            )}
          </Fragment>
        )}
        {getCurrentLevel().map((navLink, index) => {
          const { link, icon: Icon, text, name } = navLink
          return (
            <Box
              key={`${link}`}
              className={classnames(
                { [classes.mainActive]: activeParentNav === name },
                { [classes.firstTab]: index === 0 }
              )}
            >
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
