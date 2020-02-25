import React, { useContext, useEffect, Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'

import DefaultLayout from 'components/DefaultLayout'
import Auth from 'ui/Auth'
import Customers from 'ui/Customers'
import Search from 'ui/Search'
import Subaccounts from 'ui/Customer/Subaccounts/'

import AuthStore from 'stores/Auth'

export const ROUTS = {
  auth: '/',
  customers: '/customers',
  search: '/search',
  subaccounts: '/customers/:customerId/subaccounts'
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
    path: ROUTS.subaccounts,
    component: Subaccounts
  }
]

const authRoutes = [
  {
    path: '/',
    component: Auth
  }
]
const UserPages = () => {
  return (
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

  useEffect(() => {
    getLocal()
  }, [getLocal])

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
