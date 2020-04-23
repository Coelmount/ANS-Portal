import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CreateCustomer from 'components/CreateCustomerModal'

import SubaccountsStore from 'stores/Subaccounts'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const {
    customer: subaccount,
    getSubaccount,
    isLoadingSubaccount,
    changeStep
  } = SubaccountsStore
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    getSubaccount(match.customerId, match.groupId)
  }, [getSubaccount, match.customerId, match.groupId])

  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('edit'),
    Icon: <img src={editSvg} alt='edit icon' />
  }

  const handleOpenEdit = () => {
    changeStep(1)
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
    getSubaccount(match.customerId, match.groupId)
  }

  return (
    <div className={classes.root}>
      <CustomContainer>
        <CustomBreadcrumbs />
        <TitleBlock titleData={titleData} handleOpen={handleOpenEdit} />
      </CustomContainer>
      <DetailsTemplate data={subaccount} isLoading={isLoadingSubaccount} />
      {showEdit && (
        <CreateCustomer
          open={showEdit}
          handleClose={handleCloseEdit}
          successClose={handleCloseEdit}
          store={SubaccountsStore}
          isEditSubaccount
        />
      )}
    </div>
  )
})

export default withNamespaces()(withRouter(Details))
