import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'

import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import SubaccountAdminsStore from 'stores/SubaccountAdmins'
import EditDeleteSubaccountAdminStore from 'stores/EditDeleteSubaccountsAdmin'
import SubaccountsStore from 'stores/Subaccounts'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import AddCustomerAdministratorModal from 'components/AdministratorsTemplate/components/AddCustomerAdministratorModal'
import AdministratorsTemplate from 'components/AdministratorsTemplate'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import NoAvailableDataBlock from 'components/NoAvailableDataBlock'

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
    addSubaccountAdmin,
    clearFields
  } = SubaccountAdminsStore

  const {
    updatedSubaccountAdmin,
    getSubaccountAdminInfo,
    updateSubaccountAdminInfo,
    deleteSubaccountAdmin,
    isLoadingData,
    updateSubaccountAdmin,
    isDeletingSubaccountAdmin
  } = EditDeleteSubaccountAdminStore

  const { getSubaccount, isLoadingSubaccount } = SubaccountsStore

  useEffect(() => {
    getSubaccountAdmins({ id: match.customerId, groupId: match.groupId })
  }, [getSubaccountAdmins, match.customerId, match.groupId])

  const titleData = {
    mainText: t('administrators'),
    iconCapture: t('add'),
    Icon: <PersonAddOutlinedIcon />
  }

  const showModal = () => {
    setIsOpened(true)
  }

  const hideModal = () => {
    setIsOpened(false)
    clearFields()
    getSubaccountAdmins({ id: match.customerId, groupId: match.groupId })
  }

  const addAdmin = defaultDomain => {
    addSubaccountAdmin({
      id: match.customerId,
      closeModal: hideModal,
      getUsers: getSubaccountAdmins,
      groupId: match.groupId,
      defaultDomain
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
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={showModal}
          />
        </CustomContainer>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            {subaccountAdmins.length ? (
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
            ) : (
              <NoAvailableDataBlock
                messageText={t('no_subadministrators_available')}
              />
            )}
          </Fragment>
        )}
        {isOpened && (
          <AddCustomerAdministratorModal
            show={isOpened}
            handleClose={hideModal}
            user={subaccountAdmin}
            setUserInfo={setSubaccountAdminInfo}
            addAdmin={addAdmin}
            subject={t('subaccount_administrator')}
            getUserInfo={getSubaccount}
            isLoadingUserInfo={isLoadingSubaccount}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(SubaccountAdministrators))
