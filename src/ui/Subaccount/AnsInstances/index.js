import React from 'react'
import { withRouter } from 'react-router'
import CustomBreadctumbs from 'components/CustomBreadcrumbs'

const AnsInstances = () => {
  return (
    <div>
      <CustomBreadctumbs />
      <p>AnsInstances</p>
    </div>
  )
}

export default withRouter(AnsInstances)
