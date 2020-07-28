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

import logo from 'source/images/svg/mtn-logo-nav.svg'
import './styles.css'
import useStyles from './style'

const AdministratorsIcon = () => {
  return (
    <SvgIcon>
      <path d='M5.83,10C5.42,8.83 4.31,8 3,8A3,3 0 0,0 0,11A3,3 0 0,0 3,14C4.31,14 5.42,13.17 5.83,12H8V14H10V12H11V10H5.83M3,12A1,1 0 0,1 2,11A1,1 0 0,1 3,10A1,1 0 0,1 4,11A1,1 0 0,1 3,12M16,4A4,4 0 0,0 12,8A4,4 0 0,0 16,12A4,4 0 0,0 20,8A4,4 0 0,0 16,4M16,10.1A2.1,2.1 0 0,1 13.9,8A2.1,2.1 0 0,1 16,5.9C17.16,5.9 18.1,6.84 18.1,8C18.1,9.16 17.16,10.1 16,10.1M16,13C13.33,13 8,14.33 8,17V20H24V17C24,14.33 18.67,13 16,13M22.1,18.1H9.9V17C9.9,16.36 13,14.9 16,14.9C18.97,14.9 22.1,16.36 22.1,17V18.1Z' />
    </SvgIcon>
  )
}

const DetailsIcon = () => {
  return (
    <SvgIcon>
      <path d='M11 9C11 10.66 9.66 12 8 12C6.34 12 5 10.66 5 9C5 7.34 6.34 6 8 6C9.66 6 11 7.34 11 9M14 20H2V18C2 15.79 4.69 14 8 14C11.31 14 14 15.79 14 18M7 9C7 9.55 7.45 10 8 10C8.55 10 9 9.55 9 9C9 8.45 8.55 8 8 8C7.45 8 7 8.45 7 9M4 18H12C12 16.9 10.21 16 8 16C5.79 16 4 16.9 4 18M22 12V14H13V12M22 8V10H13V8M22 4V6H13V4Z' />
    </SvgIcon>
  )
}

const SchedulesIcon = () => {
  return (
    <SvgIcon className='scheduleIcon'>
      <path d='M3.11111 8H4.66667V9.6H3.11111V8ZM14 3.2V14.4C14 14.8243 13.8361 15.2313 13.5444 15.5314C13.2527 15.8314 12.857 16 12.4444 16H1.55556C0.692222 16 0 15.28 0 14.4V3.2C0 2.77565 0.163888 2.36869 0.455612 2.06863C0.747335 1.76857 1.143 1.6 1.55556 1.6H2.33333V0H3.88889V1.6H10.1111V0H11.6667V1.6H12.4444C12.857 1.6 13.2527 1.76857 13.5444 2.06863C13.8361 2.36869 14 2.77565 14 3.2ZM1.55556 4.8H12.4444V3.2H1.55556V4.8ZM12.4444 14.4V6.4H1.55556V14.4H12.4444ZM9.33333 9.6V8H10.8889V9.6H9.33333ZM6.22222 9.6V8H7.77778V9.6H6.22222ZM3.11111 11.2H4.66667V12.8H3.11111V11.2ZM9.33333 12.8V11.2H10.8889V12.8H9.33333ZM6.22222 12.8V11.2H7.77778V12.8H6.22222Z' />
    </SvgIcon>
  )
}

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
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced/destinations`,
          text: t('advanced'),
          name: 'advanced',
          childLinks: [
            {
              link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced/access_numbers`,
              text: t('access_numbers'),
              name: 'access_numbers'
            },
            {
              link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced/destinations`,
              text: t('destinations'),
              name: 'destinations'
            },
            {
              link: `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced/destination_groups`,
              text: t('destination_groups'),
              name: 'destination_groups'
            }
          ]
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
      icon: SchedulesIcon,
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
