import React, { useState, useMemo, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'
import clamp from 'lodash/clamp'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

import CustomTableToolbar from './components/CustomTableToolbar'
import CustomTableHead from './components/CustomTableHead'
import CustomTableBody from './components/CustomTableBody'
import Pagination from './components/Pagination'
import Loading from 'components/Loading'
import { ConsoleWriter } from 'istanbul-lib-report'

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
  showSearchBar,
  firstCell,
  showPagination,
  extraToolbarBlock,
  searchCriterias,
  getSearchList,
  showToolBar,
  t
}) => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [query, setQuery] = useState('')

  const list = useMemo(() => {
    const getFilter = row => {
      for (let i = 0; i < searchCriterias.length; i++) {
        if (row[searchCriterias[i]].toLowerCase().includes(query)) {
          return true
        }
      }
      return false
    }
    if (!rows) return []
    const filteredRows = query ? rows.filter(row => getFilter(row)) : rows
    const result = stableSort(filteredRows, getComparator(order, orderBy))
    getSearchList && getSearchList(result)
    return result
  }, [rows, query, order, orderBy, getSearchList])

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
    if (clampedPage + step >= 0 && clampedPage + step <= totalPages)
      setPage(clampedPage + step)
  }

  return (
    <Fragment>
      {showToolBar && (
        <CustomTableToolbar
          classes={classes}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setQuery={setQuery}
          showSearchBar={showSearchBar}
          showPagination={showPagination}
          extraToolbarBlock={extraToolbarBlock}
        />
      )}
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
              firstCell={firstCell}
            />
            {list && list.length ? (
              <CustomTableBody
                classes={classes}
                rowsPerPage={rowsPerPage}
                page={clampedPage}
                list={list}
                columns={columns}
                firstCell={firstCell}
                showPagination={showPagination}
              />
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell style={{ borderBottom: 'none' }}>
                    <Typography className={classes.tableMessage}>
                      {t('no_customers_yet')}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      )}
      {showPagination && (
        <Pagination
          classes={classes}
          page={page}
          totalPages={totalPages}
          rewindPage={rewindPage}
        />
      )}
    </Fragment>
  )
}

CustomTable.propTypes = {
  showPagination: PropTypes.bool,
  extraToolbarBlock: PropTypes.func
}

CustomTable.defaultProps = {
  showPagination: true,
  extraToolbarBlock: null,
  getSearchList: false,
  showToolBar: true
}

export default withNamespaces()(CustomTable)
