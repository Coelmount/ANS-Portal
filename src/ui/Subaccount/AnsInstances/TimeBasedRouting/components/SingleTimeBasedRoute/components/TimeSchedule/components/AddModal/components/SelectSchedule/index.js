import React, { useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CloseIcon from '@material-ui/icons/Close'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import Select from 'components/Select'
import ModalHelperText from 'components/ModalHelperText'
import Input from 'components/Input'
import { ADD_DESTINATION_DEFAULT_ID } from 'utils/types/addDestinationModalStepsId'

import ScheduleIcon from 'source/images/components/ScheduleIcon'
import useStyles from '../../../modalStyles'

const SelectSchedule = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()
  const {
    scheduleIndexToAdd,
    isEditMode,
    currentTimeSchedule,
    isSchedulePosting,
    setStep,
    findTimeSchedule,
    setField,
    postScheduleTbr
  } = TimeSchedulesStore

  const { getSchedules, schedules, isSchedulesLoading } = WeekSchedulesStore

  const formStore = useLocalStore(() => ({
    scheduleType: 'existing_schedule',
    schedule: '',
    scheduleName: '',
    scheduleOptions: [],

    set(field, value) {
      this[field] = value
    },
    get isFormValid() {
      const { schedule, scheduleType, scheduleName } = this
      return (
        (scheduleType === 'existing_schedule' && schedule) ||
        (scheduleType === 'new_schedule' && scheduleName)
      )
    }
  }))

  const isLoading = isSchedulesLoading || isSchedulePosting

  // Initial request
  useEffect(() => {
    getSchedules(customerId, groupId)
    if (isEditMode) findTimeSchedule()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // On receive schedules from store
  useEffect(() => {
    if (schedules.length) {
      const options = schedules.map(({ name }) => ({
        label: name,
        value: name
      }))
      // Set schedule options to store
      formStore.set('scheduleOptions', options)
      // Set first option as default to store for add feature
      if (!isEditMode) {
        formStore.set('schedule', options[0].value)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules])

  useEffect(() => {
    if (currentTimeSchedule && Object.keys(currentTimeSchedule)) {
      formStore.set('schedule', currentTimeSchedule.timeSchedule)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTimeSchedule])

  const handleNextClick = () => {
    if (formStore.scheduleType === 'existing_schedule') {
      // Save existing schedule to store and go to the next step
      setStep(ADD_DESTINATION_DEFAULT_ID)
      setField('timeSchedule', formStore.schedule)
    } else {
      // Make POST to create new schedule with provided name
      postScheduleTbr({
        customerId,
        groupId,
        name: formStore.scheduleName,
        callback: () => setStep(ADD_DESTINATION_DEFAULT_ID)
      })
    }
  }

  const handleScheduleNameChange = e => {
    formStore.set('scheduleName', e.target.value)
  }

  const scheduleTypeOptions = [
    {
      label: `${t('existing_schedule')}:`,
      value: 'existing_schedule'
    },
    {
      label: t('new_schedule'),
      value: 'new_schedule'
    }
  ]

  return (
    <Fragment>
      <DialogTitle className={classes.title}>
        {isEditMode ? t('edit_destination') : t('add_destination')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.addDestinationModalContent}>
        <div className={classes.helperTextWrap}>
          <ModalHelperText helperText='add_destination_tbr_time_schedule' />
        </div>

        <div className={classes.ansNumberStep}>{`${t(
          'select_schedule'
        )}:`}</div>

        {isLoading ? (
          <Loading />
        ) : (
          <div className={classes.formWrap}>
            <div className={classes.formTitleWrap}>
              <Typography className={classes.formTitleLabel}>
                {`${t('destination')} ${scheduleIndexToAdd}`}
              </Typography>
            </div>
            <div className={classes.formContentWrap}>
              <div className={classes.radioWrap}>
                <RadioGroup>
                  {scheduleTypeOptions.map(item => (
                    <div className={classes.freeNumberRow}>
                      <FormControlLabel
                        checked={formStore.scheduleType === item.value}
                        onChange={e =>
                          formStore.set('scheduleType', item.value)
                        }
                        label={item.label}
                        control={
                          <Radio
                            classes={{
                              root: classes.radioButton,
                              checked: classes.checked
                            }}
                          />
                        }
                        key={item.value}
                      />
                    </div>
                  ))}
                </RadioGroup>
              </div>
              {formStore.scheduleType === 'existing_schedule' && (
                <Select
                  label={t('schedule')}
                  icon={
                    <ScheduleIcon
                      style={{
                        width: 30,
                        height: 25,
                        marginTop: 1,
                        marginLeft: 1
                      }}
                      alt='schedule'
                    />
                  }
                  options={formStore.scheduleOptions}
                  value={formStore.schedule}
                  onChange={e => formStore.set('schedule', e.target.value)}
                />
              )}
              {formStore.scheduleType === 'new_schedule' && (
                <div>
                  <Input
                    label={t('schedule_name')}
                    icon={<PermIdentityOutlined alt='name' />}
                    value={formStore.scheduleName}
                    placeholder={t('enter_schedule_name')}
                    onChange={handleScheduleNameChange}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          disabled={!formStore.isFormValid || isLoading}
          onClick={handleNextClick}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(SelectSchedule))
