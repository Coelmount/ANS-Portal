import React, { useState, useMemo, Fragment, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import PropTypes from 'prop-types'
import clamp from 'lodash/clamp'
import set from 'lodash/set'

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
import NoAvailableDataBlock from 'components/NoAvailableDataBlock'

import useStyles from './defaultStyles'

const DEFAULT_ROWS_PER_PAGE = 10

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
  const compareA =
    typeof a[orderBy] === 'string' ? a[orderBy].toLowerCase() : a[orderBy]
  const compareB =
    typeof b[orderBy] === 'string' ? b[orderBy].toLowerCase() : b[orderBy]

  if (compareB < compareA) {
    return -1
  }
  if (compareB > compareA) {
    return 1
  }
  return 0
}

const CustomTable = ({
  classes,
  rows,
  isLoadingData,
  columns,
  showSearchBar,
  firstCell,
  showPagination,
  extraToolbarBlock,
  searchCriterias,
  getSearchList,
  showToolBar,
  initialSearchQuery,
  noAvailableDataMessage,
  isModal,
  placeholderText,
  idColStyles,
  tableId,
  t
}) => {
  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))[tableId]
    : null

  const defaultClasses = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(
    storageRowsPerPage || DEFAULT_ROWS_PER_PAGE
  )
  const [query, setQuery] = useState(initialSearchQuery)

  useEffect(() => {
    setPage(0)
  }, [query])

  const list = useMemo(() => {
    const getFilter = row => {
      for (let i = 0; i < searchCriterias.length; i++) {
        if (
          row[searchCriterias[i]] &&
          row[searchCriterias[i]].toLowerCase().includes(query.toLowerCase())
        ) {
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
    if (rowsPerPage > list.length) return 0
    const pages = Math.ceil(list.length / rowsPerPage)
    return pages ? pages - 1 : pages
  }, [list.length, rowsPerPage])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
    setPage(0)
  }

  const clampedPage = clamp(page, 0, totalPages)

  const rewindPage = step => {
    if (clampedPage + step >= 0 && clampedPage + step <= totalPages)
      setPage(clampedPage + step)
  }

  const changeRowsPerPage = newValue => {
    if (newValue > list.length) setPage(0)
    setRowsPerPage(newValue)
    if (tableId) {
      let rowsPerPageScheme = JSON.parse(
        localStorage.getItem('rowsPerPageScheme')
      )
      if (rowsPerPageScheme) {
        set(rowsPerPageScheme, tableId, newValue)
      } else {
        rowsPerPageScheme = { [tableId]: newValue }
      }
      localStorage.setItem(
        'rowsPerPageScheme',
        JSON.stringify(rowsPerPageScheme)
      )
    }
  }

  return (
    <Fragment>
      {rows.length > 0 ? (
        <Fragment>
          {showToolBar && (
            <CustomTableToolbar
              classes={classes}
              defaultClasses={defaultClasses}
              rowsPerPage={rowsPerPage}
              changeRowsPerPage={changeRowsPerPage}
              query={query}
              setQuery={setQuery}
              showSearchBar={showSearchBar}
              showPagination={showPagination}
              extraToolbarBlock={extraToolbarBlock}
              initialSearchQuery={initialSearchQuery}
              placeholderText={placeholderText}
            />
          )}
          {isLoadingData ? (
            <Loading />
          ) : (
            <TableContainer>
              <Table
                className={`${classes.table} ${defaultClasses.table}`}
                aria-labelledby='tableTitle'
                size={'medium'}
                aria-label='enhanced table'
              >
                <CustomTableHead
                  classes={classes}
                  defaultClasses={defaultClasses}
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  columns={columns}
                  firstCell={firstCell}
                />
                {list && list.length ? (
                  <CustomTableBody
                    classes={classes}
                    defaultClasses={defaultClasses}
                    rowsPerPage={rowsPerPage}
                    page={clampedPage}
                    list={list}
                    columns={columns}
                    firstCell={firstCell}
                    showPagination={showPagination}
                    idColStyles={idColStyles}
                  />
                ) : (
                  <TableBody>
                    <TableRow>
                      <TableCell style={{ borderBottom: 'none' }}>
                        <Typography
                          className={`${classes.tableMessage} ${defaultClasses.tableMessage}`}
                        >
                          {t('no_search_result')}
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
              defaultClasses={defaultClasses}
              page={page}
              totalPages={totalPages}
              rewindPage={rewindPage}
            />
          )}
        </Fragment>
      ) : (
        <NoAvailableDataBlock
          messageText={noAvailableDataMessage}
          isModal={isModal}
        />
      )}
    </Fragment>
  )
}

CustomTable.propTypes = {
  showPagination: PropTypes.bool,
  extraToolbarBlock: PropTypes.func,
  initialSearchQuery: PropTypes.string,
  noAvailableDataMessage: PropTypes.string.isRequired,
  isModal: PropTypes.bool,
  placeholderText: PropTypes.string
}

CustomTable.defaultProps = {
  showPagination: true,
  extraToolbarBlock: null,
  getSearchList: false,
  showToolBar: true,
  classes: {},
  initialSearchQuery: '',
  isModal: false,
  placeholderText: ''
}

export default withNamespaces()(CustomTable)
