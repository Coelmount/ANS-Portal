import React, { useState, useEffect, useContext, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

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
import LanguageIcon from '@material-ui/icons/Language'

import CustomerAdministrators from 'stores/CustomerAdministrators'
import Loading from 'components/Loading'

// import { SELECTLANGUAGE } from 'source/config'
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
  subject
}) => {
  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatedPassword] = useState('')
  const {
    getCustomerAdminsLanguages,
    clearFields,
    languagesList,
    isLanguagesLoading
  } = useContext(CustomerAdministrators)

  useEffect(() => {
    if (password === repeatPassword) setUserInfo('password', password)
  }, [repeatPassword])

  useEffect(() => {
    getCustomerAdminsLanguages()
  }, [])

  const handleRepeatPasswordChange = (e) => {
    setRepeatedPassword(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <Dialog
      className={classes.createAdminModal}
      open={show}
      onClose={handleClose}
    >
      {isLanguagesLoading ? (
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
                  icon={<img src={sharp} />}
                  label={`${subject[0].toUpperCase() + subject.slice(1)} id`}
                  value={user.userId}
                  onChange={(e) => setUserInfo('userId', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('password')}
                  variant='outlined'
                  value={password}
                  onChange={handlePasswordChange}
                  type={'password'}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<LockOutlinedIcon />}
                  label={t('repeat_password')}
                  variant='outlined'
                  value={repeatPassword}
                  onChange={handleRepeatPasswordChange}
                  type={'password'}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('first_name')}
                  value={user.firstName}
                  onChange={(e) => setUserInfo('firstName', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('last_name')}
                  value={user.lastName}
                  onChange={(e) => setUserInfo('lastName', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <CustomSelect
                  icon={<LanguageIcon />}
                  label={t('language')}
                  options={languagesList.map((item) => {
                    return {
                      label: t(item.name.toLowerCase()),
                      value: item.name
                    }
                  })}
                  value={user.language}
                  onChange={(e) => setUserInfo('language', e.target.value)}
                />
              </Box>
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
              onClick={() => addAdmin()}
              disabled={!user.userId && !repeatPassword}
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
