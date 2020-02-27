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

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'

export const ROUTS = {
  auth: '/',
  customers: '/customers',
  search: '/search',
  accessNumbers: '/customers/:customerId/access-numbers',
  subaccounts: '/customers/:customerId/subaccounts',
  administrators: '/customers/:customerId/administrators',
  details: '/customers/:customerId/details'
}

const RouteWithSubRoutes = ({ component: Component, ...route }) => {
  return (
    <>
      <Route
        path={route.path}
        render={props => <Component {...props} />}
        exact
      />
      {route.routes &&
        route.routes.map(cildRoute => (
          <RouteWithSubRoutes key={cildRoute.path} {...cildRoute} />
        ))}
    </>
  )
}

const userRoutes = [
  {
    path: ROUTS.customers,
    component: Customers
  },
  {
    path: ROUTS.search,
    component: Search
  },
  {
    path: ROUTS.accessNumbers,
    component: AccessNumbers
  },
  {
    path: ROUTS.subaccounts,
    component: Subaccounts
  },
  {
    path: ROUTS.administrators,
    component: Administrators
  },
  {
    path: ROUTS.details,
    component: Details
  }
]

const authRoutes = [
  {
    path: '/',
    component: Auth
  }
]

const UserPages = () => {
  const { getLocale, isLoadingLang, lang } = useContext(LanguagesStore)
  useEffect(() => {
    console.log(123)
    getLocale(localStorage.getItem('i18nextLng'))
  }, [lang])
  return !isLoadingLang ? (
    <Switch>
      <Fragment>
        <div style={{ paddingTop: 66 }}>
          {userRoutes.map(route => (
            <div key={route.path} style={{ display: 'flex' }}>
              <Route component={DefaultLayout} path={route.path} />
              <RouteWithSubRoutes {...route} />
            </div>
          ))}
          <Route path='/' exact>
            <Redirect to={ROUTS.customers} />
          </Route>
        </div>
      </Fragment>
    </Switch>
  ) : (
    <Loading />
  )
}

const AuthPages = () => {
  return (
    <Switch>
      {authRoutes.map(route => (
        <Route key={route.path} path={route.path} component={route.component} />
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
  }, [lang])

  return (
    <Switch>
      {isAuthorized && localStorage.getItem('token') ? (
        <Fragment>
          <Route path='/' component={UserPages} />
        </Fragment>
      ) : (
        <Fragment>
          <Route path={ROUTS.auth} component={AuthPages} exact />
          <Route path='/'>
            <Redirect to={ROUTS.auth} />
          </Route>
        </Fragment>
      )}
    </Switch>
  )
}

export default observer(Router)
