import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import CheckIcon from '@material-ui/icons/Check'

import Input from 'components/Input'

import bgImg from 'source/images/other/bg_img.jpg'
import logo from 'source/images/svg/mtn-logo-nav.svg'

import AuthStore from 'stores/Auth'

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
  },
  infoBox: {
    width: 400,
    marginBottom: 30
  },
  checkIcon: {
    width: 22,
    height: 22,
    fontWeight: 600
  },
  checkedInfoTitle: {
    fontWeight: 600,
    textAlign: 'center',
    marginBottom: 10
  },
  checkedInfo: {
    textAlign: 'center',
    marginBottom: 30
  },
  sentInfoBox: {
    height: 140
  }
}))

const Auth = ({ t }) => {
  const [userName, setUserName] = useState('')
  const [isEmailSended, setIsEmailSended] = useState(false)

  const { postSendResetPasswordMail } = AuthStore

  const classes = useStyles()

  const handleEmailChange = e => {
    setUserName(e.target.value)
    setIsEmailSended(false)
  }

  const loginSubmit = e => {
    e.preventDefault()
    const data = {
      username: userName,
      ui_id: 'ans_portal'
    }
    postSendResetPasswordMail(data, setIsEmailSended(true))
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
            <Box className={'login-title'}>{t('reset_password')}</Box>
            <Box className={classes.infoBox}>{t('reset_password_info')}</Box>
            <Box>
              <Box className={'login-box'}>
                <Input
                  icon={<PermIdentityOutlined className={'icon'} />}
                  label={t('user_name')}
                  variant='outlined'
                  value={userName}
                  onChange={handleEmailChange}
                />
              </Box>
            </Box>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={'button'}
              disabled={!userName.length}
            >
              {isEmailSended ? (
                <CheckIcon className={classes.checkIcon} />
              ) : (
                t('submit')
              )}
            </Button>
            <Box className={classes.sentInfoBox}>
              {isEmailSended && (
                <React.Fragment>
                  <Box className={classes.checkedInfoTitle}>
                    {t('latter_to_email')}
                  </Box>
                  <Box className={classes.checkedInfo}>
                    {t('follow_directions')}
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Auth))
