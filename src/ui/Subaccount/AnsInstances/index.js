import React, { Fragment, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import BasicTranslationsStore from 'stores/BasicTranslations'
import DestinationGroupsStore from 'stores/DestinationGroups'
import Loading from 'components/Loading'

import basicIcon from 'source/images/svg/dashboard_basic_icon.svg'
import advancedIcon from 'source/images/svg/dashboard_advanced_icon.svg'
import timeBasedRoutingIcon from 'source/images/svg/dasboard_tbr_icon.svg'
import ivrIcon from 'source/images/svg/dashboard_ivr_icon.svg'
import useStyles from './styles'

const MOCK_AMOUNT = 0

const AnsInstances = observer(({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const match = useParams()
  const ansInstancesPrefix = `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances`

  const {
    getBasicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    amountOfBasicInstances
  } = BasicTranslationsStore

  const {
    getDestinationGroups,
    isDestinationGroupsLoading,
    amountOfDestinationGroups
  } = DestinationGroupsStore

  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
    getDestinationGroups({
      customerId: match.customerId,
      groupId: match.groupId
    })
  }, [])

  const handleInstanceRedirect = link => {
    history.push(link)
  }

  const instances = [
    {
      label: t('basic'),
      iconSrc: basicIcon,
      link: `${ansInstancesPrefix}/basic`,
      amount: amountOfBasicInstances
    },
    {
      label: t('advanced'),
      iconSrc: advancedIcon,
      link: `${ansInstancesPrefix}/advanced/destinations`,
      amount: amountOfDestinationGroups
    },
    {
      label: t('time_based_routing'),
      iconSrc: timeBasedRoutingIcon,
      link: `${ansInstancesPrefix}/time_based_routing`,
      amount: MOCK_AMOUNT
    },
    {
      label: t('ivr'),
      iconSrc: ivrIcon,
      link: `${ansInstancesPrefix}/ivr`,
      amount: MOCK_AMOUNT
    }
  ]

  const titleData = {
    mainText: t('ans_instances')
  }

  return (
    <Fragment>
      {isBasicTranslationsNumbersLoading || isDestinationGroupsLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock titleData={titleData} />
            </CustomContainer>
            <Box className={classes.mainWrap}>
              {instances.map(item => (
                <Box
                  onClick={() => handleInstanceRedirect(item.link)}
                  className={classes.instanceItemWrap}
                  key={item.link}
                >
                  <Box className={classes.iconWrap}>
                    <img src={item.iconSrc} alt={`${item.label}`} />
                  </Box>
                  <Typography className={classes.labelTitle}>
                    {item.label}
                  </Typography>
                  <Typography className={classes.amountTitle}>
                    {item.amount}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(AnsInstances)
