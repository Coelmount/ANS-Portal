import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'

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
  const { classes, rowsPerPage, page, order, orderBy, list, columns, t } = props

  return (
    <Fragment>
      {list && list.length > 0 ? (
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
            })}
        </TableBody>
      ) : (
        <Typography className={classes.tableMessage}>
          {t('no_customers_yet')}
        </Typography>
      )}
    </Fragment>
  )
}

export default withNamespaces()(CustomersTableBody)
