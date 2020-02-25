import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const CustomersTableHead = props => {
  const { classes, order, orderBy, onRequestSort, t } = props

  const headCells = [
    { id: 'id', numeric: true, disablePadding: false, label: '' },
    {
      id: 'tenantId',
      numeric: false,
      disablePadding: false,
      label: 'ID'
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'name'
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: 'status'
    },
    {
      id: 'delete'
    }
  ]

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={classes.thead}>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.headCellTitle}
          >
            {headCell.id !== 'id' && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                <p>{t(headCell.label)}</p>
                {orderBy === headCell.id ? (
                  <p className={classes.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </p>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

CustomersTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default withNamespaces()(CustomersTableHead)
