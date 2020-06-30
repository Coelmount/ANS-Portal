import React, { Fragment, useState } from 'react'
import { observer } from 'mobx-react-lite'
import capitalize from 'lodash/capitalize'
import { withNamespaces } from 'react-i18next'

import { withStyles } from '@material-ui/core/styles'
import DateRangeIcon from '@material-ui/icons/DateRange'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import Checkbox from 'components/Checkbox'
import StartEndTime from 'components/StartEndTime'
import StartEndDate from 'components/StartEndDate'
import {
  FULL_DAYS,
  PARTIAL_DAYS
} from 'components/HolidaySchedule/periodTypes.js'

import useStyles from './styles.js'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const TextFieldWithStyles = withStyles({
  root: {
    marginTop: 10,
    '& label.Mui-focused': {
      color: 'black'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black'
    }
  }
})(TextField)

// Small components ------
const Header = ({ t, classes, updatePeriod, name, isNameEditable }) => (
  <Box className={classes.header}>
    <TextFieldWithStyles
      value={name}
      onChange={e => {
        const payload = {
          field: 'name',
          value: e.target.value
        }
        if (isNameEditable) updatePeriod(payload)
      }}
      id='custom-css-standard-input'
      label={t('name')}
      inputProps={{
        autoComplete: 'off' // disable autocomplete and autofill
      }}
    />
  </Box>
)

const AllDayBlock = ({ t, classes, type, updatePeriodType }) => (
  <Box className={classes.allDayWrap}>
    <Checkbox
      checked={type === FULL_DAYS}
      onChange={e => updatePeriodType(e.target.checked)}
    />
    <Typography className={classes.allDayTitle}>
      {t('all_day_event')}
    </Typography>
  </Box>
)
// ------

// MAIN COMPONENT
const PeriodForm = ({ t, isNameEditable }) => {
  const classes = useStyles()

  // store
  const {
    updatePeriod,
    updatePeriodType,
    modalPeriod: period
  } = HolidaySchedulesStore

  const { id, type, name, startTime, stopTime, startDate, stopDate } = period

  return (
    <Box className={classes.mainWrap}>
      <Header
        classes={classes}
        updatePeriod={updatePeriod}
        name={name}
        id={id}
        isNameEditable={isNameEditable}
        t={t}
      />
      <StartEndDate
        isBottomBorderVisible={true}
        startDate={startDate}
        stopDate={stopDate}
      />
      <AllDayBlock
        classes={classes}
        type={type}
        updatePeriodType={updatePeriodType}
        t={t}
      />
      {type === PARTIAL_DAYS && (
        <StartEndTime
          periodId={id}
          startTime={startTime}
          stopTime={stopTime}
          updatePeriod={updatePeriod}
        />
      )}
    </Box>
  )
}

PeriodForm.defaultProps = {
  isNameEditable: true
}

export default withNamespaces()(observer(PeriodForm))
