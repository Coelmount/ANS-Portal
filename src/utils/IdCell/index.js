import React from 'react'

import TableCell from '@material-ui/core/TableCell'

const IdCell = ({ cellValue }) => {
  return <TableCell>{cellValue + 1}</TableCell>
}

export default IdCell