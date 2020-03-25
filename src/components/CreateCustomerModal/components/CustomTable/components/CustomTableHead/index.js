import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'

const CustomTableHead = ({
  classes,
  order,
  orderBy,
  onRequestSort,
  columns,
  t
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={classes.thead}>
      <TableRow>
        <TableCell></TableCell>
        {columns.map(({ id, label, extraHeadProps }) => (
          <TableCell
            key={id}
            align={'left'}
            sortDirection={orderBy === id ? order : false}
            className={classes.headCellTitle}
            {...extraHeadProps}
          >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              <p>{t(label)}</p>
              {orderBy === id && (
                <p className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </p>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

CustomTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired
}

export default withNamespaces()(CustomTableHead)
