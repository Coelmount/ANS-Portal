import React, { useState, useContext, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LanguageIcon from '@material-ui/icons/Language'

import CreateCustomerAdminStore from 'stores/CreateCustomerAdministrator'

import Input from 'components/Input'
import CustomSelect from 'components/Select'
import sharp from 'source/images/svg/sharp.svg'
import useStyles from './styles'

const AddCustomerAdministrator = ({ handleClose, show, t }) => {
  const { admin, setAdminInfo, addCustomerAdmin } = useContext(
    CreateCustomerAdminStore
  )
  const match = useParams()

  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatedPassword] = useState('')
  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }
  useEffect(() => {
    if (password === repeatPassword) setAdminInfo('password', password)
  }, [repeatPassword])
  const handleRepeatPasswordChange = e => {
    setRepeatedPassword(e.target.value)
  }

  return (
    <Dialog
      className={classes.createAdminModal}
      open={show}
      onClose={handleClose}
    >
      <Box className={classes.addAdminHeader}>
        <Box className={classes.addAdminTitleWrapper}>
          <Typography className={classes.addAdminTitle}>
            {t(`add_customer_administrator`)}
          </Typography>
        </Box>
        <CloseOutlinedIcon
          onClick={handleClose}
          className={classes.closeIcon}
        />
      </Box>
      <Box className={classes.loginTitleWrapper}>
        <Typography className={classes.loginTitle}>
          {t('login_details')}
        </Typography>
      </Box>
      <Box className={classes.inputsWrapper}>
        <Box className={classes.inputes}>
          <Input
            icon={<img src={sharp} />}
            label={t('customer_administrator_id')}
            value={admin.userId}
            onChange={e => setAdminInfo('userId', e.target.value)}
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
            // value={admin.password}
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
            value={admin.firstName}
            onChange={e => setAdminInfo('firstName', e.target.value)}
          />
        </Box>
        <Box className={classes.inputes}>
          <Input
            icon={<PersonOutlineIcon />}
            label={t('last_name')}
            value={admin.lastName}
            onChange={e => setAdminInfo('lastName', e.target.value)}
          />
        </Box>
        <Box className={classes.inputes}>
          <CustomSelect
            icon={<LanguageIcon />}
            label={t('language')}
            options={[
              { label: 'English', value: 'English' },
              { label: 'French', value: 'French' },
              { label: 'Spanish', value: 'Spanish' },
              { label: 'Portuguese', value: 'Portuguese' }
            ]}
            value={admin.language}
            onChange={e => setAdminInfo('language', e.target.value)}
          />
        </Box>
      </Box>
      <Box className={classes.buttonsWrapper}>
        <Box onClick={handleClose} className={classes.cancelButtonWrap}>
          <Typography className={classes.buttonTitle}>{t('cancel')}</Typography>
        </Box>
        <Box
          className={classes.addButtonWrap}
          onClick={() =>
            addCustomerAdmin({ id: match.customerId, closeModal: handleClose })
          }
        >
          <Typography className={classes.addButtonTitle}>{t('add')}</Typography>
        </Box>
      </Box>
    </Dialog>
  )
}
export default withNamespaces()(observer(AddCustomerAdministrator))
