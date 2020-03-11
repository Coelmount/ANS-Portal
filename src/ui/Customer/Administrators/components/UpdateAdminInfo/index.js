import React, { useContext, useEffect } from 'react'
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

import RetrieveAdminInfo from 'stores/RetrieveAdminInfo'
import Loading from 'components/Loading'

import Input from 'components/Input'
import CustomSelect from 'components/Select'
import sharp from 'source/images/svg/sharp.svg'
import useStyles from './styles'

const EditAdministratorInfo = ({
  handleClose,
  show,
  t,
  adminId,
  getCustomerAdmins
}) => {
  const {
    rows,
    getAdminInfo,
    setAdminInfo,
    admin,
    isLoading,
    updateCustomerAdmin
  } = useContext(RetrieveAdminInfo)

  const match = useParams()

  useEffect(() => {
    getAdminInfo(match.customerId, adminId)
  }, [adminId])

  const classes = useStyles()

  return (
    <Dialog className={classes.editInfo} open={show} onClose={handleClose}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box className={classes.editInfoHeader}>
            <Box className={classes.editInfoTitleWrapper}>
              <Typography className={classes.editInfoTitle}>
                {t(`edit_customer_administrator`)}
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
                label={'ID'}
                value={adminId}
                // value={admin.userId}
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
              <Typography className={classes.buttonTitle}>
                {t('cancel')}
              </Typography>
            </Box>
            <Box className={classes.editButtonWrap}>
              <Typography
                className={classes.editButtonTitle}
                onClick={() =>
                  updateCustomerAdmin(
                    match.customerId,
                    adminId,
                    handleClose,
                    getCustomerAdmins
                  )
                }
              >
                {t('save')}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Dialog>
  )
}
export default withNamespaces()(observer(EditAdministratorInfo))
