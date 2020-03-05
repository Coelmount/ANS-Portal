import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import useAdditionalStyles from './styles'

const Pagination = ({ page, totalPages, handleChangePage, classes }) => {
  const additionalClasses = useAdditionalStyles({ page, totalPages })

  return (
    <div className={classes.paginationWrap}>
      <div className={classes.paginationIconBlock}>
        <ArrowBackIosIcon
          className={`${classes.paginationIcon} ${additionalClasses.prevPaginationIcon}`}
          onClick={() => handleChangePage('decrease')}
        />
      </div>
      <p>
        <span className={classes.paginationText}>{`${page + 1}`}</span>
        {` of ${totalPages + 1}`}
      </p>
      <div className={classes.paginationIconBlock}>
        <ArrowForwardIosIcon
          className={`${classes.paginationIcon} ${additionalClasses.nextPaginationIcon}`}
          onClick={() => handleChangePage('increase')}
        />
      </div>
    </div>
  )
}

export default Pagination
