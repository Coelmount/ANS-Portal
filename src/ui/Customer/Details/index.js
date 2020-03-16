import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'

import CustomContainer from 'components/CustomContainer'
import CustomersStore from 'stores/Customers'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const { customer, getCustomer, isLoadingCustomer } = useContext(
    CustomersStore
  )

  useEffect(() => {
    getCustomer(match.customerId)
  }, [getCustomer, match.customerId])

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
      <CustomContainer>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <TitleBlock titleData={titleData} />
      </CustomContainer>
      <DetailsTemplate data={customer} isLoading={isLoadingCustomer} />
    </div>
  )
})

export default withNamespaces()(withRouter(Details))
