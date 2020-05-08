import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Box from '@material-ui/core/Box'
import SvgIcon from '@material-ui/core/SvgIcon'

import CloseIcon from '@material-ui/icons/Close'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LanguageIcon from '@material-ui/icons/Language'

import CustomerAdministrators from 'stores/CustomerAdministrators'
import SubaccountAdministrators from 'stores/SubaccountAdmins'

import DeleteModal from 'components/DeleteModal'
import UpdateAdminInfo from '../UpdateAdminInfo'

import adminIcon from 'source/images/svg/adminIcon.svg'

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
  const EditIcon = () => {
    return (
      <SvgIcon
        onClick={() => {
          showModal()
          setAdminId(admin.userId)
        }}
        className={classes.editIcon}
      >
        <path d='M10.9079 4.22321L6.02288 9.10666C5.69876 9.39333 5.49825 9.79438 5.466 10.1613V11.8693L7.11718 11.8709C7.54456 11.8406 7.94239 11.6417 8.26183 11.2763L13.1113 6.42677L10.9079 4.22321ZM12.0395 3.09202L14.2427 5.2954L14.9578 4.58029C15.0271 4.51101 15.066 4.41704 15.066 4.31906C15.066 4.22107 15.0271 4.12711 14.9578 4.05782L13.2749 2.37488C13.2064 2.30583 13.1131 2.26699 13.0159 2.26699C12.9186 2.26699 12.8254 2.30583 12.7568 2.37488L12.0395 3.09202ZM16.666 9.46699V15.067C16.666 15.9506 15.9496 16.667 15.066 16.667H2.26601C1.38236 16.667 0.666016 15.9506 0.666016 15.067V2.26699C0.666016 1.38334 1.38236 0.666992 2.26601 0.666992H7.866V2.26699H2.26601V15.067H15.066V9.46699H16.666ZM13.0159 0.666992C13.5397 0.666992 14.0418 0.876128 14.4085 1.24573L16.0892 2.92645C16.4585 3.29579 16.666 3.79673 16.666 4.31906C16.666 4.84138 16.4585 5.34232 16.0892 5.71166L9.432 12.366C8.87321 13.0106 8.08112 13.4066 7.17368 13.4689H3.86601V12.6689L3.86861 10.0968C3.93676 9.25326 4.32894 8.46886 4.9272 7.94173L11.6223 1.24669C11.9911 0.875656 12.4927 0.666992 13.0159 0.666992Z' />
      </SvgIcon>
    )
  }

  const match = useParams()
  const [isOpened, setIsOpened] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  // const [customerNameToDelete, setCustomerNameToDelete] = useState('')
  const [adminId, setAdminId] = useState('')

  const { getSubaccountAdmins } = SubaccountAdministrators
  const { getCustomerAdmins } = CustomerAdministrators

  const showModal = () => {
    setIsOpened(true)
  }

  const hideModal = () => {
    match.groupId
      ? getSubaccountAdmins({ id: match.customerId, groupId: match.groupId })
      : getCustomerAdmins(match.customerId)
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
            <Box className={classes.buttonIconsWrapper}>
              <EditIcon className={classes.icon} />
            </Box>
            <Box className={classes.closeButtonIconWrapper}>
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
        action={t('to_delete')}
        titleAction={t(`delete`)}
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
