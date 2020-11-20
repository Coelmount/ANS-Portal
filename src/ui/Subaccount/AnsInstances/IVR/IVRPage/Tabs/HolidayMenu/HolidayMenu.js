import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import has from 'lodash/has'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import SchedulerIcon from 'source/images/svg/schedules.svg'
import EditIcon from 'source/images/svg/edit-blue.svg'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'
import EditSchedules from '../../../EditSchedules'
import AddScheduleModal from '../../../../../Schedules/components/AddScheduleModal'

import IVRStore from 'stores/IVR'
import AnnouncementsStore from 'stores/Announcements'
import PhoneNumbersStore from 'stores/PhoneNumbers'
import ConfigStore from 'stores/Config'
import HolidayScheduleStore from 'stores/HolidaySchedules'

import useStyles from './styles'

const HolidayMenu = props => {
  const { t } = props
  const {
    ivr,
    isLoadingIVR,
    getIVR,
    getSubmenus,
    submenus,
    isLoadingSubmenus
  } = IVRStore
  const {
    getAnnouncements,
    isLoadingAnnouncements,
    announcements
  } = AnnouncementsStore
  const {
    transformedPhoneNumbers,
    isPhoneNumbersLoading,
    getPhoneNumbers
  } = PhoneNumbersStore
  const { postSchedule, getSchedules } = HolidayScheduleStore
  const { getConfig, isLoadingConfig, config } = ConfigStore
  const classes = useStyles()
  const match = useParams()
  const [showEditSchedules, setShowEditSchedules] = useState(false)
  const [showAddSchedules, setShowAddSchedules] = useState(false)

  useEffect(() => {
    getAnnouncements(match.customerId, match.groupId)
    ivr.type === 'Standard' &&
      getSubmenus(match.customerId, match.groupId, match.ivrId)
    getPhoneNumbers(match.customerId, match.groupId, 1, 9999)
    getConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (
    isLoadingIVR ||
    isLoadingAnnouncements ||
    isLoadingSubmenus ||
    isLoadingConfig ||
    isPhoneNumbersLoading
  ) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Box className={classes.title}>
        <img
          src={SchedulerIcon}
          alt='SchedulerIcon'
          className={classes.scheduleIcon}
        />
        <div className={classes.schedulerTitle}>
          {t('holiday_hours')}
          {has(ivr, 'holidaySchedule.name') ? (
            <Link
              to={`/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/holiday_schedules/${ivr.holidaySchedule.name}`}
              target='_blank'
              className={classes.link}
            >
              {ivr.holidaySchedule.name}
            </Link>
          ) : (
            t('not_connected')
          )}
        </div>
        <Button
          variant={'contained'}
          color={'primary'}
          className={classes.roundButton}
          disabled={!has(ivr, 'holidaySchedule.name')}
          onClick={() =>
            window.open(
              `/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/holiday_schedules/${ivr.holidaySchedule.name}`,
              '_blank'
            )
          }
        >
          <img
            src={SchedulerIcon}
            alt='SchedulerIcon'
            className={classes.scheduleIcon}
          />
        </Button>
        <Button
          className={classes.roundButtonEdit}
          onClick={() => setShowEditSchedules(true)}
        >
          <img src={EditIcon} alt='EditIcon' />
        </Button>
        {showEditSchedules && (
          <EditSchedules
            open={showEditSchedules}
            handleClose={() => {
              setShowEditSchedules(false)
              getIVR(match.customerId, match.groupId, match.ivrId)
            }}
            addNewSchedule={() => setShowAddSchedules(true)}
            menuLvl={'menus'}
            menuType={'holiday'}
            defaultSchedule={
              has(ivr, 'holidaySchedule.name') ? ivr.holidaySchedule.name : ''
            }
          />
        )}
        {showAddSchedules && (
          <AddScheduleModal
            open={showAddSchedules}
            postSchedule={postSchedule}
            closeModal={() => {
              setShowAddSchedules(false)
              getSchedules(match.customerId, match.groupId)
            }}
            title='add_holiday_schedule'
            handleClose={() => setShowAddSchedules(false)}
          />
        )}
      </Box>
      <MenuTemplate
        ivrType={ivr.type}
        menuLvl={'menus'}
        menuType={'holiday'}
        showTitle
        route={'main'}
        countChild={1}
        announcements={announcements}
        submenus={submenus}
        phoneNumbers={transformedPhoneNumbers}
        menuName={t('main_ivr')}
        config={config}
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(HolidayMenu))
