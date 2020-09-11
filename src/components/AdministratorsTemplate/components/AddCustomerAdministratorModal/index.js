import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import MailOutlinedIcon from '@material-ui/icons/MailOutlined'
import LanguageIcon from '@material-ui/icons/Language'

import CustomerAdministrators from 'stores/CustomerAdministrators'
import CustomersStore from 'stores/Customers'
import SubaccountAdminsStore from 'stores/SubaccountAdmins'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'

import Input from 'components/Input'
import CustomSelect from 'components/Select'
import sharp from 'source/images/svg/sharp.svg'
import useStyles from './styles'

const AddCustomerAdministrator = ({
  handleClose,
  show,
  t,
  user,
  setUserInfo,
  addAdmin,
  subject,
  getUserInfo,
  isLoadingUserInfo
}) => {
  const classes = useStyles()
  const match = useParams()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatedPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)
  const [isPasswordInputActive, setIsPasswordInputActive] = useState(false)
  const [sendWelcomeEmail, setSendWelcomeEmail] = useState(true)

  const {
    getCustomerAdminsLanguages,
    // clearFields,
    languagesList,
    isLanguagesLoading
  } = CustomerAdministrators

  const { isAdding } = match.groupId
    ? SubaccountAdminsStore
    : CustomerAdministrators

  const {
    getCustomer,
    customer: { defaultDomain }
  } = CustomersStore

  useEffect(() => {
    if (repeatPassword) {
      if (password === repeatPassword) {
        setUserInfo('password', password)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repeatPassword, password])

  useEffect(() => {
    setPasswordError(
      password !== repeatPassword &&
        Boolean(repeatPassword) &&
        !isPasswordInputActive
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPasswordInputActive])

  useEffect(() => {
    getCustomer(match.customerId)
    getCustomerAdminsLanguages()
    getUserInfo(match.customerId, match.groupId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRepeatPasswordChange = e => {
    setRepeatedPassword(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const changeWelcomeEmail = () => {
    if (!sendWelcomeEmail) {
      setSendWelcomeEmail(!sendWelcomeEmail)
      setPassword('')
      setRepeatedPassword('')
      setPasswordError(false)
    } else {
      setSendWelcomeEmail(!sendWelcomeEmail)
    }
  }

  const checkDisabledButton = () => {
    if (user.userId && sendWelcomeEmail) {
      return false
    } else if (
      user.userId &&
      !sendWelcomeEmail &&
      repeatPassword &&
      !passwordError
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <Dialog
      className={classes.createAdminModal}
      open={show}
      onClose={handleClose}
    >
      {isAdding || isLanguagesLoading || isLoadingUserInfo ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.addAdminHeader}>
            <Typography className={classes.addAdminTitle}>
              {`${t(`add`)} ${subject}`}
            </Typography>

            <CloseOutlinedIcon
              onClick={handleClose}
              className={classes.closeIcon}
            />
          </DialogTitle>
          <DialogContent>
            <Box className={classes.loginTitleWrapper}>
              <Typography className={classes.loginTitle}>
                {t('login_details')}
              </Typography>
            </Box>
            <Box className={classes.inputsWrapper}>
              <Box className={classes.inputes}>
                <Input
                  icon={<img src={sharp} alt='sharp' />}
                  label={`${subject[0].toUpperCase() + subject.slice(1)} id`}
                  value={user.userId}
                  onChange={e => setUserInfo('userId', e.target.value)}
                />
                {defaultDomain && (
                  <Typography className={classes.maskInput}>
                    {`@${defaultDomain}`}
                  </Typography>
                )}
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<MailOutlinedIcon />}
                  label={t('email')}
                  value={user.emailAddress}
                  onChange={e => setUserInfo('emailAddress', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <Checkbox
                  checked={sendWelcomeEmail}
                  label={t('send_welcome_email')}
                  onChange={changeWelcomeEmail}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('first_name')}
                  value={user.firstName}
                  onChange={e => setUserInfo('firstName', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('last_name')}
                  value={user.lastName}
                  onChange={e => setUserInfo('lastName', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <CustomSelect
                  icon={<LanguageIcon />}
                  label={t('language')}
                  options={languagesList.map(item => {
                    return {
                      label: t(item.name.toLowerCase()),
                      value: item.name
                    }
                  })}
                  value={user.language}
                  onChange={e => setUserInfo('language', e.target.value)}
                />
              </Box>
              {!sendWelcomeEmail && (
                <React.Fragment>
                  <Box className={classes.inputes}>
                    <Input
                      icon={<LockOutlinedIcon />}
                      label={t('password')}
                      autoComplete='new-password'
                      variant='outlined'
                      value={password}
                      onChange={handlePasswordChange}
                      onFocus={() => {
                        setIsPasswordInputActive(true)
                      }}
                      onBlur={() => {
                        setIsPasswordInputActive(false)
                      }}
                      type={'password'}
                    />
                  </Box>
                  <Box className={classes.inputes}>
                    <Input
                      error={passwordError}
                      icon={<LockOutlinedIcon />}
                      label={t('repeat_password')}
                      variant='outlined'
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                      onFocus={() => {
                        setIsPasswordInputActive(true)
                      }}
                      onBlur={() => {
                        setIsPasswordInputActive(false)
                      }}
                      type={'password'}
                      helperText={
                        passwordError ? 'Passwords is not match' : null
                      }
                    />
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={() => handleClose()}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={() => addAdmin(defaultDomain, sendWelcomeEmail)}
              disabled={checkDisabledButton()}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}
export default withNamespaces()(observer(AddCustomerAdministrator))
