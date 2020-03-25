import React from 'react'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

const TableBodyWithCheckbox = ({
  rows,
  page,
  rowsPerPage,
  handleClick,
  isSelected
}) => {
  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name)
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <TableRow
              hover
              onClick={event => handleClick(event, row.name)}
              role='checkbox'
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.name}
              selected={isItemSelected}
            >
              <TableCell padding='checkbox'>
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell component='th' id={labelId} scope='row' padding='none'>
                {row.name}
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default TableBodyWithCheckbox
