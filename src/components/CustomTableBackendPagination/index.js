import React, { Fragment } from 'react'
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

export const DEFAULT_ROWS_PER_PAGE = 10

const CustomTable = ({
  classes,
  rows,
  isLoadingData,
  columns,
  showSearchBar,
  firstCell,
  showPagination,
  extraToolbarBlock,
  showToolBar,
  initialSearchQuery,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  order,
  setOrder,
  totalPages,
  orderBy,
  setOrderBy,
  query,
  setQuery,
  onPageChangeActions,
  noAvailableDataMessage,
  isModal,
  isSearchParamsActive,
  placeholderText,
  tableId,
  searchSelector,
  t
}) => {
  const defaultClasses = useStyles()

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const clampedPage = clamp(page, 1, totalPages)

  const rewindPage = step => {
    if (clampedPage + step >= 1 && clampedPage + step <= totalPages)
      setPage(clampedPage + step)
  }

  const changeRowsPerPage = newValue => {
    if (newValue > rows.length) setPage(1)
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
      {rows.length > 0 || isSearchParamsActive || query ? (
        <Fragment>
          {showToolBar && (
            <CustomTableToolbar
              classes={classes}
              defaultClasses={defaultClasses}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={changeRowsPerPage}
              query={query}
              setQuery={setQuery}
              showSearchBar={showSearchBar}
              showPagination={showPagination}
              extraToolbarBlock={extraToolbarBlock}
              initialSearchQuery={initialSearchQuery}
              placeholderText={placeholderText}
              changeRowsPerPage={changeRowsPerPage}
              searchSelector={searchSelector}
            />
          )}
          {isLoadingData ? (
            <Loading />
          ) : (
            <Fragment>
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
                  {rows && rows.length ? (
                    <CustomTableBody
                      classes={classes}
                      defaultClasses={defaultClasses}
                      rowsPerPage={rowsPerPage}
                      page={clampedPage}
                      rows={rows}
                      columns={columns}
                      firstCell={firstCell}
                      showPagination={showPagination}
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
              {showPagination && (
                <Pagination
                  classes={classes}
                  defaultClasses={defaultClasses}
                  page={page}
                  totalPages={totalPages}
                  rewindPage={rewindPage}
                  onPageChangeActions={onPageChangeActions}
                />
              )}
            </Fragment>
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
  onPageChangeActions: PropTypes.func,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  noAvailableDataMessage: PropTypes.string.isRequired,
  isModal: PropTypes.bool,
  isSearchParamsActive: PropTypes.bool,
  placeholderText: PropTypes.string
}

CustomTable.defaultProps = {
  showPagination: true,
  extraToolbarBlock: null,
  getSearchList: false,
  showToolBar: true,
  classes: {},
  initialSearchQuery: '',
  onPageChangeActions: () => {},
  isModal: false,
  isSearchParamsActive: false,
  placeholderText: '',
  searchSelector: null
}

export default withNamespaces()(CustomTable)
