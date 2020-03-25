import React, { memo } from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import useAdditionalStyles from './styles'

const Pagination = ({ page, totalPages, rewindPage, classes }) => {
  const additionalClasses = useAdditionalStyles({ page, totalPages })

  return (
    <div className={classes.paginationWrap}>
      <div className={classes.paginationIconBlock}>
        <ArrowBackIosIcon
          className={`${classes.paginationIcon} ${additionalClasses.prevPaginationIcon}`}
          onClick={() => rewindPage(-1)}
        />
      </div>
      <p>
        <span className={classes.paginationText}>{page + 1}</span>
        &nbsp;of&nbsp;
        {totalPages + 1}
      </p>
      <div className={classes.paginationIconBlock}>
        <ArrowForwardIosIcon
          className={`${classes.paginationIcon} ${additionalClasses.nextPaginationIcon}`}
          onClick={() => rewindPage(1)}
        />
      </div>
    </div>
  )
}

export default memo(Pagination)
