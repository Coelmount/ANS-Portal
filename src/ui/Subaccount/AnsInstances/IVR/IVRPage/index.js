import React, { useState, useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import has from 'lodash/has'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

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

  const handleChange = (event, newValue) => {
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
        history.push('#ivr_menu')
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
        return 5
      default:
        return 0
    }
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = (event, newValue) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    handleChange(event, newValue)
    setOpen(false)
  }

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault()
      setOpen(false)
    }
  }

  const prevOpen = React.useRef(open)
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
        />
        {has(ivr, 'businessHoursMenu') && ivr.type === 'Standard' && (
          <Tab
            value={1}
            label={t('business_hours_menu')}
            className={classes.tab}
          />
        )}
        {has(ivr, 'afterHoursMenu') && ivr.type === 'Basic' && (
          <Tab
            value={2}
            label={t('after_hours_menu')}
            className={classes.tab}
          />
        )}
        <Tab
          value={3}
          label={`${t('whitelist')}/${t('blacklist')}`}
          className={classes.tab}
        />
        <Tab value={4} label={t('details')} className={classes.lastTab} />
      </Tabs>
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
                  <MenuItem onClick={e => handleClose(e, 5)}>
                    {t('business_hours_menu')}
                  </MenuItem>
                  <MenuItem onClick={e => handleClose(e, 5)}>
                    {t('after_hours_menu')}
                  </MenuItem>
                  <MenuItem onClick={e => handleClose(e, 5)}>
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

export default withNamespaces()(observer(IVRPage))
