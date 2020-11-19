import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'
import capitalize from 'lodash/capitalize'

import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Box from '@material-ui/core/Box'

const CustomTableHead = ({
  classes,
  defaultClasses,
  order,
  orderBy,
  onRequestSort,
  columns,
  firstCell,
  t
}) => {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead className={`${defaultClasses.thead} ${classes.thead}`}>
      <TableRow>
        {firstCell && <TableCell />}
        {columns.map(
          ({
            id,
            label,
            extraHeadProps,
            isSortAvailable = false,
            headIcon,
            onIconClick,
            headIconWrapStyles,
            headCellInsideWrapStyles
          }) => {
            return (
              <TableCell
                key={id}
                align={'left'}
                sortDirection={orderBy === id ? order : false}
                className={`${defaultClasses.headCellTitle} ${classes.headCellTitle}`}
                // component={'th'}
                {...extraHeadProps}
              >
                <Box
                  className={`${defaultClasses.headCellInsideWrap} ${headCellInsideWrapStyles}`}
                >
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
                    className={
                      isSortAvailable === false
                        ? `${defaultClasses.displayNone} ${classes.displayNone}`
                        : ''
                    }
                    hideSortIcon={isSortAvailable === false}
                  >
                    {typeof label === 'object' ? label : capitalize(t(label))}
                    {orderBy === id && (
                      <p
                        className={
                          isSortAvailable === false
                            ? defaultClasses.displayNone
                            : defaultClasses.visuallyHidden
                        }
                      >
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </p>
                    )}
                  </TableSortLabel>

                  {headIcon && (
                    <Box
                      className={`${classes.customHeadIconWrap} ${headIconWrapStyles}`}
                      onClick={onIconClick}
                    >
                      {headIcon}
                    </Box>
                  )}
                </Box>
              </TableCell>
            )
          }
        )}
      </TableRow>
    </TableHead>
  )
}

CustomTableHead.propTypes = {
  defaultClasses: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  firstCell: PropTypes.bool
}

CustomTableHead.defaultProps = {
  firstCell: true
}

export default withNamespaces()(CustomTableHead)
