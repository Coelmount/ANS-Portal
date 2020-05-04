import React from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import basicIcon from 'source/images/svg/dashboard_basic_icon.svg'
import advancedIcon from 'source/images/svg/dashboard_advanced_icon.svg'
import timeBasedRoutingIcon from 'source/images/svg/dasboard_tbr_icon.svg'
import ivrIcon from 'source/images/svg/dashboard_ivr_icon.svg'
import useStyles from './styles'

const MOCK_AMOUNT = 15

const AnsInstances = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const match = useParams()
  const ansInstancesPrefix = `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances`

  const handleInstanceRedirect = link => {
    history.push(link)
  }

  const instances = [
    {
      label: t('basic'),
      iconSrc: basicIcon,
      link: `${ansInstancesPrefix}/basic/translations`
    },
    {
      label: t('advanced'),
      iconSrc: advancedIcon,
      link: `${ansInstancesPrefix}/advanced/destinations`
    },
    {
      label: t('time_based_routing'),
      iconSrc: timeBasedRoutingIcon,
      link: `${ansInstancesPrefix}/time_based_routing`
    },
    {
      label: t('ivr'),
      iconSrc: ivrIcon,
      link: `${ansInstancesPrefix}/ivr`
    }
  ]

  const titleData = {
    mainText: t('ans_instances')
  }

  return (
    <Box className={classes.root}>
      <Paper>
        <CustomContainer>
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
                <img src={item.iconSrc} alt={`${item.label} icon`} />
              </Box>
              <Typography className={classes.labelTitle}>
                {item.label}
              </Typography>
              <Typography className={classes.amountTitle}>
                {MOCK_AMOUNT}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  )
}

export default withNamespaces()(AnsInstances)
