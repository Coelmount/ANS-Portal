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

import UserStore from 'stores/user'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import useStyles from './styles'

const ChangePassword = props => {
  const classes = useStyles()
  const { open, handleClose, t } = props
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsNotMatchError, setPasswordsNotMatchError] = useState(false)

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
            <Box className={classes.contentBox}>
              {localStorage.getItem('ids') && (
                <Box className={classes.inputBox}>
                  <Input
                    icon={<LockOutlinedIcon />}
                    label={t('old_password')}
                    value={oldPassword}
                    onChange={e => setOldPassword(e.target.value)}
                    type='password'
                    autoComplete='new-password'
                  />
                </Box>
              )}
              <Box className={classes.inputBox}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('new_password')}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  onBlur={() => {
                    if (passwordsNotMatchError || confirmPassword) {
                      checkPasswords()
                    }
                  }}
                  type='password'
                  autoComplete='new-password'
                />
              </Box>
              <Box className={classes.inputBox}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('confirm_password')}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  helperText={
                    passwordsNotMatchError ? t('passwords_not_match') : ''
                  }
                  type='password'
                  error={passwordsNotMatchError}
                  onBlur={checkPasswords}
                  autoComplete='new-password'
                />
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
