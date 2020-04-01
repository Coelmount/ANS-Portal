import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import EntitlementsStore from 'stores/Entitlements'

import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'

import useStyles from './styles'

const CustomersTable = observer(({ t }) => {
  const classes = useStyles()
  const {
    rows,
    getCustomers,
    deleteCustomer,
    isLoadingCustomers,
    isDeletingCustomer,
    addCustomer
  } = useContext(CustomersStore)

  const { setDefaultValues: setDefaultValuesSubaccaunt } = useContext(
    CreateSubaccountStore
  )
  const { setDefaultValues } = useContext(CreateCustomerStore)
  const { setDefaultEntitlementsValues } = useContext(EntitlementsStore)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState({})
  const [creationType, setCreationType] = useState('')
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCloseCreateCustomer = () => {
    setIsOpenCreateCustomer(false)
  }

  const handleOpenCreateCustomer = () => {
    setDefaultValuesSubaccaunt()
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

  const handleDelete = id => {
    const payload = {
      id,
      callback: setIsDeleteModalOpen
    }
    deleteCustomer(payload)
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
        getCellData: row => (
          <Link
            to={`/customers/${row.tenantId}/access_numbers`}
            className={classes.link}
          >
            {row.tenantId}
          </Link>
        )
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
  }, [classes.deleteCell, classes.deleteCustomerIcon, classes.link])

  const titleData = {
    mainText: t('customers'),
    iconCapture: t('add_customer'),
    Icon: <PersonAddOutlinedIcon />
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={handleOpenCreateCustomer}
          />
        </CustomContainer>
        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingData={isLoadingCustomers}
          columns={columns}
          id='tenantId'
          name='name'
        />
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={customerToDelete}
            isDeleting={isDeletingCustomer}
            deleteSubject={t('customer')}
            action={t('to_delete')}
            titleAction={t(`delete`)}
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
      </Paper>
    </div>
  )
})

export default withNamespaces()(CustomersTable)
