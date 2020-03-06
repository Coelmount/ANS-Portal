import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import SubaccountsStore from 'stores/Subaccounts'
import CreateCustomerStore from 'stores/CreateCustomer'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
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
  } = useContext(SubaccountsStore)

  const { setDefaultValues } = useContext(CreateCustomerStore)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [subaccountToDelete, setSubaccountToDelete] = useState({})
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

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
      getCellData: row => (
        <Link to={`/customers/`} className={classes.link}>
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
      getCellData: row => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]
  const breadcrumbs = [
    {
      url: '/customers',
      text: t('customers')
    },
    {
      text: match.customerId
    },
    {
      text: t('subaccounts')
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

  const handleCloseCreateCustomer = () => {
    setIsOpenCreateCustomer(false)
    setDefaultValues()
  }

  const handleOpenCreateCustomer = () => {
    setIsOpenCreateCustomer(true)
  }

  const handleDelete = groupId => {
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
        <Container>
          <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={handleOpenCreateCustomer}
          />
        </Container>

        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingData={isLoadingSubaccounts}
          columns={columns}
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
          />
        )}
        {/* {isOpenCreateCustomer && (
          <CreateCustomer
            open={isOpenCreateCustomer}
            handleClose={handleCloseCreateCustomer}
          />
        )} */}
      </Paper>
    </div>
  )
})

export default withNamespaces()(SubaccountsTable)
