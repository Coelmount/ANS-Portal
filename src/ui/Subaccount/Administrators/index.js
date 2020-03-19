import React, { useState, useContext, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import SubaccountAdminsStore from 'stores/SubaccountAdmins'
import EditDeleteSubaccountAdminStore from 'stores/EditDeleteSubaccountsAdmin'

import Loading from 'components/Loading'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import AddCustomerAdministratorModal from 'components/AdministratorsTemplate/components/AddCustomerAdministratorModal'
import AdministratorsTemplate from 'components/AdministratorsTemplate'

import useStyles from './styles'

const SubaccountAdministrators = props => {
  const { t } = props
  const [isOpened, setIsOpened] = useState(false)
  const match = useParams()
  const classes = useStyles()

  const {
    subaccountAdmins,
    subaccountAdmin,
    getSubaccountAdmins,
    isLoading,
    setSubaccountAdminInfo,
    addSubaccountAdmin
  } = useContext(SubaccountAdminsStore)

  const {
    updatedSubaccountAdmin,
    getSubaccountAdminInfo,
    updateSubaccountAdminInfo,
    deleteSubaccountAdmin,
    isLoadingData,
    updateSubaccountAdmin,
    isDeletingSubaccountAdmin
  } = useContext(EditDeleteSubaccountAdminStore)

  useEffect(() => {
    getSubaccountAdmins({ id: match.customerId, groupId: match.groupId })
  }, [getSubaccountAdmins, match.customerId, match.groupId])

  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      url: `/customers/${match.customerId}/access-numbers`,
      text: match.customerId
    },
    {
      text: match.groupId
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
    addSubaccountAdmin({
      id: match.customerId,
      closeModal: hideModal,
      getUsers: getSubaccountAdmins,
      groupId: match.groupId
    })
  }

  const handleDelete = adminId => {
    deleteSubaccountAdmin({
      id: match.customerId,
      closeModal: hideModal,
      userId: adminId,
      getUsers: getSubaccountAdmins,
      groupId: match.groupId
    })
  }

  const handleUpdate = adminId => {
    updateSubaccountAdmin({
      id: match.customerId,
      closeModal: hideModal,
      userId: adminId,
      getUsers: getSubaccountAdmins,
      groupId: match.groupId
    })
  }

  const getAdminInfo = adminId => {
    getSubaccountAdminInfo({
      id: match.customerId,
      userId: adminId,
      groupId: match.groupId
    })
  }

  return (
    <div className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Paper className={classes.paper}>
          <CustomContainer>
            <CustomBreadcrumbs classes={classes} breadcrumbs={breadcrumbs} />
            <TitleBlock
              titleData={titleData}
              classes={classes}
              handleOpen={showModal}
            />
          </CustomContainer>
          <AdministratorsTemplate
            data={subaccountAdmins}
            admin={subaccountAdmin}
            updatedUser={updatedSubaccountAdmin}
            getAdminInfo={getAdminInfo}
            updateInfo={updateSubaccountAdminInfo}
            isLoadingData={isLoadingData}
            isDeleting={isDeletingSubaccountAdmin}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
            subject={t('subaccount_administrator')}
          />
          <AddCustomerAdministratorModal
            show={isOpened}
            handleClose={hideModal}
            user={subaccountAdmin}
            setUserInfo={setSubaccountAdminInfo}
            addAdmin={addAdmin}
            subject={t('subaccount_administrator')}
          />
        </Paper>
      )}
    </div>
  )
}

export default withNamespaces()(observer(SubaccountAdministrators))
