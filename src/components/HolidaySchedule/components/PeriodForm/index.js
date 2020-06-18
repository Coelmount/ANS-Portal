import React, { useState, Fragment } from 'react'
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

import useStyles from './styles.js'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const TextFieldWithStyles = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black'
    }
  }
})(TextField)

const PeriodForm = ({
  t,
  period: { id, startTime, stopTime, startDate, stopDate }
}) => {
  const classes = useStyles()
  const [titleValue, setTitleValue] = useState()
  // store
  const {
    removePeriod,
    updatePeriodTime,
    updatePeriodName
  } = HolidaySchedulesStore

  // components ------
  const Header = () => (
    <Box className={classes.header}>
      <TextFieldWithStyles
        onChange={e => {
          updatePeriodName(e.target.value)
        }}
        className={classes.margin}
        id='custom-css-standard-input'
        label={t('title')}
      />
      <img
        onClick={() => removePeriod(id)}
        src={deleteIcon}
        className={classes.deleteIcon}
        alt='delete'
      />
    </Box>
  )

  const AllDayBlock = () => (
    <Box className={classes.allDayWrap}>
      <Checkbox />
      <Typography className={classes.allDayTitle}>
        {t('all_day_event')}
      </Typography>
    </Box>
  )

  // ------

  return (
    <Box className={classes.mainWrap}>
      <Header />
      <StartEndDate periodId={id} startDate={startDate} stopDate={stopDate} />
      <AllDayBlock />
      <StartEndTime
        periodId={id}
        startTime={startTime}
        stopTime={stopTime}
        updatePeriodTime={updatePeriodTime}
      />
    </Box>
  )
}

export default withNamespaces()(observer(PeriodForm))
