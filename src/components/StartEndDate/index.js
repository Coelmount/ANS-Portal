import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'

import HolidaySchedulesStore from 'stores/HolidaySchedules'

import useStyles from './styles.js'

const StartEndDate = ({ t, isBottomBorderVisible, startDate, stopDate }) => {
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
  const { updatePeriod, periodToAdd } = HolidaySchedulesStore

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
          defaultValue={defaultValue}
          onChange={e => {
            const payload = {
              field: id,
              value: e.target.value
            }
            updatePeriod(payload)
          }}
          className={classes.timeField}
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
      <Box
        className={classnames(classes.timeFieldsWrap, {
          [classes.bottomBorder]: isBottomBorderVisible
        })}
      >
        {dateBlocks.map(dateBlock => (
          <DateBlock key={dateBlock.id} dateBlock={dateBlock} />
        ))}
      </Box>
    </Box>
  )
}

StartEndDate.defaultProps = {
  isBottomBorderVisible: false
}

export default withNamespaces()(observer(StartEndDate))
