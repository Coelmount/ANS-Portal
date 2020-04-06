import React, { useContext, useEffect } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import SubaccountsStore from 'stores/Subaccounts'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const { subaccount, getSubaccount, isLoadingSubaccount } = SubaccountsStore

  useEffect(() => {
    getSubaccount(match.customerId, match.groupId)
  }, [getSubaccount, match.customerId, match.groupId])

  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('edit'),
    Icon: <img src={editSvg} alt='edit icon' />
  }

  return (
    <div className={classes.root}>
      <CustomContainer>
        <CustomBreadcrumbs />
        <TitleBlock titleData={titleData} />
      </CustomContainer>
      <DetailsTemplate data={subaccount} isLoading={isLoadingSubaccount} />
    </div>
  )
})

export default withNamespaces()(withRouter(Details))
