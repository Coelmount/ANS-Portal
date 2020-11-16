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
import TranslationNumbers from './components/TranslationNumbers'
import AvailableNumbers from './components/AvailableNumbers'
import ConfiguredNumbers from './components/ConfiguredNumbers'

import useStyles from './styles'

const Translations = props => {
  const { t } = props
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const [open] = useState(false)
  const anchorRef = useRef(null)

  const titleData = {
    mainText: `${t('time_based_routing')}: ${
      location.hash ? t(location.hash.slice(1)) : t('available_numbers')
    }`
  }

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        history.push('#available_numbers')
        break
      case 1:
        history.push('#translations')
        break
      case 2:
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
      case '#translations':
        return 1
      case '#configured_numbers':
        return 2
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
        <Tab value={0} label={t('available_numbers')} className={classes.tab} />
        <Tab
          value={2}
          label={t('configured_numbers')}
          className={classes.tab}
        />
        <Tab value={1} label={t('translations')} className={classes.tab} />
      </Tabs>
      <TabPanel value={returnActiveTab()} index={0}>
        <AvailableNumbers />
      </TabPanel>
      <TabPanel value={returnActiveTab()} index={2}>
        <ConfiguredNumbers />
      </TabPanel>
      <TabPanel value={returnActiveTab()} index={1}>
        <TranslationNumbers />
      </TabPanel>
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

export default withNamespaces()(observer(Translations))
