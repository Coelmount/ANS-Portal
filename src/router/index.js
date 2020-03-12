import React, { useContext, useEffect, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import Loading from 'components/Loading'

import DefaultLayout from 'components/DefaultLayout'
import Auth from 'ui/Auth'
import Customers from 'ui/Customers'
import Search from 'ui/Search'
import AccessNumbers from 'ui/Customer/AccessNumbers'
import Subaccounts from 'ui/Customer/Subaccounts/'
import Administrators from 'ui/Customer/Administrators'
import Details from 'ui/Customer/Details'
import MyAnsInstances from 'ui/Subaccount/MyAnsInstances'
import Basic from 'ui/Subaccount/MyAnsInstances/Basic'
import SubaccountDetails from 'ui/Subaccount/Details'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'
import NotFound from 'components/NotFound'

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
    path: '/customers/:customerId/access-numbers',
    component: <AccessNumbers />
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
    path: '/customers/:customerId/subaccounts/:groupId/my_ans_instances',
    component: <MyAnsInstances />
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/my_ans_instances/basic',
    component: <Basic />
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
  return (
    <div style={{ display: 'flex', paddingTop: 66 }}>
      <DefaultLayout />
      {props.diplayedComponent}
    </div>
  )
}

const UserPages = () => {
  const { getLocale, isLoadingLang, lang } = useContext(LanguagesStore)
  useEffect(() => {
    getLocale(localStorage.getItem('i18nextLng'))
  }, [getLocale, lang])
  return !isLoadingLang ? (
    <Switch>
      {userComponents.map(el => (
        <Route path={el.path} key={el.path} exact>
          <Page diplayedComponent={el.component} />
        </Route>
      ))}
      <Redirect path='/' to={'/customers'} exact />
      <Redirect
        path='/customers/:customerId/'
        to={'/customers/:customerId/access-numbers'}
        exact
      />
      <Redirect
        path='/customers/:customerId/subaccounts/:groupId/'
        to={'/customers/:customerId/subaccounts/:groupId/my_ans_instances'}
        exact
      />
      <Route path='*' component={NotFound} />
    </Switch>
  ) : (
    <Loading />
  )
}

const AuthPages = ({ match }) => {
  return (
    <Switch>
      {authComponents.map(el => (
        <Route key={el.path} path={el.path} component={el.component} exact />
      ))}
    </Switch>
  )
}

const Router = () => {
  const { getLocal, isAuthorized } = useContext(AuthStore)
  const { getLocale, isLoadingLang, lang } = useContext(LanguagesStore)
  useEffect(() => {
    getLocal()
  }, [getLocal])
  useEffect(() => {
    getLocale(localStorage.getItem('i18nextLng'))
  }, [getLocale, lang])

  return isAuthorized && localStorage.getItem('token') ? (
    <Route path='/' component={UserPages} />
  ) : (
    <Switch>
      <Route path={'/'} component={AuthPages} exact />
      {isAuthorized && <Route path='*' component={NotFound} />}
    </Switch>
  )
}

export default observer(Router)
