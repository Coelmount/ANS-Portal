import React, { useEffect, useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LanguageIcon from '@material-ui/icons/Language'

import CustomerAdministrators from 'stores/CustomerAdministrators'
import Loading from 'components/Loading'

import { SELECTLANGUAGE } from 'source/config'
import Input from 'components/Input'
import CustomSelect from 'components/Select'
import sharp from 'source/images/svg/sharp.svg'
import useStyles from './styles'

const UpdateAdminInfo = ({
  handleClose,
  show,
  t,
  userId,
  user,
  updateInfo,
  isLoadingData,
  handleUpdate,
  getAdminInfo,
  editSubject
}) => {
  const classes = useStyles()
  const match = useParams()

  const {
    getCustomerAdminsLanguages,
    languagesList,
    isLanguagesLoading
  } = useContext(CustomerAdministrators)

  const [changedSubaccountAdmin, setChangedSubaccountAdmin] = useState({
    firstName: '',
    lastName: '',
    language: ''
  })

  useEffect(() => {
    getAdminInfo(userId)
  }, [userId])

  useEffect(() => {
    getCustomerAdminsLanguages()
  }, [])
  console.log(user, 'user in comp')
  return (
    <Dialog className={classes.editInfo} open={show} onClose={handleClose}>
      {isLoadingData ? (
        <Loading />
      ) : (
        <>
          <DialogTitle className={classes.editInfoHeader}>
            <Typography className={classes.editInfoTitle}>
              {` ${t(`edit`)} ${editSubject}`}
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
                  icon={<img src={sharp} at='icon' />}
                  label={'ID'}
                  value={userId}
                />
              </Box>

              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('first_name')}
                  value={user.firstName}
                  onChange={(e) => updateInfo('firstName', e.target.value)}
                />
              </Box>
              <Box className={classes.inputes}>
                <Input
                  icon={<PersonOutlineIcon />}
                  label={t('last_name')}
                  value={user.lastName}
                  onChange={(e) => updateInfo('lastName', e.target.value)}
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
                  onChange={(e) =>
                    updateInfo(
                      'language',
                      e.target.value[0].toUpperCase() + e.target.value.slice(1)
                    )
                  }
                />
              </Box>
            </Box>
          </DialogContent>
          <DialogActions className={classes.buttonsWrapper}>
            <Box onClick={handleClose} className={classes.cancelButtonWrap}>
              <Typography className={classes.buttonTitle}>
                {t('cancel')}
              </Typography>
            </Box>
            <Box
              onClick={() => handleUpdate(userId)}
              className={classes.editButtonWrap}
            >
              <Typography className={classes.editButtonTitle}>
                {t('save')}
              </Typography>
            </Box>
          </DialogActions>
        </>
      )}
    </Dialog>
  )
}
export default withNamespaces()(observer(UpdateAdminInfo))
