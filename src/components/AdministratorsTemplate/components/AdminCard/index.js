import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Box from '@material-ui/core/Box'

import CloseIcon from '@material-ui/icons/Close'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LanguageIcon from '@material-ui/icons/Language'

import DeleteModal from 'components/DeleteModal'
import UpdateAdminInfo from '../UpdateAdminInfo'
import adminIcon from 'source/images/svg/adminIcon.svg'
import edit from 'source/images/svg/edit.svg'

const AdminCard = ({
  classes,
  admin,
  updatedUser,
  updateInfo,
  isLoadingData,
  isDeleting,
  handleDelete,
  handleUpdate,
  getAdminInfo,
  subject,
  t
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerNameToDelete, setCustomerNameToDelete] = useState('')
  const [adminId, setAdminId] = useState('')

  const showModal = () => {
    setIsOpened(true)
  }
  const hideModal = () => {
    setIsOpened(false)
  }
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  return (
    <Card className={classes.cardWrapper}>
      <CardContent className={classes.cardContentWrapper}>
        <Box className={classes.accountInfoWrapper}>
          <Box className={classes.accountNameWrapper}>
            <Box className={classes.iconWrapper}>
              <img
                src={adminIcon}
                alt='admin-icon'
                className={classes.accountNameIcon}
              />
            </Box>
            <Typography className={classes.accountName}>
              {admin.userId}
            </Typography>
          </Box>
          <Box className={classes.editDeleteButtonWrapper}>
            <Box className={classes.iconWrapper}>
              <img
                src={edit}
                alt='edit-svg'
                className={classes.icon}
                onClick={() => {
                  showModal()
                  setAdminId(admin.userId)
                }}
              />
            </Box>
            <Box className={classes.iconWrapper}>
              <CloseIcon
                className={classes.icon}
                onClick={() => {
                  handleOpenDeleteModal()
                  setAdminId(admin.userId)
                }}
              />
            </Box>
          </Box>
        </Box>
        {(admin.firstName || admin.lastName) && (
          <Box className={classes.adminFullNameWrapper}>
            <Box className={classes.iconWrapper}>
              <PersonOutlineIcon className={classes.adminFullNameIcon} />
            </Box>
            <Typography className={classes.adminFullName}>
              {admin.firstName} {admin.lastName}
            </Typography>
          </Box>
        )}
        <Box className={classes.languageWrapper}>
          <Box className={classes.iconWrapper}>
            <LanguageIcon className={classes.languageIcon} />
          </Box>
          <Typography className={classes.language}>
            {t(admin.language.toLowerCase())}
          </Typography>
        </Box>
      </CardContent>
      <UpdateAdminInfo
        show={isOpened}
        handleClose={hideModal}
        userId={adminId}
        updateInfo={updateInfo}
        user={updatedUser}
        isLoadingData={isLoadingData}
        handleUpdate={handleUpdate}
        getAdminInfo={getAdminInfo}
        editSubject={subject}
      />
      <DeleteModal
        show={isDeleteModalOpen}
        classes={classes}
        open={isDeleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        deleteInfo={{ id: adminId }}
        isDeleting={isDeleting}
        deleteSubject={subject}
      />
    </Card>
  )
}
export default withNamespaces()(AdminCard)
