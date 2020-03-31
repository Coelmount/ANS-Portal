import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography } from '@material-ui/core'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import Checkbox from 'components/Checkbox'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomTableHead = ({
  classes,
  order,
  orderBy,
  onRequestSort,
  columns,
  handleSelectAllClick,
  isFullVersion,
  rowsPerPage,
  setRowsPerPage,
  withFilters,
  t
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={classes.thead}>
      <TableRow>
        <TableCell className={classes.checkboxHead}>
          {isFullVersion && (
            <Checkbox
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={rowCount > 0 && numSelected === rowCount}
              onChange={handleSelectAllClick}
              className={classes.checkbox}
            />
          )}
        </TableCell>
        {columns.map(({ id, label, extraHeadProps }) =>
          id === 'delete' ? (
            <TableCell className={classes.paginationHeadCell} align='right'>
              <div className={classes.perPageWrap}>
                <Select
                  value={rowsPerPage}
                  onChange={e => setRowsPerPage(e.target.value)}
                  IconComponent={ArrowDropDownIcon}
                  className={classes.perPageSelect}
                >
                  {rowsPerPageNumbers.map(number => (
                    <MenuItem value={number} key={`${number}`}>
                      {number}
                    </MenuItem>
                  ))}
                </Select>
                <Typography className={classes.perPageText}>
                  {t('per_page')}
                </Typography>
              </div>
            </TableCell>
          ) : (
            <TableCell
              key={id}
              sortDirection={orderBy === id ? order : false}
              className={classes.headCellTitle}
              {...extraHeadProps}
            >
              <TableSortLabel
                active={orderBy === id}
                direction={orderBy === id ? order : 'asc'}
                onClick={createSortHandler(id)}
                className={classes.sortLabel}
              >
                <p>{t(label)}</p>
                {orderBy === id && (
                  <p className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </p>
                )}
              </TableSortLabel>
            </TableCell>
          )
        )}
        {/* <TableCell></TableCell> */}
      </TableRow>
    </TableHead>
  )
}

CustomTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

export default withNamespaces()(CustomTableHead)
