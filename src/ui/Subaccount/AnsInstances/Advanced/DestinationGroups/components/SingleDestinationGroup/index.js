import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import classnames from 'classnames'

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
import TranslationNumbers from './components/TranslationNumbers'
import AvailableNumbers from './components/AvailableNumbers'

import useStyles from './styles'

const SingleDestinationGroup = props => {
  const { t } = props
  const match = useParams()
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
    mainText: `${t('destination_group')}: ${location.hash}`
  }

  const handleChange = (event, newValue) => {
    setActiveTab(newValue)
    switch (newValue) {
      case 0:
        history.push('#access_numbers')
        setTranslationsMenuName(t('access_numbers'))
        break
      case 1:
        history.push('#destinations')
        setTranslationsMenuName(t('destinations'))
        break
      case 2:
        history.push('#white_black_list')
        setTranslationsMenuName(t('white_black_list'))
        break
      case 3:
        history.push('#settings')
        setTranslationsMenuName(t('settings'))
        break
    }
  }

  const returnActiveTab = () => {
    switch (location.hash) {
      case '#translations':
        return 0
      case '#available_numbers':
        return 1
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
        <Tab value={0} label={t('translations')} className={classes.tab} />
        <Tab value={1} label={t('available_numbers')} className={classes.tab} />
      </Tabs>
      <TabPanel value={returnActiveTab()} index={0}>
        <TranslationNumbers />
      </TabPanel>
      <TabPanel value={returnActiveTab()} index={1}>
        <AvailableNumbers />
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

export default withNamespaces()(observer(SingleDestinationGroup))
