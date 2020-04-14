import React, { memo } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import useAdditionalStyles from './styles'

const Pagination = ({
  page,
  totalPages,
  rewindPage,
  classes,
  defaultClasses
}) => {
  const additionalClasses = useAdditionalStyles({ page, totalPages })

  return (
    <div
      className={`${defaultClasses.paginationWrap} ${classes.paginationWrap}`}
    >
      <div
        className={`${defaultClasses.paginationIconBlock} ${classes.paginationIconBlock}`}
      >
        <ArrowBackIosIcon
          className={`${defaultClasses.paginationIcon} ${additionalClasses.prevPaginationIcon} ${classes.paginationIcon}`}
          onClick={() => rewindPage(-1)}
        />
      </div>
      <p>
        <span
          className={`${defaultClasses.paginationText} ${classes.paginationText}`}
        >
          {page + 1}
        </span>
        &nbsp;of&nbsp;
        {totalPages + 1}
      </p>
      <div
        className={`${defaultClasses.paginationIconBlock} ${classes.paginationIconBlock}`}
      >
        <ArrowForwardIosIcon
          className={`${defaultClasses.paginationIcon} ${additionalClasses.nextPaginationIcon} ${classes.paginationIcon}`}
          onClick={() => rewindPage(1)}
        />
      </div>
    </div>
  )
}

export default memo(Pagination)
