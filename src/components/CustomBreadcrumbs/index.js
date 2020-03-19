import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import AuthStore from 'stores/Auth'

import useStyles from './styles'

const CustomBreadcrumbs = ({ breadcrumbs }) => {
  const { userLogin } = useContext(AuthStore)
  if (userLogin.profile && userLogin.profile.user_type === 'tenant_admin') {
    breadcrumbs.splice(0, 1)
  } else if (
    userLogin.profile &&
    userLogin.profile.user_type === 'no_userType'
  ) {
    breadcrumbs.splice(0, 2)
  }

  const classes = useStyles()
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      {breadcrumbs.map(
        breadcrumb =>
          (breadcrumb.url && (
            <Link
              className={classes.link}
              to={breadcrumb.url}
              key={breadcrumb.url}
            >
              {breadcrumb.text}
            </Link>
          )) || <Typography key={breadcrumb.text}>{breadcrumb.text}</Typography>
      )}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
