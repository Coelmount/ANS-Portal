import React, { useEffect } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

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
import WeekSchedules from 'ui/Subaccount/Schedules/WeekSchedules'
import WeekSchedule from 'components/WeekSchedule'
import HolidaySchedules from 'ui/Subaccount/Schedules/HolidaySchedules'
import ResetPassword from 'ui/ResetPassword'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'
import NotFound from 'components/NotFound'
import AccessDenied from 'components/AccessDenied'

import useStyles from './styles'

const userComponents = [
  {
    path: '/customers',
    component: <Customers />,
    accessLevel: 1 //admin
  },
  {
    path: '/search',
    component: <Search />,
    accessLevel: 1
  },
  {
    path: '/customers/:customerId/access_numbers',
    component: <AccessNumbers />,
    accessLevel: 2 // customer admin
  },
  {
    path: '/customers/:customerId/access_numbers/:numbersId/numbers',
    component: <AccessNumbersItem />,
    accessLevel: 2
  },
  {
    path: '/customers/:customerId/subaccounts',
    component: <Subaccounts />,
    accessLevel: 2
  },
  {
    path: '/customers/:customerId/administrators',
    component: <Administrators />,
    accessLevel: 2
  },
  {
    path: '/customers/:customerId/details',
    component: <Details />,
    accessLevel: 2
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/ans_instances',
    component: <AnsInstances />,
    accessLevel: 3 // group admin
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/ans_instances/basic',
    component: <Translations />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/basic/:instanceNumber',
    component: <TranslationsSingleNumber />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/advanced/destinations',
    component: <Destinations />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/advanced/destination_groups',
    component: <DestinationGroups />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/ans_instances/time_based_routing',
    component: <TimeBasedRouting />,
    accessLevel: 3
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/ans_instances/ivr',
    component: <IVR />,
    accessLevel: 3
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/phone_numbers',
    component: <PhoneNumbers />,
    accessLevel: 3
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/announcements',
    component: <Announcements />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/schedules/week_schedules',
    component: <WeekSchedules />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/schedules/week_schedules/:weekScheduleName',
    component: <WeekSchedule />,
    accessLevel: 3
  },
  {
    path:
      '/customers/:customerId/subaccounts/:groupId/schedules/holiday_schedules',
    component: <HolidaySchedules />,
    accessLevel: 3
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/administrators',
    component: <SubaccountAdmins />,
    accessLevel: 3
  },
  {
    path: '/customers/:customerId/subaccounts/:groupId/details',
    component: <SubaccountDetails />,
    accessLevel: 3
  }
]

const authComponents = [
  {
    path: '/',
    component: Auth
  },
  {
    path: '/resetpassword',
    component: ResetPassword
  }
]

const checkAccesLevel = (pageLvl, userLvl, match) => {
  if (pageLvl < userLvl) {
    return false
  } else if (!!localStorage.getItem('ids')) {
    const ids = JSON.parse(localStorage.getItem('ids'))
    if (
      ids.tenant_id &&
      ids.group_id &&
      ids.tenant_id === match.customerId &&
      ids.group_id === match.groupId
    ) {
      return true
    } else if (ids.tenant_id && ids.tenant_id === match.customerId) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

const Page = props => {
  const classes = useStyles()
  const match = useParams()
  let accessLevel = -1
  if (!!localStorage.getItem('ids')) {
    const ids = JSON.parse(localStorage.getItem('ids'))
    if (ids.tenant_id && ids.group_id) {
      accessLevel = 3 // group admin
    } else if (ids.tenant_id) {
      accessLevel = 2 // customer admin
    } else {
      accessLevel = 4 // error check user permissions
    }
  } else {
    accessLevel = 1 // admin
  }

  return (
    <div className={classes.page}>
      {checkAccesLevel(props.accessLevel, accessLevel, match) && (
        <DefaultLayout />
      )}
      {checkAccesLevel(props.accessLevel, accessLevel, match) ? (
        props.diplayedComponent
      ) : (
        <AccessDenied />
      )}
    </div>
  )
}

const UserPages = () => {
  const { getLocale, isLoadingLang, lang } = LanguagesStore
  return (
    <Switch>
      {userComponents.map(el => (
        <Route path={el.path} key={el.path} exact>
          <Page diplayedComponent={el.component} accessLevel={el.accessLevel} />
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
      {!isAuthorized && !localStorage.getItem('token') && (
        <Redirect to='/' exact />
      )}
      {!isAuthorized && !localStorage.getItem('token') && (
        <Route path='*' component={NotFound} />
      )}
    </Switch>
  )
})

const Router = () => {
  const { getLocal, isAuthorized } = AuthStore
  const { getLocale, isLoadingLang, lang } = LanguagesStore
  useEffect(() => {
    getLocal()
    getLocale(localStorage.getItem('i18nextLng'))
  }, [])

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
