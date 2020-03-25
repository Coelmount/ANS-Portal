import React from 'react'

import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Checkbox from '@material-ui/core/Checkbox'

const TableHeadWithCheckbox = ({
  classes,
  onSelectAllClick,
  numSelected,
  rowCount,
  columns,
  selected
}) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
          // indeterminate={numSelected > 0 && numSelected < rowCount}
          // checked={rowCount > 0 && numSelected === rowCount}
          // onChange={onSelectAllClick}
          // inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {columns.map(({ label }) => (
          <TableCell
          // key={headCell.id}
          // align={headCell.numeric ? 'right' : 'left'}
          // padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default TableHeadWithCheckbox
