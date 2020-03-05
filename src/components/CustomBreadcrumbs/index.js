import React from 'react'
import { Link } from 'react-router-dom'

import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const CustomBreadcrumbs = ({ classes, breadcrumbs }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize='small' />}
      aria-label='breadcrumb'
      className={classes.breadcrumbsWrap}
    >
      {breadcrumbs.map(
        breadcrumb =>
          (breadcrumb.url && (
            <Link className={classes.link} to={breadcrumb.url}>
              {breadcrumb.text}
            </Link>
          )) || <Typography>{breadcrumb.text}</Typography>
      )}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
