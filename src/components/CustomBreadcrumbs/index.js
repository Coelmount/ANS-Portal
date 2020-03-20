import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Typography } from '@material-ui/core'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import AuthStore from 'stores/Auth'

import useStyles from './styles'

const CustomBreadcrumbs = ({ match, t }) => {
  const { userLogin } = useContext(AuthStore)
  const classes = useStyles()
  const { url } = match

  const isCustomerActive =
    userLogin.profile && userLogin.profile.user_type === 'tenant_admin'
  const isSubaccountActive =
    userLogin.profile && userLogin.profile.user_type === 'no_userType'

  const breadcrumbsArr = url.split('/')
  if (isCustomerActive) {
    breadcrumbsArr.splice(0, 2)
  } else if (isSubaccountActive) {
    breadcrumbsArr.splice(0, 4)
  } else {
    breadcrumbsArr.splice(0, 1)
  }

  const systemLevel = (breadcrumb, index) => {
    if (breadcrumbsArr.length > 2 && index === 0) {
      return (
        <Link to={`/${breadcrumb}`} className={classes.link}>
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsArr.length > 4 && index === 1) {
      return (
        <Link
          to={`/customers/${breadcrumb}/access-numbers`}
          className={classes.link}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsArr.length > 4 && index === 2) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/subaccounts`}
          className={classes.link}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography>{t(breadcrumb)}</Typography>
  }

  const customerLevel = (breadcrumb, index) => {
    if (index === 0) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/access-numbers`}
          className={classes.link}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1 && breadcrumbsArr.length > 2) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/subaccounts`}
          className={classes.link}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography>{t(breadcrumb)}</Typography>
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      {breadcrumbsArr.length > 1 &&
        breadcrumbsArr.map((breadcrumb, index) => {
          if (isCustomerActive) return customerLevel(breadcrumb, index)
          else return systemLevel(breadcrumb, index)
        })}
      }
    </Breadcrumbs>
  )
}

export default withNamespaces()(withRouter(CustomBreadcrumbs))
