import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import AccessNumbers from './components/AccessNumbers'
import DestinationGroups from './components/DestinationGroups'
import Destinations from './components/Destinations'
import ConfiguredNumbers from './components/ConfiguredNumbers'

import useStyles from './styles'

const tabPanelItems = [
  {
    index: 0,
    component: <AccessNumbers />,
    label: 'available_numbers'
  },
  {
    index: 3,
    component: <ConfiguredNumbers />,
    label: 'configured_numbers'
  },
  {
    index: 1,
    component: <DestinationGroups />,
    label: 'destination_groups'
  },
  {
    index: 2,
    component: <Destinations />,
    label: 'destinations'
  }
]

const Advanced = props => {
  const { t } = props

  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const [open] = useState(false)
  const anchorRef = useRef(null)

  const titleData = {
    mainText: `${t('advanced')}: ${
      location.hash ? t(location.hash.slice(1)) : t('available_numbers')
    }`
  }

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        history.push('#available_numbers')
        break
      case 1:
        history.push('#destination_groups')
        break
      case 2:
        history.push('#destinations')
        break
      case 3:
        history.push('#configured_numbers')
        break
      default:
        break
    }
  }

  const returnActiveTab = () => {
    switch (location.hash) {
      case '#available_numbers':
        return 0
      case '#destination_groups':
        return 1
      case '#destinations':
        return 2
      case '#configured_numbers':
        return 3
      default:
        return 0
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }
    prevOpen.current = open
  }, [open])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} classes={classes} />
        </CustomContainer>
      </Paper>
      <Tabs
        className={classes.tabs}
        value={returnActiveTab()}
        indicatorColor='primary'
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
      >
        {tabPanelItems.map(({ index, label }) => (
          <Tab
            value={index}
            label={t(label)}
            className={classes.tab}
            key={index}
          />
        ))}
      </Tabs>

      {tabPanelItems.map(({ index, component }) => (
        <TabPanel value={returnActiveTab()} index={index} key={index}>
          {component}
        </TabPanel>
      ))}
    </div>
  )
}

const TabPanel = props => {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={classes.tabs}
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default withNamespaces()(observer(Advanced))
