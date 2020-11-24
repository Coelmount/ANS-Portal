import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react-lite'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import Loading from 'components/Loading'
import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'

import UserStore from 'stores/user'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined'

import useStyles from './styles'

const ChangePassword = props => {
  const classes = useStyles()
  const { open, handleClose, t } = props
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsNotMatchError, setPasswordsNotMatchError] = useState(false)
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(
    false
  )

  const {
    updatePasswordLowAdmin,
    updatePasswordSuperAdmin,
    isUpdating
  } = UserStore

  const checkPasswords = () => {
    if (newPassword !== confirmPassword) {
      setPasswordsNotMatchError(true)
    } else {
      setPasswordsNotMatchError(false)
    }
  }

  const changePassword = () => {
    if (localStorage.getItem('ids')) {
      updatePasswordLowAdmin(
        { oldPassword, newPassword, confirmPassword },
        handleClose
      )
    } else {
      updatePasswordSuperAdmin({ password: newPassword }, handleClose)
    }
  }

  return (
    <Dialog className={classes.modal} open={open} onClose={handleClose}>
      {isUpdating ? (
        <Loading />
      ) : (
        <React.Fragment>
          <DialogTitle className={classes.title}>
            {t('change_password')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <ModalHelperText title='change_password' />
            <Box className={classes.contentBox}>
              {localStorage.getItem('ids') && (
                <Box className={classes.inputBox}>
                  <Input
                    icon={<LockOutlinedIcon />}
                    label={t('old_password')}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    autoComplete='new-password'
                    type={isOldPasswordVisible ? 'text' : 'password'}
                  />
                  {isOldPasswordVisible ? (
                    <VisibilityOutlinedIcon
                      onClick={() =>
                        setIsOldPasswordVisible(!isOldPasswordVisible)
                      }
                      className={classes.visibilityIcon}
                    />
                  ) : (
                    <VisibilityOffOutlinedIcon
                      onClick={() =>
                        setIsOldPasswordVisible(!isOldPasswordVisible)
                      }
                      className={classes.visibilityOffIcon}
                    />
                  )}
                </Box>
              )}
              <Box className={classes.inputBox}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('new_password')}
                  value={newPassword}
                  onChange={e => {
                    setNewPassword(e.target.value)
                    setPasswordsNotMatchError(false)
                  }}
                  type={isPasswordVisible ? 'text' : 'password'}
                  onBlur={() => {
                    if (passwordsNotMatchError || confirmPassword) {
                      checkPasswords()
                    }
                  }}
                  autoComplete='new-password'
                />
                {isPasswordVisible ? (
                  <VisibilityOutlinedIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={classes.visibilityIcon}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={classes.visibilityOffIcon}
                  />
                )}
              </Box>
              <Box className={classes.inputBox}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('confirm_password')}
                  value={confirmPassword}
                  onChange={e => {
                    setConfirmPassword(e.target.value)
                    setPasswordsNotMatchError(false)
                  }}
                  helperText={
                    passwordsNotMatchError ? t('passwords_not_match') : ''
                  }
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  error={passwordsNotMatchError}
                  onBlur={checkPasswords}
                  autoComplete='new-password'
                />
                {isConfirmPasswordVisible ? (
                  <VisibilityOutlinedIcon
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className={classes.visibilityIcon}
                  />
                ) : (
                  <VisibilityOffOutlinedIcon
                    onClick={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className={classes.visibilityOffIcon}
                  />
                )}
              </Box>
            </Box>
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={changePassword}
              disabled={passwordsNotMatchError}
            >
              {t('change')}
            </Button>
          </DialogActions>
        </React.Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(ChangePassword))
