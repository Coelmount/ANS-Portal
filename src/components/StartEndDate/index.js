import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'

import HolidaySchedulesStore from 'stores/HolidaySchedules'

import useStyles from './styles.js'

const StartEndDate = ({ t, startDate, stopDate }) => {
  const classes = useStyles()
  const dateBlocks = [
    {
      id: 'startDate',
      label: `${t('start')}:`,
      defaultValue: startDate
    },
    {
      id: 'stopDate',
      label: `${t('end')}:`,
      defaultValue: stopDate
    }
  ]

  // store
  const { updatePeriodDate } = HolidaySchedulesStore

  // components ------
  const DateBlock = ({ dateBlock: { label, id, defaultValue } }) => {
    console.log('date block')
    return (
      <Box className={classes.timeFieldWrap}>
        <Typography className={classes.timeBlockLabel}>{label}</Typography>
        <TextField
          id={id}
          label=''
          type='date'
          // format={'HH/MM'}
          defaultValue={defaultValue}
          onChange={e => updatePeriodDate(id, e.target.value)}
          className={classes.timeField}
          // InputLabelProps={{
          //   shrink: true
          // }}
          // inputProps={{
          //   step: 300
          // }}
        />
      </Box>
    )
  }
  // ------

  return (
    <Box className={classes.mainWrap}>
      <Box className={classes.timeIconWrap}>
        <DateRangeIcon className={classes.dateIcon} />
      </Box>
      <Box className={classes.timeFieldsWrap}>
        {dateBlocks.map(dateBlock => (
          <DateBlock key={dateBlock.id} dateBlock={dateBlock} />
        ))}
      </Box>
    </Box>
  )
}

export default withNamespaces()(observer(StartEndDate))
