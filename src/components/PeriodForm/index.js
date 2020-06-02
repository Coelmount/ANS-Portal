import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Checkbox from 'components/Checkbox'

import useStyles from './styles.js'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const PeriodForm = ({ t }) => {
  const classes = useStyles()

  const {
    changePeriod,
    period: { weekDays }
  } = WeekSchedulesStore

  const DaysRow = () => {
    return (
      <Box>
        {Object.keys(weekDays).map(dayName => {
          return (
            <Box key={dayName}>
              <Typography>{dayName}</Typography>
              <Checkbox
                checked={weekDays[dayName]}
                onChange={e => {
                  changePeriod(dayName, e.target.checked)
                }}
              />
            </Box>
          )
        })}
      </Box>
    )
  }

  return (
    <Box className={classes.wrap}>
      <Box className={classes.header}>
        <img src={deleteIcon} alt='delete' />
      </Box>
      <DaysRow />
    </Box>
  )
}

export default observer(PeriodForm)
