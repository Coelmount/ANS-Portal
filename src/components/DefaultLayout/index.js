import React, { useState, Fragment } from 'react'
import { observer } from 'mobx-react'
import { useParams, useHistory } from 'react-router-dom'

import { withNamespaces } from 'react-i18next'

import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'

import SvgIcon from '@material-ui/core/SvgIcon'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import PermPhoneMsgOutlinedIcon from '@material-ui/icons/PermPhoneMsgOutlined'
import SettingsPhoneOutlinedIcon from '@material-ui/icons/SettingsPhoneOutlined'

import CustomDrawer from './components/CustomDrawer'
import CustomAppBar from './components/CustomAppBar'

import AdministratorsIcon from 'source/images/components/AdministratorsIcon'
import DetailsIcon from 'source/images/components/DetailsIcon'
import ScheduleIcon from 'source/images/components/ScheduleIcon'
import logo from 'source/images/svg/mtn-logo-nav.svg'
import './styles.css'
import useStyles from './style'

const StyledScheduleIcon = () => <ScheduleIcon className='scheduleIcon' />

const DefaultLayout = ({ t, notFoundPage }) => {
  const classes = useStyles()
  const match = useParams()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const redirectToMainPage = () => {
    if (!!localStorage.getItem('ids')) {
      const ids = JSON.parse(localStorage.getItem('ids'))
      if (ids.tenant_id && ids.group_id) {
        history.push(
          `/customers/${ids.tenant_id}/subaccounts/${ids.group_id}/ans_instances`
        )
        return
      }
      if (ids.tenant_id) {
        history.push(`/customers/${ids.tenant_id}/access_numbers`)
        return
      }
    } else {
      history.push('/customers')
    }
  }

  const adminNavLinks = [
    {
      link: '/customers',
      text: t('customers'),
      icon: PeopleAltOutlinedIcon
    },
    {
      link: '/search',
      text: t('search'),
      icon: SearchOutlinedIcon
    }
  ]

  const customerNavLinks = [
    {
      link: `/customers/${match.customerId}/access_numbers`,
      text: t('access_numbers'),
      icon: PhoneOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/subaccounts`,
      text: t('subaccounts'),
      icon: PeopleAltOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/administrators`,
      text: t('administrators'),
      icon: AdministratorsIcon
    },
    {
      link: `/customers/${match.customerId}/details`,
      text: t('details'),
      icon: DetailsIcon
    }
  ]

  const subaccountNavLinks = [
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances`,
      text: t('ans_instances'),
      name: 'ans_instances',
      icon: SettingsPhoneOutlinedIcon,
      childLinks: [
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic`,
          text: t('basic'),
          name: 'basic'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced`,
          text: t('advanced'),
          name: 'advanced'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/ivr`,
          text: t('ivr'),
          name: 'ivr'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/time_based_routing`,
          text: t('time_based_routing'),
          name: 'time_based_routing'
        }
      ]
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/phone_numbers`,
      text: t('phone_numbers'),
      name: 'phone_numbers',
      icon: PhoneOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/announcements`,
      text: t('announcements'),
      name: 'announcements',
      icon: PermPhoneMsgOutlinedIcon
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/week_schedules`,
      text: t('schedules'),
      name: 'schedules',
      icon: StyledScheduleIcon,
      childLinks: [
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/week_schedules`,
          text: t('week_schedules'),
          name: 'week_schedules'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/holiday_schedules`,
          text: t('holiday_schedules'),
          name: 'holiday_schedules'
        }
      ]
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/administrators`,
      text: t('administrators'),
      name: 'administrators',
      icon: AdministratorsIcon
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/details`,
      text: t('details'),
      name: 'details',
      icon: DetailsIcon
    }
  ]

  const getCurrentLevel = () => {
    if (match.groupId && match.customerId) {
      return subaccountNavLinks
    } else if (match.customerId) {
      return customerNavLinks
    } else {
      return adminNavLinks
    }
  }

  return (
    <Fragment>
      <CustomAppBar
        classes={classes}
        notFoundPage={notFoundPage}
        handleDrawerToggle={handleDrawerToggle}
      />
      {notFoundPage ? (
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Box className='drawerHeader'>
            <img
              src={logo}
              className={classes.logo}
              alt='mtn-logo1'
              onClick={() => redirectToMainPage()}
            />
          </Box>
        </nav>
      ) : (
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Hidden mdUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <CustomDrawer
                classes={classes}
                getCurrentLevel={getCurrentLevel}
              />
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant='permanent'
              open
            >
              <CustomDrawer
                classes={classes}
                getCurrentLevel={getCurrentLevel}
              />
            </Drawer>
          </Hidden>
        </nav>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(DefaultLayout))
