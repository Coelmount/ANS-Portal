import React from 'react'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Typography from '@material-ui/core/Typography'

import { MONTHS_ARR } from 'utils/schedules/monthsArr'

import useStyles from './styles'

const CustomToolbar = toolbar => {
  const classes = useStyles()
  const currentMonthIndex = toolbar.date.getMonth()
  const currentYear = toolbar.date.getFullYear()
  const fullCurrentMonth = MONTHS_ARR[currentMonthIndex]

  const goToBack = () => {
    toolbar.onNavigate('PREV')
  }

  const goToNext = () => {
    toolbar.onNavigate('NEXT')
  }

  // PROBABLY TODO LATER
  // const goToCurrent = () => {
  //   const now = new Date()
  //   toolbar.date.setMonth(now.getMonth())
  //   toolbar.date.setYear(now.getFullYear())
  //   toolbar.onNavigate('TODAY')
  // }

  return (
    <div className={classes.wrap}>
      <div onClick={goToBack} className={classes.buttonWrap}>
        <ArrowBackIosIcon className={classes.buttonIcon} />
      </div>
      <Typography className={classes.currentMonthTitle}>
        {`${fullCurrentMonth} ${currentYear}`}
      </Typography>
      <div onClick={goToNext} className={classes.buttonWrap}>
        <ArrowForwardIosIcon className={classes.buttonIcon} />
      </div>
    </div>
  )
}

export default CustomToolbar
