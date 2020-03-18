import React from 'react'

import Box from '@material-ui/core/Box'

import AdminCard from './components/AdminCard'
import useStyles from './styles'

const AdministratorsTemplate = ({
  data,
  updatedUser,
  updateInfo,
  isLoadingData,
  isDeleting,
  handleDelete,
  handleUpdate,
  getAdminInfo,
  subject
}) => {
  const classes = useStyles()
  return (
    <Box className={classes.adminsWrapper}>
      {data.map(admin => (
        <AdminCard
          classes={classes}
          admin={admin}
          key={admin.userId}
          updatedUser={updatedUser}
          getAdminInfo={getAdminInfo}
          updateInfo={updateInfo}
          isLoadingData={isLoadingData}
          isDeleting={isDeleting}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          subject={subject}
        />
      ))}
    </Box>
  )
}

export default AdministratorsTemplate
