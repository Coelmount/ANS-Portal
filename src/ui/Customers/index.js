import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import EntitlementsStore from 'stores/Entitlements'

import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteConfirmModal from 'components/DeleteConfirmModal'

import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import Loading from 'components/Loading'
import UpdateStatus from './components/UpdateStatus'

import useStyles from './styles'

const CustomersTable = observer(({ t }) => {
  const classes = useStyles()
  const {
    rows,
    getCustomers,
    deleteCustomer,
    isLoadingCustomers,
    isDeletingCustomer,
    setDefaultTableValues
  } = CustomersStore

  const { setDefaultValues: setDefaultValuesSubaccount } = CreateSubaccountStore

  const { setDefaultValues } = CreateCustomerStore
  const { setDefaultEntitlementsValues } = EntitlementsStore
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState({})
  const [creationType, setCreationType] = useState('')
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)
  const [showUpdateStatus, setShowUpdateStatus] = useState(false)
  const [tenantForUpdate, setTenantForUpdate] = useState({})

  useEffect(() => {
    getCustomers()
    return () => setDefaultTableValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setDefaultTableValues])

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCloseCreateCustomer = () => {
    setIsOpenCreateCustomer(false)
    getCustomers()
  }

  const handleOpenCreateCustomer = () => {
    setDefaultValuesSubaccount()
    setDefaultEntitlementsValues()
    setDefaultValues()
    setCreationType('customer')
    setIsOpenCreateCustomer(true)
  }

  const handleCloseCreateCustomerSuccess = () => {
    setIsOpenCreateCustomer(false)
    getCustomers()
  }

  const createSubaccount = () => {
    setCreationType('subaccount')
  }

  const handleDelete = () => {
    const payload = {
      id: customerToDelete.id,
      callback: setIsDeleteModalOpen
    }
    deleteCustomer(payload)
  }

  const handleOpenUpdateModal = row => {
    setShowUpdateStatus(true)
    setTenantForUpdate(row)
  }

  const handleCloseUpdateModal = () => {
    setShowUpdateStatus(false)
    getCustomers()
  }

  const columns = useMemo(() => {
    const handleOpenDeleteModal = (id, name) => {
      setIsDeleteModalOpen(true)
      setCustomerToDelete({ id, name })
    }
    return [
      {
        id: 'tenantId',
        numeric: false,
        extraProps: {
          scope: 'row'
        },
        label: 'ID',
        getCellData: row => {
          return (
            <Link
              to={`/customers/${row.tenantId}/access_numbers`}
              className={classes.link}
            >
              {row.tenantId}
            </Link>
          )
        }
      },
      {
        id: 'name',
        numeric: false,
        label: 'name',
        extraProps: {
          scope: 'row'
        }
      },
      {
        id: 'status',
        label: 'status',
        extraHeadProps: {
          align: 'center',
          padding: 'none',
          width: '100px'
        },
        getCellData: row => (
          <Box className={classes.statusCellBox}>
            <EditOutlinedIcon
              onClick={() => handleOpenUpdateModal(row)}
              className={classes.deleteCustomerIcon}
            />
          </Box>
        )
      },
      {
        id: 'delete',
        extraProps: {
          className: classes.deleteCell,
          align: 'right'
        },
        isSortAvailable: false,
        getCellData: row => (
          <CloseOutlinedIcon
            onClick={() => handleOpenDeleteModal(row.tenantId, row.name)}
            className={classes.deleteCustomerIcon}
          />
        )
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classes.deleteCell, classes.deleteCustomerIcon, classes.link])

  const titleData = {
    mainText: 'customers',
    iconCapture: t('add_customer'),
    Icon: <PersonAddOutlinedIcon />
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <TitleBlock
            titleData={titleData}
            handleOpen={handleOpenCreateCustomer}
          />
        </CustomContainer>
        {isLoadingCustomers ? (
          <Loading />
        ) : (
          <CustomTable
            rows={rows}
            columns={columns}
            searchCriterias={['tenantId', 'name']}
            noAvailableDataMessage={t('no_customers_available')}
            tableId='customers'
          />
        )}
        {isDeleteModalOpen && (
          <DeleteConfirmModal
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            isLoading={isDeletingCustomer}
            title={t('delete_customer')}
            deleteSubject={t('customer')}
            deleteObject={`${customerToDelete.name} (id: ${customerToDelete.id})`}
          />
        )}
        {isOpenCreateCustomer && (
          <CreateCustomer
            open={isOpenCreateCustomer}
            handleClose={handleCloseCreateCustomer}
            successClose={handleCloseCreateCustomerSuccess}
            store={
              creationType === 'subaccount'
                ? CreateSubaccountStore
                : CreateCustomerStore
            }
            createSubaccount={createSubaccount}
            isCreateSubaccount={creationType === 'subaccount'}
          />
        )}
        {showUpdateStatus && (
          <UpdateStatus
            open={showUpdateStatus}
            tenant={tenantForUpdate}
            handleClose={handleCloseUpdateModal}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(CustomersTable)
