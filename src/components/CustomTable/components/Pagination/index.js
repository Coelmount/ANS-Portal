import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const Pagination = props => {
  const { classes, page, totalPages, handleChangePage } = props

  return (
    <div className={classes.paginationWrap}>
      <div className={classes.paginationIconBlock}>
        <ArrowBackIosIcon
          className={classes.paginationIcon}
          style={{
            color: page === 0 ? '#C4C4C4' : '#00678F'
          }}
          onClick={() => handleChangePage('decrease')}
        />
      </div>
      <p>
        <span className={classes.paginationText}>{`${page + 1}`}</span>
        {` of ${totalPages + 1}`}
      </p>
      <div className={classes.paginationIconBlock}>
        <ArrowForwardIosIcon
          className={classes.paginationIcon}
          style={{
            color: page === totalPages ? '#C4C4C4' : '#00678F'
          }}
          onClick={() => handleChangePage('increase')}
        />
      </div>
    </div>
  )
}

export default Pagination
