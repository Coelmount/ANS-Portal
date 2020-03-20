import React from 'react'
import { withRouter } from 'react-router'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

const IVR = () => {
  return (
    <div>
      <p>IVR</p>
      <CustomBreadcrumbs />
    </div>
  )
}

export default withRouter(IVR)
