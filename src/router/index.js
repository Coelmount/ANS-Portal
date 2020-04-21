import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import Loading from 'components/Loading'
import Snackbar from 'components/Snackbar'

import DefaultLayout from 'components/DefaultLayout'
import Auth from 'ui/Auth'
import Customers from 'ui/Customers'
import Search from 'ui/Search'
import AccessNumbers from 'ui/Customer/AccessNumbers'
import AccessNumbersItem from 'ui/Customer/AccessNumbersItem'
import Subaccounts from 'ui/Customer/Subaccounts/'
import Administrators from 'ui/Customer/Administrators'
import Details from 'ui/Customer/Details'
import AnsInstances from 'ui/Subaccount/AnsInstances'
import TimeBasedRouting from 'ui/Subaccount/AnsInstances/TimeBasedRouting'
import IVR from 'ui/Subaccount/AnsInstances/IVR'
import Translations from 'ui/Subaccount/AnsInstances/Basic/Translations'
import TranslationsSingleNumber from 'ui/Subaccount/AnsInstances/Basic/Translations/components/SingleNumber'
import BulkJobs from 'ui/Subaccount/AnsInstances/Basic/BulkJobs'
import Destinations from 'ui/Subaccount/AnsInstances/Advanced/Destinations'
import DestinationGroups from 'ui/Subaccount/AnsInstances/Advanced/DestinationGroups'
import PhoneNumbers from 'ui/Subaccount/PhoneNumbers'
import Announcements from 'ui/Subaccount/Announcements'
import SubaccountAdmins from 'ui/Subaccount/Administrators'
import SubaccountDetails from 'ui/Subaccount/Details'
import Schedules from 'ui/Subaccount/Schedules'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'
import NotFound from 'components/NotFound'

import useStyles from './styles'

const userComponents = [
  {
    path: '/customers',
    component: <Customers />
  },
  {
    path: '/search',
    component: <Search />
  },
  {
    path: '/customers/:customerId/access_numbers',
    component: <AccessNumbers />
  },
  {
    path: '/customers/:customerId/access_numbers/:numbersId',
    component: <AccessNumbersItem />
  },
  {
    path: '/customers/:customerId/subaccounts',
    component: <Subaccounts />
  },
  {
    path: '/customers/:customerId/administrators',
    component: <Administrators />
  },
  {
    path: '/customers/:customerId/details',
    component: <Details />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/ans_instances',
    component: <AnsInstances />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/basic/translations',
    component: <Translations />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/basic/translations/:instanceNumber',
    component: <TranslationsSingleNumber />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/basic/bulk_jobs',
    component: <BulkJobs />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/advanced/destinations',
    component: <Destinations />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/advanced/destination_groups',
    component: <DestinationGroups />
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/time_based_routing',
    component: <TimeBasedRouting />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/ans_instances/ivr',
    component: <IVR />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/phone_numbers',
    component: <PhoneNumbers />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/announcements',
    component: <Announcements />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/schedules',
    component: <Schedules />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/administrators',
    component: <SubaccountAdmins />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/details',
    component: <SubaccountDetails />
  }
]

const authComponents = [
  {
    path: '/',
    component: Auth
  }
]

const Page = props => {
  const classes = useStyles()
  return (
    <div className={classes.page}>
      <DefaultLayout />
      {props.diplayedComponent}
    </div>
  )
}

const UserPages = () => {
  const { getLocale, isLoadingLang, lang } = LanguagesStore
  useEffect(() => {
    getLocale(localStorage.getItem('i18nextLng'))
  }, [getLocale, lang])
  return (
    <Switch>
      {userComponents.map(el => (
        <Route path={el.path} key={el.path} exact>
          <Page diplayedComponent={el.component} />
        </Route>
      ))}
      <Redirect path='/' to={'/customers'} exact />
      <Redirect
        path='/customers/:customerId/'
        to={'/customers/:customerId/access_numbers'}
        exact
      />
      <Redirect
        path='/customers/:customerId/subaccounts/:groupId/'
        to={'/customers/:customerId/subaccounts/:groupId/ans_instances'}
        exact
      />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

const AuthPages = observer(() => {
  const { isAuthorized } = AuthStore
  return (
    <Switch>
      {authComponents.map(el => (
        <Route key={el.path} path={el.path} component={el.component} exact />
      ))}
      {isAuthorized && <Route path='*' component={NotFound} />}
    </Switch>
  )
})

const Router = () => {
  const { getLocal, isAuthorized } = AuthStore
  const { getLocale, isLoadingLang, lang } = LanguagesStore
  useEffect(() => {
    getLocal()
  }, [getLocal])
  useEffect(() => {
    getLocale(localStorage.getItem('i18nextLng'))
  }, [getLocale, lang])

  return (
    <React.Fragment>
      <Snackbar />
      {isAuthorized && localStorage.getItem('token') ? (
        <Route path='/' component={UserPages} />
      ) : (
        <Switch>
          <Route path='/' component={AuthPages} />
        </Switch>
      )}
    </React.Fragment>
  )
}

export default observer(Router)
