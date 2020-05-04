import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Link, useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import LockOutlined from '@material-ui/icons/LockOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'

import AuthStore from 'stores/Auth'
import bgImg from 'source/images/other/bg_img.jpg'
import logo from 'source/images/svg/mtn-logo-nav.svg'
import Input from 'components/Input'
import Checkbox from 'components/Checkbox'
import { makeStyles } from '@material-ui/core/styles'

import { withNamespaces } from 'react-i18next'

import './index.css'

const useStyles = makeStyles(theme => ({
  checkbox: {
    boxShadow: '0px 2px 4px rgba(204, 204, 204, 0.25)',
    width: '18px',
    height: '18px',
    marginRight: '9px',
    '& .MuiSvgIcon-root': {
      color: theme.palette.primary.main
    }
  },
  label: {
    '& .MuiTypography-body1': {
      fontSize: '14px'
    }
  },
  link: {
    marginLeft: 5,
    fontSize: '14px',
    color: theme.palette.secondary.main,
    fontFamily: 'MTN',
    fontWeight: 'normal',
    textDecoration: 'none'
  }
}))

const Auth = ({ t }) => {
  const { postLogin } = AuthStore
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const history = useHistory()
  const classes = useStyles()

  const handleLoginChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const loginSubmit = e => {
    e.preventDefault()
    postLogin({ username, password }, history)
  }

  return (
    <React.Fragment>
      <Box className={'header'}>
        <img src={logo} className={'logo'} alt='' />
      </Box>
      <Grid container>
        <Grid item md={6} className={'login-col, display-none-xs'}>
          <img src={bgImg} className={'background-img'} alt='' />
        </Grid>
        <Grid item md={6} xs={12} className={'login-col'}>
          <form onSubmit={loginSubmit} className={'form'}>
            <Box className={'login-title'}>{t('welcome_to_ans')}</Box>
            <Box>
              <Box className={'login-box'}>
                <Input
                  icon={<PermIdentityOutlined className={'icon'} />}
                  label={t('user_name')}
                  variant='outlined'
                  value={username}
                  onChange={handleLoginChange}
                />
              </Box>
            </Box>
            <Box>
              <Box className={'password-box'}>
                <Input
                  icon={<LockOutlined className={'icon'} />}
                  label={t('password')}
                  variant='outlined'
                  value={password}
                  onChange={handlePasswordChange}
                  type={isPasswordVisible ? 'text' : 'password'}
                />
                {isPasswordVisible ? (
                  <VisibilityOutlinedIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={`visibilityIcon`}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={`visibilityOffIcon`}
                  />
                )}
              </Box>
            </Box>
            <Box className={'support-box'}>
              <Checkbox className={classes.checkbox} label={t('remember_me')} />
              <Link to='/resetpassword' className={classes.link}>
                {t('reset_password')}
              </Link>
            </Box>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={'button'}
            >
              {t('log_in')}
            </Button>
            <Box>
              {t('dont_have_account_message')}{' '}
              <Link to='/signup' className={classes.link}>
                {t('sign_up')}
              </Link>
            </Box>
          </form>
          <Box className={'gtac'}>
            <Link to='/gtac' className={classes.link}>
              {t('general_terms_and_conditions')}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Auth))
