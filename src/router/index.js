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
import NotFound from 'components/NotFound'

import useStyles from './styles'

export const ROUTES = {
  auth: '/',
  customers: '/customers',
  search: '/search',
  accessNumbers: '/customers/:customerId/access-numbers',
  subaccounts: '/customers/:customerId/subaccounts',
  administrators: '/customers/:customerId/administrators',
  details: '/customers/:customerId/details'
}

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
      <Route path={ROUTES.customers} exact>
        <Page diplayedComponent={<Customers />} />
      </Route>
      <Route path={ROUTES.search} exact>
        <Page diplayedComponent={<Search />} />
      </Route>
      <Route path={ROUTES.accessNumbers} exact>
        <Page diplayedComponent={<AccessNumbers />} />
      </Route>
      <Route path={ROUTES.subaccounts} exact>
        <Page diplayedComponent={<Subaccounts />} />
      </Route>
      <Route path={ROUTES.administrators} exact>
        <Page diplayedComponent={<Administrators />} />
      </Route>
      <Route path={ROUTES.details} exact>
        <Page diplayedComponent={<Details />} />
      </Route>
      <Redirect path='/' to={ROUTES.customers} exact />
      <Route path='*' component={NotFound} />
    </Switch>
  ) : (
    <Loading />
  )
}

const AuthPages = ({ match }) => {
  return (
    <Switch>
      <Route path={`${match.url}`} component={Auth} exact />
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
    <Switch>
      <Route path='/' component={UserPages} />
    </Switch>
  ) : (
    <Switch>
      <Route path={ROUTES.auth} component={AuthPages} exact />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default observer(Router)
