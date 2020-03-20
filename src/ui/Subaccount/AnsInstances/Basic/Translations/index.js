import React from 'react'
import { withRouter } from 'react-router'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

const Translations = () => {
  return (
    <div>
      <p>Translations</p>
      <CustomBreadcrumbs />
    </div>
  )
}

export default withRouter(Translations)
