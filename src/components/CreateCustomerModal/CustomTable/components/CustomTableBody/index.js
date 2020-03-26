import React, { memo } from 'react'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import IdCell from 'utils/IdCell'
import Checkbox from 'components/Checkbox'

const CustomTableBody = ({
  classes,
  rowsPerPage,
  page,
  list,
  columns,
  handleClick,
  selected,
  isFullVersion
}) => {
  console.log(selected, 'selected')
  const rows = []
  for (
    let i = page * rowsPerPage,
      length = Math.min(i + rowsPerPage, list.length),
      row,
      labelId;
    i < length;
    i++
  ) {
    row = list[i]
    rows.push(
      <TableRow
        hover
        className={classes.tableRow}
        tabIndex={-1}
        key={i}
        onClick={() => handleClick(i)}
      >
        {isFullVersion && selected && selected.includes(i) ? (
          <TableCell>
            <Checkbox checked />
          </TableCell>
        ) : (
          <IdCell cellValue={i} />
        )}
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
              {(column.getCellData && column.getCellData(row)) ||
                row[column.id]}
            </TableCell>
          )
        })}
      </TableRow>
    )
  }
  return <TableBody className={classes.tbody}>{rows}</TableBody>
}

export default memo(CustomTableBody)
