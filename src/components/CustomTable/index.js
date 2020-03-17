import React, { useState, useMemo, Fragment } from 'react'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'

import CustomTableToolbar from './components/CustomTableToolbar'
import CustomTableHead from './components/CustomTableHead'
import CustomTableBody from './components/CustomTableBody'
import Pagination from './components/Pagination'
import Loading from 'components/Loading'

const CustomTable = ({ classes, rows, isLoadingData, columns }) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [query, setQuery] = useState('')

  const memoizedList = useMemo(
    () =>
      rows.filter(
        row =>
          row.groupId.toLowerCase().includes(query) ||
          row.groupName.toLowerCase().includes(query)
      ),
    [query, rows]
  )

  const list = query ? memoizedList : rows

  useMemo(() => {
    const pages = Math.ceil(list.length / rowsPerPage)
    if (pages === 0) setTotalPages(0)
    else setTotalPages(pages - 1)
  }, [list.length, rowsPerPage])

  useMemo(() => {
    if (page > totalPages) setPage(0)
  }, [page, totalPages])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = action => {
    action === 'increase' && page < totalPages && setPage(page => page + 1)
    action === 'decrease' && page > 0 && setPage(page => page - 1)
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
