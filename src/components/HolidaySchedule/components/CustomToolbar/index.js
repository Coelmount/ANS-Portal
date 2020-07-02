import React from 'react'
import { withNamespaces } from 'react-i18next'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { MONTHS_ARR } from 'utils/schedules/monthsArr'

import useStyles from './styles'

const CustomToolbar = ({ t, onNavigate, date }) => {
  const classes = useStyles()
  const currentMonthIndex = date.getMonth()
  const currentYear = date.getFullYear()
  const fullCurrentMonth = MONTHS_ARR[currentMonthIndex]

  const goToBack = () => {
    onNavigate('PREV')
  }

  const goToNext = () => {
    onNavigate('NEXT')
  }

  const goToCurrent = () => {
    const now = new Date()
    date.setMonth(now.getMonth())
    date.setYear(now.getFullYear())
    onNavigate('TODAY')
  }

  return (
    <Box className={classes.wrap}>
      <Box className={classes.changeMonthWrap}>
        <Box onClick={goToBack} className={classes.buttonWrap}>
          <ArrowBackIosIcon className={classes.buttonIcon} />
        </Box>
        <Typography className={classes.currentMonthTitle}>
          {`${fullCurrentMonth} ${currentYear}`}
        </Typography>
        <Box onClick={goToNext} className={classes.buttonWrap}>
          <ArrowForwardIosIcon className={classes.buttonIcon} />
        </Box>
      </Box>
      <Box onClick={goToCurrent} className={classes.currentButton}>
        <Typography className={classes.currentButtonTitle}>
          {t('current')}
        </Typography>
      </Box>
    </Box>
  )
}

export default withNamespaces()(CustomToolbar)
