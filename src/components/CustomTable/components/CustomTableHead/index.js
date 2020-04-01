import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'

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
        {columns.map(
          ({
            id,
            label,
            extraHeadProps,
            isSortAvailable,
            headIcon,
            onIconClick
          }) => {
            return (
              <TableCell
                key={id}
                align={'left'}
                sortDirection={orderBy === id ? order : false}
                className={classes.headCellTitle}
                // component={'th'}
                {...extraHeadProps}
              >
                {headIcon ? (
                  <Box className={classes.headCellWithCustomButtons}>
                    <Typography>{t(`${label}`)}</Typography>
                    <Box
                      className={classes.customHeadIconWrap}
                      onClick={onIconClick}
                    >
                      {headIcon()}
                    </Box>
                  </Box>
                ) : (
                  <TableSortLabel
                    active={orderBy === id && isSortAvailable !== false}
                    direction={orderBy === id ? order : 'asc'}
                    onClick={
                      isSortAvailable === false
                        ? () => {
                            return
                          }
                        : createSortHandler(id)
                    }
                    className={isSortAvailable === false && classes.displayNone}
                    hideSortIcon={isSortAvailable === false}
                  >
                    <p>{t(label)}</p>
                    {orderBy === id && (
                      <p
                        className={
                          isSortAvailable === false
                            ? classes.displayNone
                            : classes.visuallyHidden
                        }
                      >
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </p>
                    )}
                  </TableSortLabel>
                )}
              </TableCell>
            )
          }
        )}
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
