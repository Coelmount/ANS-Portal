import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
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
import CircularProgress from '@material-ui/core/CircularProgress'

import TimeBasedRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import AccessNumbers from './components/AccessNumbers'
import TimeSchedule from './components/TimeSchedule'
import WhiteBlackList from './components/WhiteBlackList'

import useStyles from './styles'

const tabPanelItems = [
  {
    index: 0,
    component: <AccessNumbers />,
    label: 'access_numbers'
  },
  {
    index: 1,
    component: <TimeSchedule />,
    label: 'time_schedule'
  },
  {
    index: 2,
    component: <WhiteBlackList />,
    label: 'white_black_list'
  }
]

const SingleDestinationGroup = props => {
  const { t } = props
  const match = useParams()
  const { customerId, groupId, tbrName } = match
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()

  const [activeTab, setActiveTab] = useState(0)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const [translationsMenuName, setTranslationsMenuName] = useState(
    t('translations_menus')
  )

  const { getCurrentNameWithId, currentTbrName } = TimeBasedRoutingStore
  useEffect(() => {
    const payload = {
      customerId,
      groupId,
      tbrId: tbrName
    }
    getCurrentNameWithId(payload)
  }, [])

  const titleData = {
    mainText: `${capitalize(t('time_based_routing'))}: ${currentTbrName}`
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
    switch (newValue) {
      case 0:
        history.push('#access_numbers')
        setTranslationsMenuName(t('access_numbers'))
        break
      case 1:
        history.push('#time_schedule')
        setTranslationsMenuName(t('time_schedule'))
        break
      case 2:
        history.push('#white_black_list')
        setTranslationsMenuName(t('white_black_list'))
        break
    }
  }

  const returnActiveTab = () => {
    switch (location.hash) {
      case '#access_numbers':
        return 0
      case '#time_schedule':
        return 1
      case '#white_black_list':
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
          {currentTbrName ? (
            <TitleBlock titleData={titleData} classes={classes} />
          ) : (
            <CircularProgress />
          )}
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

export default withNamespaces()(observer(SingleDestinationGroup))