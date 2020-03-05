import React, { useContext, useEffect } from 'react'
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
  const { getLocale, isLoadingLang, lang } = useContext(LanguagesStore)
  useEffect(() => {
    getLocale(localStorage.getItem('i18nextLng'))
  }, [getLocale, lang])
  return !isLoadingLang ? (
    <Switch>
      {userComponents.map(el => (
        <Route path={el.path} exact>
          <Page diplayedComponent={el.component} />
        </Route>
      ))}
      <Redirect path='/' to={'/customers'} exact />
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
        <Route path={el.path} component={el.component} exact />
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
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default observer(Router)
