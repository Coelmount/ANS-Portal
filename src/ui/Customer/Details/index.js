import React from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = ({ t }) => {
  const match = useParams()
  const classes = useStyles()

  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      text: match.customerId
    },
    {
      text: t('details')
    }
  ]
  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('edit'),
    Icon: <img src={editSvg} alt='edit icon' />
  }

  return (
    <div className={classes.root}>
      <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
      <TitleBlock titleData={titleData} />
    </div>
  )
}

export default withNamespaces()(withRouter(Details))
