import React, { useEffect, useState, Fragment } from 'react'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'

import CustomTableToolbar from './components/CustomTableToolbar'
import CustomTableHead from './components/CustomTableHead'
import CustomTableBody from './components/CustomTableBody'
import Pagination from './components/Pagination'

import Loading from 'components/Loading'

const CustomTable = props => {
  const { classes, rows, isLoadingData, columns } = props

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [query, setQuery] = useState('')

  const list = query
    ? rows.filter(
        row =>
          row.tenantId.toLowerCase().includes(query) ||
          row.name.toLowerCase().includes(query)
      )
    : rows

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

  return (
    <Fragment>
      <CustomTableToolbar
        classes={classes}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        setQuery={setQuery}
      />
      {isLoadingData ? (
        <Loading />
      ) : (
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={'medium'}
            aria-label='enhanced table'
          >
            <CustomTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
              columns={columns}
            />
            <CustomTableBody
              classes={classes}
              rowsPerPage={rowsPerPage}
              rows={rows}
              page={page}
              order={order}
              orderBy={orderBy}
              list={list}
              columns={columns}
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
    </Fragment>
  )
}

export default CustomTable
