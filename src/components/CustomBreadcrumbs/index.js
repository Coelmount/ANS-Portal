import React from 'react'

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
          (breadcrumb.link && breadcrumb.link()) || (
            <Typography>{breadcrumb.text}</Typography>
          )
      )}
    </Breadcrumbs>
  )
}

export default CustomBreadcrumbs
