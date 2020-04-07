import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import SubaccountsStore from 'stores/Subaccounts'
import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import useStyles from './styles'

const SubaccountsTable = observer(({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const {
    rows,
    getSubaccounts,
    deleteSubaccount,
    isLoadingSubaccounts,
    isDeletingSubaccount
  } = SubaccountsStore

  const { setDefaultValues } = CreateSubaccountStore
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [subaccountToDelete, setSubaccountToDelete] = useState({})
  const [isOpenCreateSubaccount, setIsOpenCreateSubaccount] = useState(false)

  useEffect(() => {
    getSubaccounts(match.customerId)
  }, [getSubaccounts, match.customerId])

  const columns = [
    {
      id: 'groupId',
      numeric: false,
      extraProps: {
        scope: 'row'
      },
      label: 'ID',
      getCellData: (row) => (
        <Link
          to={`/customers/${match.customerId}/subaccounts/${row.groupId}/ans_instances`}
          className={classes.link}
        >
          {row.groupId}
        </Link>
      ),
      extraHeadProps: {
        padding: 'default'
      }
    },
    {
      id: 'groupName',
      numeric: false,
      label: 'name',
      extraProps: {
        scope: 'row'
      }
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: (row) => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  const titleData = {
    mainText: 'MTN ANS',
    iconCapture: t('add_subaccount'),
    Icon: <AddOutlinedIcon />
  }

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setSubaccountToDelete({ id, name })
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCloseCreateSubaccount = () => {
    setIsOpenCreateSubaccount(false)
  }

  const handleOpenCreateSubaccount = () => {
    setDefaultValues()
    setIsOpenCreateSubaccount(true)
  }

  const handleCloseCreateSubaccountSuccess = () => {
    setIsOpenCreateSubaccount(false)
    getSubaccounts(match.customerId)
  }

  const handleDelete = (groupId) => {
    const payload = {
      tenantId: match.customerId,
      groupId,
      callback: setIsDeleteModalOpen
    }
    deleteSubaccount(payload)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={handleOpenCreateSubaccount}
          />
        </CustomContainer>

        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingData={isLoadingSubaccounts}
          columns={columns}
          searchCriterias={['groupId', 'groupName']}
        />
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={subaccountToDelete}
            isDeleting={isDeletingSubaccount}
            deleteSubject={t('subaccount')}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
        {isOpenCreateSubaccount && (
          <CreateCustomer
            open={isOpenCreateSubaccount}
            handleClose={handleCloseCreateSubaccount}
            successClose={handleCloseCreateSubaccountSuccess}
            isCreateSubaccount
            store={CreateSubaccountStore}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(SubaccountsTable)
