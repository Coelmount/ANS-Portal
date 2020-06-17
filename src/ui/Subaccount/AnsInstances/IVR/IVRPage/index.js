import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import has from 'lodash/has'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
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
import BusinessHoursMenu from './Tabs/BHM/BusinessHoursMenu'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const IVRPage = props => {
  const { t } = props
  const match = useParams()
  const history = useHistory()
  const location = useLocation()
  const classes = useStyles()
  const { ivr, isLoadingIVR, getIVR } = IVRStore
  const [activeTab, setActiveTab] = useState(0)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  useEffect(() => {
    getIVR(match.customerId, match.groupId, match.ivrId)
  }, [])

  const titleData = {
    mainText: `IVR: ${has(ivr, 'serviceInstanceProfile.name') &&
      ivr.serviceInstanceProfile.name}`
  }

  const handleChange = (event, newValue, hash) => {
    setActiveTab(newValue)
    switch (newValue) {
      case 0:
        history.push('#access_numbers')
        break
      case 1:
        history.push('#business_hours_menu')
        break
      case 2:
        history.push('#after_hours_menu')
        break
      case 3:
        history.push('#whitelist_blacklist')
        break
      case 4:
        history.push('#details')
        break
      case 5:
        history.push(hash || '#ivr_menus')
        break
      case 6:
        history.push('#submenus')
        break
    }
  }

  const returnActiveTab = () => {
    switch (location.hash) {
      case '#access_numbers':
        return 0
      case '#business_hours_menu':
        return 1
      case '#after_hours_menu':
        return 2
      case '#whitelist_blacklist':
        return 3
      case '#details':
        return 4
      case '#ivr_menus':
      case '#ivr_menus_bhm':
      case '#ivr_menus_ahm':
      case '#ivr_menus_hm':
        return 5
      case '#submenus':
        return 6
      default:
        return 0
    }
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event, newValue, hash) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    handleChange(event, newValue, hash)
    setOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prevOpen = useRef(open)
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus()
    }

    prevOpen.current = open
  }, [open])

  if (isLoadingIVR) {
    return <Loading />
  }

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
        <Tab value={0} label={t('access_numbers')} className={classes.tab} />
        <Tab
          value={5}
          label={t('ivr_menus')}
          className={classes.tab}
          onClick={handleToggle}
          ref={anchorRef}
          className={classnames(classes.tab, {
            [classes.displayNone]: ivr.type !== 'Standard'
          })}
        />
        <Tab
          value={6}
          label={t('submenus')}
          className={classnames(classes.tab, {
            [classes.displayNone]: ivr.type !== 'Standard'
          })}
        />
        <Tab
          value={1}
          label={t('business_hours_menu')}
          className={classnames(classes.tab, {
            [classes.displayNone]: !(
              has(ivr, 'businessHoursMenu') && ivr.type === 'Basic'
            )
          })}
        />
        <Tab
          value={2}
          label={t('after_hours_menu')}
          className={classnames(classes.tab, {
            [classes.displayNone]: !(
              has(ivr, 'afterHoursMenu') && ivr.type === 'Basic'
            )
          })}
        />
        <Tab
          value={3}
          label={`${t('whitelist')}/${t('blacklist')}`}
          className={classes.tab}
        />
        <Tab value={4} label={t('details')} className={classes.lastTab} />
      </Tabs>
      <TabPanel value={returnActiveTab()} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={returnActiveTab()} index={1}>
        <BusinessHoursMenu />
      </TabPanel>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={classes.popper}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom'
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={e => handleClose(e, 5, '#ivr_menus_bhm')}>
                    {t('business_hours_menu')}
                  </MenuItem>
                  <MenuItem onClick={e => handleClose(e, 5, '#ivr_menus_ahm')}>
                    {t('after_hours_menu')}
                  </MenuItem>
                  <MenuItem onClick={e => handleClose(e, 5, '#ivr_menus_hm')}>
                    {t('holiday_menu')}
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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

export default withNamespaces()(observer(IVRPage))
