import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import TableRow from '@material-ui/core/TableRow'
import Tooltip from '@material-ui/core/Tooltip'

const ItemTypes = {
  CARD: 'card'
}

const DragableCard = ({
  id,
  index,
  moveCard,
  isSaving,
  children,
  classes,
  defaultClasses,
  t
}) => {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })
  const opacity = isDragging ? 0 : 1
  if (!isSaving) {
    drag(drop(ref))
  }
  return (
    <Tooltip title={t('drag_tooltip')} placement='center'>
      <TableRow
        className={`${defaultClasses.tableRow} ${classes.tableRow}`}
        ref={ref}
        style={{ opacity }}
      >
        {children}
      </TableRow>
    </Tooltip>
  )
}

export default DragableCard
