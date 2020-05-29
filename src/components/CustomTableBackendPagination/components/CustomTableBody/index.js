import React, { memo } from 'react'
import PropTypes from 'prop-types'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IdCell from 'utils/IdCell'

const CustomTableBody = ({
  classes,
  defaultClasses,
  rowsPerPage,
  page,
  rows,
  columns,
  firstCell,
  showPagination
}) => {
  const list = []
  for (
    let i = 0,
      length = showPagination
        ? Math.min(i + rowsPerPage, rows.length)
        : rows.length,
      row,
      labelId;
    i < length;
    i++
  ) {
    row = rows[i]

    list.push(
      <TableRow
        className={`${defaultClasses.tableRow} ${classes.tableRow}`}
        tabIndex={-1}
        key={i}
        hover
      >
        {firstCell && <IdCell cellValue={(page - 1) * rowsPerPage + i} />}
        {columns.map(column => {
          const extraProps = column.extraProps
          return (
            <TableCell
              {...extraProps}
              component='th'
              id={labelId}
              scope='row'
              key={column.id}
            >
              {(column.getCellData && column.getCellData(row, i)) ||
                row[column.id]}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }
  return (
    <TableBody className={`${defaultClasses.tbody} ${classes.tbody}`}>
      {list}
    </TableBody>
  )
}

CustomTableBody.propTypes = {
  firstCell: PropTypes.bool,
  showPagination: PropTypes.bool
}

CustomTableBody.defaultProps = {
  firstCell: true,
  showPagination: true
}

export default memo(CustomTableBody)
