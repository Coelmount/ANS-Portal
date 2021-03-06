import React, { useState, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import i18n from 'i18n'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import LinkMaterial from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'

import MenuIcon from '@material-ui/icons/Menu'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'

import ChangePasswordModal from 'components/ChangePassword'

import AuthStore from 'stores/Auth'
import LanguagesStore from 'stores/Languages'

import { LANGUAGES } from 'source/config'

const CustomDrawer = ({ classes, notFoundPage, handleDrawerToggle, t }) => {
  const history = useHistory()
  const {
    // user,
    logOut,
    username
  } = AuthStore
  const { getLocale } = LanguagesStore
  const [anchorEl, setAnchorEl] = useState(null)
  const [showChangePassModal, setShowChangePassModal] = useState(false)

  const changeLanguage = lng => {
    getLocale(lng, true)
    i18n.changeLanguage(lng)
  }

  const handleOpenProfileMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseProfileMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Fragment>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          {!notFoundPage && (
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box className={classes.header}>
            <LinkMaterial component='button' onClick={handleOpenProfileMenu}>
              <Box className={classes.headerBlock}>
                <AccountCircleIcon className={classes.userIcon} />
                <Typography className={classes.userName}>{username}</Typography>
                <ExpandMoreOutlinedIcon className={classes.expandMoreIcon} />
              </Box>
            </LinkMaterial>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseProfileMenu}
              className={classes.profileMenu}
            >
              <MenuItem
                onClick={() => {
                  setShowChangePassModal(true)
                  setAnchorEl(false)
                }}
              >
                {t('change_password')}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logOut()
                  history.push('/')
                }}
              >
                {t('logout')}
              </MenuItem>
            </Menu>
            <Box className={classes.headerBlock}>
              <Select
                className={classes.langBlock}
                value={localStorage.getItem('i18nextLng')}
                onChange={e => changeLanguage(e.target.value)}
                IconComponent={ExpandMoreOutlinedIcon}
              >
                {LANGUAGES.map((lang, index) => (
                  <MenuItem
                    value={lang.value}
                    key={`${index}`}
                    className={classes.listItem}
                  >
                    <img
                      className={classes.langIcon}
                      src={lang.img}
                      alt='language icon'
                    />
                    {` ${lang.lable}`}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Toolbar>
        {showChangePassModal && (
          <ChangePasswordModal
            open={showChangePassModal}
            handleClose={() => setShowChangePassModal(false)}
          />
        )}
      </AppBar>
    </Fragment>
  )
}

export default withNamespaces()(observer(CustomDrawer))
