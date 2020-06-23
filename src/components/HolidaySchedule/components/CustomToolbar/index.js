import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { MONTHS_ARR } from 'utils/schedules/monthsArr'

import useStyles from './styles'
import { Typography } from '@material-ui/core'

const CustomToolbar = toolbar => {
  const classes = useStyles()
  const currentMonthIndex = toolbar.date.getMonth()
  const fullCurrentMonth = MONTHS_ARR[currentMonthIndex]

  const goToBack = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() - 1)
    toolbar.onNavigate('prev')
  }

  const goToNext = () => {
    toolbar.date.setMonth(toolbar.date.getMonth() + 1)
    toolbar.onNavigate('next')
  }

  // const goToCurrent = () => {
  //   const now = new Date()
  //   toolbar.date.setMonth(now.getMonth())
  //   toolbar.date.setYear(now.getFullYear())
  //   toolbar.onNavigate('current')
  // }

  return (
    <div className={classes.wrap}>
      {/* <button className={['btn-back']} onClick={goToBack}>
        &#8249;
      </button> */}
      <div className={classes.buttonWrap}>
        <ArrowBackIosIcon className={classes.buttonIcon} />
      </div>
      {/* <button className={['btn-current']} onClick={goToCurrent}>
          today
        </button> */}
      <Typography className={classes.currentMonthTitle}>
        {fullCurrentMonth}
      </Typography>
      <div className={classes.buttonWrap}>
        <ArrowForwardIosIcon className={classes.buttonIcon} />
      </div>
      {/* <button className={['btn-next']} onClick={goToNext}>
        &#8250;
      </button> */}
    </div>
  )
}

export default CustomToolbar
