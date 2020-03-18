import React, { useState, useContext, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import EditDeleteAdminStore from 'stores/EditDeleteAdministrator'

import Loading from 'components/Loading'
import CustomerAdministrators from 'stores/CustomerAdministrators'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import AddCustomerAdministratorModal from 'components/AdministratorsTemplate/components/AddCustomerAdministratorModal'
import AdminCard from 'components/AdministratorsTemplate/components/AdminCard'
import AdministratorsTemplate from 'components/AdministratorsTemplate'
import useStyles from './styles'

const Administrators = props => {
  const [isOpened, setIsOpened] = useState(false)
  const {
    admins,
    getCustomerAdmins,
    isLoading,
    admin,
    setAdminInfo,
    addCustomerAdmin
  } = useContext(CustomerAdministrators)

  const {
    updatedAdmin,
    getAdminInfo,
    updateAdminInfo,
    deleteAdmin,
    isLoadingData,
    updateCustomerAdmin,
    isDeletingAdmin
  } = useContext(EditDeleteAdminStore)

  const { t } = props
  const match = useParams()
  const classes = useStyles()

  useEffect(() => {
    getCustomerAdmins(match.customerId)
  }, [getCustomerAdmins, match.customerId])

  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      text: match.customerId
    },
    {
      text: t('administrators')
    }
  ]
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
          <Container>
            <CustomBreadcrumbs classes={classes} breadcrumbs={breadcrumbs} />
            <TitleBlock
              titleData={titleData}
              classes={classes}
              handleOpen={showModal}
            />
          </Container>
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

          <AddCustomerAdministratorModal
            show={isOpened}
            handleClose={hideModal}
            user={admin}
            setUserInfo={setAdminInfo}
            addAdmin={addAdmin}
            subject={t('customer_administrator')}
          />
        </Paper>
      )}
    </div>
  )
}

export default withNamespaces()(observer(Administrators))
