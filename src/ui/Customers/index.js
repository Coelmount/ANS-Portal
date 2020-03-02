import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import TitleBlock from './components/TitleBlock'
// import CustomersTableToolbar from './components/CustomersTableToolbar'
// import CustomersTableHead from './components/CustomersTableHead'
// import CustomersTableBody from './components/CustomersTableBody'
// import Pagination from './components/Pagination'
import DeleteModal from './components/DeleteModal'
import CreateCustomer from './components/CreateCustomerModal'
import CustomTable from 'components/CustomTable'

import useStyles from './styles'
import Loading from 'components/Loading'

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
  const { setDefaultValues } = useContext(CreateCustomerStore)
  // const [order, setOrder] = useState('asc')
  // const [orderBy, setOrderBy] = useState('id')
  // const [page, setPage] = useState(0)
  // const [rowsPerPage, setRowsPerPage] = useState(5)
  // const [totalPages, setTotalPages] = useState(0)
  const [query, setQuery] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState({})
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

  // const list = query
  //   ? rows.filter(
  //       row =>
  //         row.tenantId.toLowerCase().includes(query) ||
  //         row.name.toLowerCase().includes(query)
  //     )
  //   : rows

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  // useEffect(() => {
  //   const pages = Math.ceil(list.length / rowsPerPage)
  //   if (pages === 0) setTotalPages(0)
  //   else setTotalPages(pages - 1)
  // }, [list.length])

  // useEffect(() => {
  //   if (page > totalPages) setPage(0)
  // }, [])

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc'
  //   setOrder(isAsc ? 'desc' : 'asc')
  //   setOrderBy(property)
  // }

  // const handleChangePage = action => {
  //   if (action === 'increase' && page < totalPages) {
  //     setPage(page + 1)
  //   } else if (action === 'decrease' && page > 0) {
  //     setPage(page - 1)
  //   }
  // }

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
        <TitleBlock classes={classes} handleOpen={handleOpenCreateCustomer} />
        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingCustomers={isLoadingCustomers}
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
        {isOpenCreateCustomer && (
          <CreateCustomer
            open={isOpenCreateCustomer}
            handleClose={handleCloseCreateCustomer}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(CustomersTable)

// const a = [
//   {
//     b: 2,
//     c: 4,
//     d: 8
//   },
//   {
//     b: 2,
//     c: 4,
//     d: 8
//   }
// ]

// const columns = [
//   {
//     dataKey: 'b',
//     caption: 'Caption b',
//     transfromCellData: cellData => (
//       <Link to={`/haha1/${cellData.path}`}>{cellData}</Link>
//     )
//   },
//   {
//     caption: '',
//     transformCellData: (cellData, rowData) => 'X'
//   }
// ]

// const getRowData = index => a[index]

// ;<Table getRowData={getRowData} />
