import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import TitleBlock from 'components/TitleBlock'
import DetailsTemplate from 'components/DetailsTemplate'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomContainer from 'components/CustomContainer'
import CreateCustomer from 'components/CreateCustomerModal'

import CustomersStore from 'stores/Customers'

import editSvg from 'source/images/svg/edit.svg'
import useStyles from './styles'

const Details = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const {
    customer,
    getCustomer,
    isLoadingCustomer,
    changeStep,
    getCustomerDefaultValues
  } = CustomersStore

  const [showEdit, setShowEdit] = useState(false)
  useEffect(() => {
    getCustomer(match.customerId)
  }, [getCustomer, match.customerId])

  useEffect(() => {
    getCustomerDefaultValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const titleData = {
    mainText: 'MTN ANS',
    helperText: 'details',
    iconCapture: t('edit'),
    Icon: <img src={editSvg} alt='edit icon' />
  }

  const handleOpenEdit = () => {
    changeStep(1)
    setShowEdit(true)
  }

  const handleCloseEdit = () => {
    setShowEdit(false)
    getCustomer(match.customerId)
  }

  return (
    <div className={classes.root}>
      <CustomContainer>
        <CustomBreadcrumbs />
        <TitleBlock titleData={titleData} handleOpen={handleOpenEdit} />
      </CustomContainer>
      <DetailsTemplate
        data={customer}
        isLoading={isLoadingCustomer}
        showOnly={'tenant'}
      />
      {showEdit && (
        <CreateCustomer
          open={showEdit}
          handleClose={handleCloseEdit}
          successClose={handleCloseEdit}
          store={CustomersStore}
          isEditCustomer
        />
      )}
    </div>
  )
})

export default withNamespaces()(withRouter(Details))
