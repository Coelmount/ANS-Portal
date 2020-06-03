import React, { useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import capitalize from 'lodash/capitalize'

import DateRangeIcon from '@material-ui/icons/DateRange'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Checkbox from 'components/Checkbox'
import StartEndTime from 'components/StartEndTime'

import useStyles from './styles.js'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const PeriodForm = ({ period: { id, weekDays } }) => {
  const classes = useStyles()
  // store
  const { updatePeriod, removePeriod } = WeekSchedulesStore

  // components ------
  const Header = () => (
    <Box className={classes.header}>
      <img src={deleteIcon} className={classes.deleteIcon} alt='delete' />
    </Box>
  )

  const DaysBlock = () => (
    <Box className={classes.daysBlockWrap}>
      <Box className={classes.dateIconWrap}>
        <DateRangeIcon className={classes.dateIcon} />
      </Box>
      <Box key={id} className={classes.daysBlockRowWrap}>
        {Object.keys(weekDays).map(day => {
          return (
            <Box key={day} className={classes.weekDay}>
              <Typography className={classes.weekDayName}>
                {capitalize(day.slice(0, 3))}
              </Typography>
              <Checkbox
                checked={weekDays[day]}
                onChange={e => {
                  updatePeriod(id, day, e.target.checked)
                }}
                className={classes.checkbox}
              />
            </Box>
          )
        })}
      </Box>
    </Box>
  )
  // ------

  return (
    <Box className={classes.mainWrap}>
      <Header />
      <DaysBlock />
      <StartEndTime />
    </Box>
  )
}

export default observer(PeriodForm)
