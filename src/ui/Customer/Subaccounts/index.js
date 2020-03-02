import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'

import SubaccountsStore from 'stores/Subaccounts'
import CreateCustomerStore from 'stores/CreateCustomer'
import TitleBlock from './components/TitleBlock'
import SubaccountsTableToolbar from './components/SubaccountsTableToolbar'
import SubaccountsTableHead from './components/SubaccountsTableHead'
import SubaccountsTableBody from './components/SubaccountsTableBody'
import Pagination from './components/Pagination'
import DeleteModal from './components/DeleteModal'
import SubaccountBreadcrumbs from './components/SubaccountBreadcrumbs'
import Loading from 'components/Loading'
// import CreateCustomer from './components/CreateCustomerModal'

import useStyles from './styles'

const CustomersTable = observer(props => {
  const { match } = props
  const classes = useStyles()
  const {
    rows,
    getSubaccounts,
    deleteSubaccount,
    isLoadingSubaccounts,
    isDeletingSubaccount
  } = useContext(SubaccountsStore)

  const { setDefaultValues } = useContext(CreateCustomerStore)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [query, setQuery] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [subaccountToDelete, setSubaccountToDelete] = useState({})
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

  const list = query
    ? rows.filter(
        row =>
          row.tenantId.toLowerCase().includes(query) ||
          row.name.toLowerCase().includes(query)
      )
    : rows

  useEffect(() => {
    getSubaccounts(match.params.customerId)
  }, [getSubaccounts, match.params.customerId])

  useEffect(() => {
    const pages = Math.ceil(list.length / rowsPerPage)
    if (pages === 0) setTotalPages(0)
    else setTotalPages(pages - 1)
  }, [list.length, rowsPerPage])

  useEffect(() => {
    if (page > totalPages) setPage(0)
  }, [totalPages, page])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = action => {
    if (action === 'increase' && page < totalPages) {
      setPage(page + 1)
    } else if (action === 'decrease' && page > 0) {
      setPage(page - 1)
    }
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
      tenantId: match.params.customerId,
      groupId,
      callback: setIsDeleteModalOpen
    }
    deleteSubaccount(payload)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <SubaccountBreadcrumbs classes={classes} match={match} />
        <TitleBlock classes={classes} handleOpen={handleOpenCreateCustomer} />
        <SubaccountsTableToolbar
          classes={classes}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setQuery={setQuery}
        />
        {isLoadingSubaccounts ? (
          <Loading />
        ) : (
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby='tableTitle'
              size={'medium'}
              aria-label='enhanced table'
            >
              <SubaccountsTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                page={page}
              />
              <SubaccountsTableBody
                classes={classes}
                rowsPerPage={rowsPerPage}
                page={page}
                order={order}
                orderBy={orderBy}
                list={list}
                handleOpen={handleOpenDeleteModal}
              />
            </Table>
          </TableContainer>
        )}
        <Pagination
          classes={classes}
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        />
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            subaccountToDelete={subaccountToDelete}
            isDeletingSubaccount={isDeletingSubaccount}
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
