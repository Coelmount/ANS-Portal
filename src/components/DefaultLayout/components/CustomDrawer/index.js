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

import CurrentUser from './components/CurrentUser'
import FirstLevelTabItem from './components/FirstLevelTabItem'
import SecondLevelTabItem from './components/SecondLevelTabItem'

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
    handleActiveParentNav,
    handleActiveChildNav,
    handleActiveSubChildNav,
    getActiveNavsAfterUpdate
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <CurrentUser
            classes={classes}
            isUserLoading={isUserLoading}
            userName={userName}
            userSubtitle={userSubtitle}
            customerStatus={customer.status}
          />
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
              <FirstLevelTabItem
                classes={classes}
                link={link}
                name={name}
                activeParentNav={activeParentNav}
                navLink={navLink}
                Icon={Icon}
                text={text}
              />

              <Collapse
                in={activeParentNav === name}
                timeout='auto'
                unmountOnExit
              >
                <List className={classes.collapse}>
                  {navLink.childLinks &&
                    navLink.childLinks.map(
                      ({ link, name, text, childLinks }) => {
                        return (
                          <SecondLevelTabItem
                            key={link}
                            classes={classes}
                            link={link}
                            name={name}
                            childLinks={childLinks}
                            text={text}
                            activeChildNav={activeChildNav}
                            activeBasicSubChild={activeBasicSubChild}
                            handleActiveChildNav={handleActiveChildNav}
                            handleActiveSubChildNav={handleActiveSubChildNav}
                          />
                        )
                      }
                    )}
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
