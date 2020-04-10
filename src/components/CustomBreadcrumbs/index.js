import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { Typography } from '@material-ui/core'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import AuthStore from 'stores/Auth'
import DefaultLayoutStore from 'stores/DefaultLayout'

import useStyles from './styles'

const CustomBreadcrumbs = ({ match, t }) => {
  const { userLogin } = AuthStore
  const { handleCloseNav } = useContext(DefaultLayoutStore)
  const classes = useStyles()
  const { url } = match

  const isCustomerActive =
    userLogin.ids && userLogin.ids.tenant_id && !userLogin.ids.group_id
  const isSubaccountActive =
    userLogin.ids && userLogin.ids.tenant_id && userLogin.ids.group_id

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
        <Link to={`/${breadcrumb}`} className={classes.link} key={breadcrumb}>
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 1) {
      return (
        <Link
          to={`/customers/${breadcrumb}/access_numbers`}
          className={classes.link}
          key={breadcrumb}
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
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (breadcrumbsArr.length > 4 && index === 3) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/subaccounts/${match.params.groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
  }

  const customerLevel = (breadcrumb, index) => {
    if (index === 0) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/access_numbers`}
          className={classes.link}
          key={breadcrumb}
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
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    if (index === 2 && breadcrumbsArr.length > 3) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/subaccounts/${match.params.groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
  }

  const subaccountLevel = (breadcrumb, index) => {
    if (index === 0) {
      return (
        <Link
          to={`/customers/${match.params.customerId}/subaccounts/${match.params.groupId}/ans_instances`}
          className={classes.link}
          key={breadcrumb}
          onClick={handleCloseNav}
        >
          {t(breadcrumb)}
        </Link>
      )
    }
    return <Typography key={breadcrumb}>{t(breadcrumb)}</Typography>
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
          else if (isSubaccountActive) return subaccountLevel(breadcrumb, index)
          else return systemLevel(breadcrumb, index)
        })}
      }
    </Breadcrumbs>
  )
}

export default withNamespaces()(withRouter(CustomBreadcrumbs))
