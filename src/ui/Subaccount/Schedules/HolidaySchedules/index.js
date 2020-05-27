import React, { Fragment, useEffect } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'

import useStyles from '../styles'

const HolidaySchedules = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const { getSchedules, schedules, isSchedulesLoading } = HolidaySchedulesStore

  useEffect(() => {
    getSchedules(match.customerId, match.groupId)
  }, [])

  const handleOpenDeleteModal = () => {}

  const titleData = {
    mainText: `${t('schedules')}: ${t('holiday_schedules')}`
  }

  const columns = [
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <Link to={`/customers`} className={classes.link}>
          {row.name}
        </Link>
      )
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal()}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  return (
    <Fragment>
      {isSchedulesLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock titleData={titleData} />
            </CustomContainer>
            <CustomTable
              classes={classes}
              columns={columns}
              rows={schedules}
              searchCriterias={['name']}
              noAvailableDataMessage={t('no_schedules_available')}
              idColStyles={classes.idColStyles}
            />
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(HolidaySchedules)
