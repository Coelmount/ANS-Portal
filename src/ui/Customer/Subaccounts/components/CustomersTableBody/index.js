import React from 'react'
import { Link } from 'react-router-dom'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

import { makeStyles } from '@material-ui/core/styles'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

const useStyles = makeStyles(theme => ({
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:focus': {
      color: '#598597'
    }
  }
}))

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
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const CustomersTableBody = props => {
  const { classes, rowsPerPage, page, order, orderBy, list } = props

  const linkStyles = useStyles()

  return (
    <TableBody className={classes.tbody}>
      {stableSort(list, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`
          return (
            <TableRow
              hover
              className={classes.tableRow}
              tabIndex={-1}
              key={row.name}
            >
              <TableCell className={classes.bodyFirstCell}>
                {index + 1}
              </TableCell>
              <TableCell component='th' id={labelId} scope='row'>
                <Link
                  className={linkStyles.link}
                  to={`/customers/${row.tenantId}/subaccounts`}
                >
                  {row.tenantId}
                </Link>
              </TableCell>
              <TableCell component='th' id={labelId} scope='row'>
                {row.name}
              </TableCell>
              <TableCell component='th' id={labelId} scope='row'>
                {'active'}
              </TableCell>
              <TableCell className={classes.deleteCell} align='right'>
                <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
              </TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default CustomersTableBody
