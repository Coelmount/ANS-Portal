import React, { useState, Fragment } from 'react'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import { withNamespaces } from 'react-i18next'

import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Box from '@material-ui/core/Box'

import SvgIcon from '@material-ui/core/SvgIcon'
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

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
const AnsInstancesIcon = () => {
  return (
    <SvgIcon className='instancesIcon'>
      <path d='M12 0C11.0717 0 10.1815 0.368749 9.52513 1.02513C8.86875 1.6815 8.5 2.57174 8.5 3.5C8.5 4.42826 8.86875 5.3185 9.52513 5.97487C10.1815 6.63125 11.0717 7 12 7C12.9283 7 13.8185 6.63125 14.4749 5.97487C15.1313 5.3185 15.5 4.42826 15.5 3.5C15.5 2.57174 15.1313 1.6815 14.4749 1.02513C13.8185 0.368749 12.9283 0 12 0ZM12 2C12.3978 2 12.7794 2.15804 13.0607 2.43934C13.342 2.72064 13.5 3.10218 13.5 3.5C13.5 3.89782 13.342 4.27936 13.0607 4.56066C12.7794 4.84196 12.3978 5 12 5C11.6022 5 11.2206 4.84196 10.9393 4.56066C10.658 4.27936 10.5 3.89782 10.5 3.5C10.5 3.10218 10.658 2.72064 10.9393 2.43934C11.2206 2.15804 11.6022 2 12 2ZM5.5 3C4.83696 3 4.20107 3.26339 3.73223 3.73223C3.26339 4.20107 3 4.83696 3 5.5C3 6.44 3.53 7.25 4.29 7.68C4.65 7.88 5.06 8 5.5 8C5.94 8 6.35 7.88 6.71 7.68C7.08 7.47 7.39 7.17 7.62 6.81C6.89 5.86 6.5 4.7 6.5 3.5C6.5 3.41 6.5 3.31 6.5 3.22C6.2 3.08 5.86 3 5.5 3ZM18.5 3C18.14 3 17.8 3.08 17.5 3.22C17.5 3.31 17.5 3.41 17.5 3.5C17.5 4.7 17.11 5.86 16.38 6.81C16.5 7 16.63 7.15 16.78 7.3C16.94 7.45 17.1 7.58 17.29 7.68C17.65 7.88 18.06 8 18.5 8C18.94 8 19.35 7.88 19.71 7.68C20.47 7.25 21 6.44 21 5.5C21 4.83696 20.7366 4.20107 20.2678 3.73223C19.7989 3.26339 19.163 3 18.5 3ZM12 9C9.66 9 5 10.17 5 12.5V14H19V12.5C19 10.17 14.34 9 12 9ZM4.71 9.55C2.78 9.78 0 10.76 0 12.5V14H3V12.07C3 11.06 3.69 10.22 4.71 9.55ZM19.29 9.55C20.31 10.22 21 11.06 21 12.07V14H24V12.5C24 10.76 21.22 9.78 19.29 9.55ZM12 11C13.53 11 15.24 11.5 16.23 12H7.77C8.76 11.5 10.47 11 12 11Z' />
    </SvgIcon>
  )
}

const DefaultLayout = ({ t, notFoundPage }) => {
  const classes = useStyles()
  const match = useParams()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
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
      link: `/customers/${match.customerId}/access-numbers`,
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
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances`,
      text: 'My ANS instances',
      name: 'ans_instances',
      icon: AnsInstancesIcon,
      childLinks: [
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances/basic`,
          text: 'Basic'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances/advanced`,
          text: 'Advanced'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances/1_level_ivr`,
          text: '1-level IVR'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances/multi_level_ivr`,
          text: 'Multi-level IVR'
        },
        {
          link: `/customers/${match.customerId}/subaccounts/${match.groupId}/my_ans_instances/time_based_routing`,
          text: 'Time based routing'
        }
      ]
    },
    {
      link: `/customers/${match.customerId}/subaccounts/${match.groupId}/phone_numbers`,
      text: 'Phone numbers',
      name: 'phone_numbers',
      icon: PhoneOutlinedIcon
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
    if (match.groupId) {
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
            <img src={logo} className={classes.logo} alt='mtn-logo' />
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
