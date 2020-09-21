import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import AuthStore from 'stores/Auth'
import Input from 'components/Input'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'

import bgImg from 'source/images/other/bg_img.jpg'
import logo from 'source/images/svg/mtn-logo-nav.svg'

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
  },
  trustWrap: {
    display: 'flex',
    marginBottom: 15
  },
  trustLabel: {
    marginLeft: 10
  }
}))

const TwoFactorAuthentication = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()

  const [code, setCode] = useState('')
  const [isTrusted, setIsTrusted] = useState(true)
  const { postTwoFactorCode, isLogging } = AuthStore

  const loginSubmit = e => {
    e.preventDefault()

    const payload = {
      code,
      trust: isTrusted,
      history
    }
    postTwoFactorCode(payload)
  }

  const handleCodeChange = e => {
    setCode(e.target.value)
  }

  return (
    <>
      {isLogging ? (
        <Loading />
      ) : (
        <>
          <Box className={'header'}>
            <img src={logo} className={'logo'} alt='' />
          </Box>
          <Grid container>
            <Grid item md={6} className={'login-col, display-none-xs'}>
              <img src={bgImg} className={'background-img'} alt='' />
            </Grid>
            <Grid item md={6} xs={12} className={'login-col'}>
              <form onSubmit={loginSubmit} className={'form'}>
                <Box className={'login-title'}>{t('two_factor_auth')}</Box>
                <Box className={classes.infoBox}>{t('two_factor_text')}</Box>
                <Box>
                  <Box className={'login-box'}>
                    <Input
                      icon={<PermIdentityOutlined className={'icon'} />}
                      label={t('code')}
                      variant='outlined'
                      value={code}
                      onChange={handleCodeChange}
                    />
                  </Box>
                  <Box className={classes.trustWrap}>
                    <Checkbox
                      checked={isTrusted}
                      onChange={e => setIsTrusted(e.target.checked)}
                    />
                    <Typography className={classes.trustLabel}>
                      {t('trust_label')}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant='contained'
                  color='primary'
                  type='submit'
                  className={'button'}
                  disabled={!code.length}
                >
                  {t('submit')}
                </Button>
              </form>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default withNamespaces()(observer(TwoFactorAuthentication))
