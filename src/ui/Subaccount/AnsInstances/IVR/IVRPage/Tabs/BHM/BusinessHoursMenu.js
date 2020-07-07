import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import has from 'lodash/has'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import SchedulerIcon from 'source/images/svg/schedules.svg'
import EditIcon from 'source/images/svg/edit-blue.svg'

import MenuTemplate from 'components/MenuTemplate'
import Loading from 'components/Loading'
import EditSchedules from '../../../EditSchedules'

import IVRStore from 'stores/IVR'
import useStyles from './styles'

const BusinessHoursMenu = props => {
  const { t } = props
  const { ivr, isLoadingIVR, getIVR } = IVRStore
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const [showEditSchedules, setShowEditSchedules] = useState(false)

  if (isLoadingIVR) {
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
          {`${t('business_hours')}: ${
            has(ivr, 'businessHours.name')
              ? ivr.businessHours.name
              : t('not_connected')
          }`}
        </div>
        <Button
          variant={'contained'}
          color={'primary'}
          className={classes.roundButton}
          disabled={!has(ivr, 'businessHours.name')}
          onClick={() =>
            history.push(
              `/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/week_schedules/${ivr.businessHours.name}`
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
            menuLvl={'menus'}
            menuType={'businessHours'}
            defaultSchedule={
              has(ivr, 'businessHours.name') ? ivr.businessHours.name : ''
            }
          />
        )}
      </Box>
      <MenuTemplate
        menuLvl={'menus'}
        menuType={'businessHours'}
        showTitle
        route={'main'}
        countChild={1}
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(BusinessHoursMenu))
