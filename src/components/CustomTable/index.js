import React, { useState, useMemo, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import clamp from 'lodash/clamp'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import Typography from '@material-ui/core/Typography'

import CustomTableToolbar from './components/CustomTableToolbar'
import CustomTableHead from './components/CustomTableHead'
import CustomTableBody from './components/CustomTableBody'
import Pagination from './components/Pagination'
import Loading from 'components/Loading'

const getComparator = (order, orderBy) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const CustomTable = ({
  classes,
  rows,
  isLoadingData,
  columns,
  id,
  name,
  t
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    if (!rows) return []
    const filteredRows = query
      ? rows.filter(
          row =>
            row[id].toLowerCase().includes(query) ||
            row[name].toLowerCase().includes(query)
        )
      : rows
    return stableSort(filteredRows, getComparator(order, orderBy))
  }, [id, name, query, rows, order, orderBy])

  const totalPages = useMemo(() => {
    const pages = Math.ceil(list.length / rowsPerPage)
    return pages ? pages - 1 : pages
  }, [list.length, rowsPerPage])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const clampedPage = clamp(page, 0, totalPages)

  const rewindPage = step => {
    setPage(clampedPage + step)
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
              columns={columns}
            />
            {list && list.length ? (
              <CustomTableBody
                classes={classes}
                rowsPerPage={rowsPerPage}
                page={clampedPage}
                list={list}
                columns={columns}
              />
            ) : (
              <Typography className={classes.tableMessage}>
                {t('no_customers_yet')}
              </Typography>
            )}
          </Table>
        </TableContainer>
      )}
      <Pagination
        classes={classes}
        page={page}
        totalPages={totalPages}
        rewindPage={rewindPage}
      />
    </Fragment>
  )
}

export default withNamespaces()(CustomTable)
