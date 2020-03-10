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
import Basic from 'ui/Subaccount/MyAnsInstances/Basic'
import SubaccountDetails from 'ui/Subaccount/Details'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'
import NotFound from 'components/NotFound'

import useStyles from './styles'

export const ROUTS = {
  auth: '/',
  customers: '/customers',
  search: '/search',
  accessNumbers: '/customers/:customerId/access-numbers',
  subaccounts: '/customers/:customerId/subaccounts',
  administrators: '/customers/:customerId/administrators',
  details: '/customers/:customerId/details',
  basic: '/customers/:customerId/subaccounts/:groupId/my_ans_instances/basic',
  subaccountDetails: '/customers/:customerId/subaccounts/:groupId/details'
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
      <Route path={ROUTS.customers} exact>
        <Page diplayedComponent={<Customers />} />
      </Route>
      <Route path={ROUTS.search} exact>
        <Page diplayedComponent={<Search />} />
      </Route>
      <Route path={ROUTS.accessNumbers} exact>
        <Page diplayedComponent={<AccessNumbers />} />
      </Route>
      <Route path={ROUTS.subaccounts} exact>
        <Page diplayedComponent={<Subaccounts />} />
      </Route>
      <Route path={ROUTS.administrators} exact>
        <Page diplayedComponent={<Administrators />} />
      </Route>
      <Route path={ROUTS.details} exact>
        <Page diplayedComponent={<Details />} />
      </Route>
      <Route path={ROUTS.basic} exact>
        <Page diplayedComponent={<Basic />} />
      </Route>
      <Route path={ROUTS.subaccountDetails} exact>
        <Page diplayedComponent={<SubaccountDetails />} />
      </Route>
      <Redirect path='/' to={ROUTS.customers} exact />
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
      <Route path={ROUTS.auth} component={AuthPages} exact />
      <Route path='*' component={NotFound} />
    </Switch>
  )
}

export default observer(Router)
