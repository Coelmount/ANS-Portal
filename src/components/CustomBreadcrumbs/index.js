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
  console.log(match, 'match')
  const { userLogin } = useContext(AuthStore)
  const classes = useStyles()
  const { url, path } = match
  const breadcrumbsArr = url.split('/')

  if (userLogin.profile && userLogin.profile.user_type === 'tenant_admin') {
    breadcrumbsArr.splice(0, 2)
  } else if (
    userLogin.profile &&
    userLogin.profile.user_type === 'no_userType'
  ) {
    breadcrumbsArr.splice(0, 4)
  } else {
    breadcrumbsArr.splice(0, 1)
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      {breadcrumbsArr.length > 1 &&
        breadcrumbsArr.map((breadcrumb, index) => {
          console.log(breadcrumb, index)
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
            console.log(match, 'match id in index 2')
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
        })}
      }
    </Breadcrumbs>
  )
}

export default withNamespaces()(withRouter(CustomBreadcrumbs))
