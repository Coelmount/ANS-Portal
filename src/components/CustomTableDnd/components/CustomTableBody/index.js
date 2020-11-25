import React, { memo } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import IdCell from 'utils/IdCell'
import DragableCard from '../DragableCard'

const CustomTableBody = ({
  classes,
  defaultClasses,
  rowsPerPage,
  page,
  list,
  columns,
  firstCell,
  showPagination,
  idColStyles,
  moveCard,
  isSaving,
  t
}) => {
  const rows = []
  for (
    let i = page * rowsPerPage,
      length = showPagination
        ? Math.min(i + rowsPerPage, list.length)
        : list.length,
      row,
      labelId;
    i < length;
    i++
  ) {
    row = list[i]

    rows.push(
      <DragableCard
        classes={classes}
        defaultClasses={defaultClasses}
        key={row.id}
        index={i}
        id={row.id}
        moveCard={moveCard}
        isSaving={isSaving}
      >
        {firstCell && <IdCell cellValue={i} idColStyles={idColStyles} />}
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
              {(column.getCellData && column.getCellData(row, i)) ||
                row[column.id]}
            </TableCell>
          )
        })}
      </DragableCard>
    )
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Tooltip title={t('drag_tooltip')}>
        <TableBody className={`${defaultClasses.tbody} ${classes.tbody}`}>
          {rows}
        </TableBody>
      </Tooltip>
    </DndProvider>
  )
}

CustomTableBody.propTypes = {
  firstCell: PropTypes.bool,
  showPagination: PropTypes.bool
}

CustomTableBody.defaultProps = {
  firstCell: true,
  showPagination: true
}

export default memo(CustomTableBody)
