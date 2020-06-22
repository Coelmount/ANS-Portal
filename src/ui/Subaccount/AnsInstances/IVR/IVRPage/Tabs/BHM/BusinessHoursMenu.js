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

import IVRStore from 'stores/IVR'
import useStyles from './styles'

const BusinessHoursMenu = props => {
  const { t } = props
  const { ivr, isLoadingIVR } = IVRStore
  const classes = useStyles()

  if (isLoadingIVR) {
    return <Loading />
  }

  console.log(ivr)
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
        >
          <img
            src={SchedulerIcon}
            alt='SchedulerIcon'
            className={classes.scheduleIcon}
          />
        </Button>
        <Button className={classes.roundButtonEdit}>
          <img src={EditIcon} alt='EditIcon' />
        </Button>
      </Box>
      <MenuTemplate
        menu={ivr.businessHoursMenu}
        schedule={ivr.businessHours}
        menuType={'business_hours'}
        showTitle
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(BusinessHoursMenu))
