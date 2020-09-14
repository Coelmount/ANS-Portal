import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import LockOutlined from '@material-ui/icons/LockOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'

import Input from 'components/Input'

import bgImg from 'source/images/other/bg_img.jpg'
import logo from 'source/images/svg/mtn-logo-nav.svg'

const ResetPassword = ({ t }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(
    false
  )
  const [passwordsIsNotMatch, setPasswordsIsNotMatch] = useState(false)

  const changePasswordSubmit = e => {
    e.preventDefault()
  }

  const handleChangePassword = e => {
    if (passwordsIsNotMatch) {
      setPasswordsIsNotMatch(false)
    }
    setPassword(e.target.value)
  }

  const handleChangeConfirmPassword = e => {
    if (passwordsIsNotMatch) {
      setPasswordsIsNotMatch(false)
    }
    setConfirmPassword(e.target.value)
  }

  const passwordValidation = () => {
    if (password !== confirmPassword) {
      setPasswordsIsNotMatch(true)
    }
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
          <form onSubmit={changePasswordSubmit} className={'form'}>
            <Box className={'login-title'}>{t('reset_password')}</Box>
            <Box>
              <Box className={'password-box'}>
                <Input
                  icon={<LockOutlined className={'icon'} />}
                  label={t('password')}
                  variant='outlined'
                  value={password}
                  onChange={handleChangePassword}
                  onBlur={() => confirmPassword && passwordValidation()}
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
              <Box className={'password-box'}>
                <Input
                  error={passwordsIsNotMatch}
                  icon={<LockOutlined className={'icon'} />}
                  label={t('confirm_password')}
                  variant='outlined'
                  value={confirmPassword}
                  onChange={handleChangeConfirmPassword}
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  onBlur={passwordValidation}
                  helperText={
                    passwordsIsNotMatch ? 'Passwords is not match' : null
                  }
                />
                {isConfirmPasswordVisible ? (
                  <VisibilityOutlinedIcon
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className={`visibilityIcon`}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className={`visibilityOffIcon`}
                  />
                )}
              </Box>
            </Box>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              className={'button'}
            >
              {t('change_password')}
            </Button>
          </form>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(ResetPassword))
