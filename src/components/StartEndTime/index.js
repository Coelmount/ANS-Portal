import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import AccessTimeIcon from '@material-ui/icons/AccessTime'

import WeekSchedulesStore from 'stores/WeekSchedules'

import useStyles from './styles.js'

const StartEndTime = ({ t, periodId, startTime, stopTime }) => {
  const classes = useStyles()
  const timeBlocks = [
    {
      id: 'startTime',
      label: `${t('start')}:`,
      defaultValue: startTime
    },
    {
      id: 'stopTime',
      label: `${t('end')}:`,
      defaultValue: stopTime
    }
  ]

  // store
  const { updatePeriodTime } = WeekSchedulesStore

  // components ------
  const TimeBlock = ({ timeBlock: { label, id, defaultValue } }) => (
    <Box className={classes.timeFieldWrap}>
      <Typography className={classes.timeBlockLabel}>{label}</Typography>
      <TextField
        id={id}
        label=''
        type='time'
        format={'HH/MM'}
        defaultValue={defaultValue}
        onChange={e => updatePeriodTime(periodId, id, e.target.value)}
        className={classes.timeField}
        InputLabelProps={{
          shrink: true
        }}
        inputProps={{
          step: 300
        }}
      />
    </Box>
  )
  // ------

  return (
    <Box className={classes.mainWrap}>
      <Box className={classes.timeIconWrap}>
        <AccessTimeIcon className={classes.timeIcon} />
      </Box>
      <Box className={classes.timeFieldsWrap}>
        {timeBlocks.map(timeBlock => (
          <TimeBlock key={timeBlock.id} timeBlock={timeBlock} />
        ))}
      </Box>
    </Box>
  )
}

export default withNamespaces()(observer(StartEndTime))