import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useHistory, useLocation } from 'react-router-dom'
import classnames from 'classnames'
import capitalize from 'lodash/capitalize'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import Grow from '@material-ui/core/Grow'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import AccessNumbers from './components/AccessNumbers'
import DestinationGroups from './components/DestinationGroups'
import Destinations from './components/Destinations'

import useStyles from './styles'

const tabPanelItems = [
  {
    index: 0,
    component: <AccessNumbers />,
    label: 'available_numbers'
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

  const [activeTab, setActiveTab] = useState(0)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [translationsMenuName, setTranslationsMenuName] = useState(
    t('translations_menus')
  )

  const titleData = {
    mainText: `${t('advanced')}: ${
      location.hash ? t(location.hash.slice(1)) : t('available_numbers')
    }`
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
    switch (newValue) {
      case 0:
        history.push('#available_numbers')
        setTranslationsMenuName(t('available_numbers'))
        break
      case 1:
        history.push('#destination_groups')
        setTranslationsMenuName(t('destination_groups'))
        break
      case 2:
        history.push('#destinations')
        setTranslationsMenuName(t('destinations'))
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
