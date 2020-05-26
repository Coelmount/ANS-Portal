import React, { Fragment, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Loading from 'components/Loading'

import useStyles from '../styles'

const WeekSchedules = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  useEffect(() => {
    console.log('1')
  }, [])

  const titleData = {
    mainText: `${t('schedules')}: ${t('week_schedules')}`
  }

  return (
    <Fragment>
      {false ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock titleData={titleData} />
            </CustomContainer>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedules)
