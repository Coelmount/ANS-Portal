import React, { memo } from 'react'
import PropTypes from 'prop-types'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IdCell from 'utils/IdCell'

const CustomTableBody = ({
  classes,
  rowsPerPage,
  page,
  list,
  columns,
  firstCell,
  showPagination
}) => {
  const rows = []
  for (
    let i = page * rowsPerPage,
      length = showPagination
        ? Math.min(i + rowsPerPage, list.length)
        : list.length,
      row,
      labelId;
    i < length;
    i++
  ) {
    row = list[i]
    rows.push(
      <TableRow hover className={classes.tableRow} tabIndex={-1} key={i}>
        {firstCell && <IdCell cellValue={i} />}
        {columns.map((column) => {
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
  return <TableBody className={classes.tbody}>{rows}</TableBody>
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
