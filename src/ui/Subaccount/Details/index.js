import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import Container from '@material-ui/core/Container'

import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'

import SubaccountsStore from 'stores/Subaccounts'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const { subaccount, getSubaccount, isLoadingSubaccount } = useContext(
    SubaccountsStore
  )

  useEffect(() => {
    getSubaccount(match.customerId, match.groupId)
  }, [getSubaccount, match.customerId, match.groupId])

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
      <Container className={classes.container}>
        <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
        <TitleBlock titleData={titleData} />
      </Container>
      <DetailsTemplate data={subaccount} isLoading={isLoadingSubaccount} />
    </div>
  )
})

export default withNamespaces()(withRouter(Details))