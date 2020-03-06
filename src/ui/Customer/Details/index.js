import React, { useContext } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Container from '@material-ui/core/Container'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'

import CustomersStore from 'stores/Customers'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'
import { useEffect } from 'react'

const Details = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const { customer, getCustomer } = useContext(CustomersStore)

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
      <Container>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <TitleBlock titleData={titleData} />
        <DetailsTemplate data={customer} />
      </Container>
    </div>
  )
}

export default withNamespaces()(withRouter(Details))
