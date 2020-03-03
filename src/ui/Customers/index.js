import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import TitleBlock from './components/TitleBlock'
import DeleteModal from './components/DeleteModal'
// import CreateCustomer from './components/CreateCustomerModal'
import CustomTable from 'components/CustomTable'

import useStyles from './styles'

const CustomersTable = observer(() => {
  const classes = useStyles()
  const {
    rows,
    getCustomers,
    deleteCustomer,
    isLoadingCustomers,
    isDeletingCustomer
    // addCustomer
  } = useContext(CustomersStore)

  const { setDefaultValues } = useContext(CreateCustomerStore)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState({})
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  const columns = [
    {
      id: 'tenantId',
      numeric: false,
      extraProps: {
        scope: 'row'
      },
      label: 'ID',
      getCellData: row => (
        <Link
          to={`/customers/${row.tenantId}/access-numbers`}
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
      id: 'status',
      numeric: false,
      label: 'status',
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
          onClick={() => handleOpenDeleteModal(row.tenantId, row.name)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setCustomerToDelete({ id, name })
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

  const handleDelete = id => {
    const payload = {
      id,
      callback: setIsDeleteModalOpen
    }
    deleteCustomer(payload)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <button onClick={addCustomer}>add</button> */}
        <TitleBlock classes={classes} handleOpen={handleOpenCreateCustomer} />
        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingData={isLoadingCustomers}
          columns={columns}
        />
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            customerToDelete={customerToDelete}
            isDeletingCustomer={isDeletingCustomer}
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

export default withNamespaces()(CustomersTable)
