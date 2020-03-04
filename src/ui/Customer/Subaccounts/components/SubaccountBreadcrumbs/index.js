import React from 'react'
import { Link } from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const SubaccountBreadcrumbs = ({ classes, match }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      <Link className={classes.link} to='/customers'>
        Customers
      </Link>
      <Typography>{`${match.customerId}`}</Typography>
      <Typography>Subaccounts</Typography>
    </Breadcrumbs>
  )
}

export default SubaccountBreadcrumbs
