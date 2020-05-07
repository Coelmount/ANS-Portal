import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import EditDeleteAdminStore from 'stores/EditDeleteAdministrator'
import CustomerAdministrators from 'stores/CustomerAdministrators'
import CustomersStore from 'stores/Customers'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import AddCustomerAdministratorModal from 'components/AdministratorsTemplate/components/AddCustomerAdministratorModal'
import CustomContainer from 'components/CustomContainer'
import AdministratorsTemplate from 'components/AdministratorsTemplate'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import NoAvailableDataBlock from 'components/NoAvailableDataBlock'

import useStyles from './styles'

const Administrators = props => {
  const [isOpened, setIsOpened] = useState(false)
  const {
    admins,
    getCustomerAdmins,
    isLoading,
    admin,
    setAdminInfo,
    addCustomerAdmin,
    clearFields
  } = CustomerAdministrators

  const {
    updatedAdmin,
    getAdminInfo,
    updateAdminInfo,
    deleteAdmin,
    isLoadingData,
    updateCustomerAdmin,
    isDeletingAdmin
  } = EditDeleteAdminStore

  const {
    getCustomer,
    // customer,
    isLoadingCustomer
  } = CustomersStore

  const { t } = props
  const match = useParams()
  const classes = useStyles()

  useEffect(() => {
    getCustomerAdmins(match.customerId)
  }, [getCustomerAdmins, match.customerId])

  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('add'),
    Icon: <PersonAddOutlinedIcon />
  }

  const showModal = () => {
    setIsOpened(true)
  }
  const hideModal = () => {
    setIsOpened(false)
    clearFields()
  }
  const addAdmin = () => {
    addCustomerAdmin({
      id: match.customerId,
      closeModal: hideModal,
      getUsers: getCustomerAdmins
    })
  }
  const handleDelete = adminId => {
    deleteAdmin({
      id: match.customerId,
      closeModal: hideModal,
      userId: adminId,
      getUsers: getCustomerAdmins
    })
  }
  const handleUpdate = adminId => {
    updateCustomerAdmin({
      id: match.customerId,
      closeModal: hideModal,
      userId: adminId,
      getUsers: getCustomerAdmins
    })
  }

  const getAdminInfoHandle = adminId => {
    getAdminInfo({
      id: match.customerId,
      userId: adminId
    })
  }
  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Paper className={classes.paper}>
          <CustomContainer>
            <CustomBreadcrumbs />
            <TitleBlock
              titleData={titleData}
              classes={classes}
              handleOpen={showModal}
            />
          </CustomContainer>
          {admins.length ? (
            <AdministratorsTemplate
              data={admins}
              admin={admin}
              updatedUser={updatedAdmin}
              getAdminInfo={getAdminInfoHandle}
              updateInfo={updateAdminInfo}
              isLoadingData={isLoadingData}
              isDeleting={isDeletingAdmin}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
              subject={t('customer_administrator')}
            />
          ) : (
            <NoAvailableDataBlock />
          )}

          <AddCustomerAdministratorModal
            show={isOpened}
            handleClose={hideModal}
            user={admin}
            setUserInfo={setAdminInfo}
            addAdmin={addAdmin}
            subject={t('customer_administrator')}
            getUserInfo={getCustomer}
            isLoadingUserInfo={isLoadingCustomer}
          />
        </Paper>
      )}
    </div>
  )
}

export default withNamespaces()(observer(Administrators))
