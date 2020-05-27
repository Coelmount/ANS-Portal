import React from 'react'

import TableCell from '@material-ui/core/TableCell'

const IdCell = ({ cellValue, idColStyles }) => {
  return <TableCell className={idColStyles}>{cellValue + 1}</TableCell>
}

export default IdCell
