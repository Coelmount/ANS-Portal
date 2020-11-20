import React, { Fragment, useEffect, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import HolidaySchedulesStore from 'stores/HolidaySchedules'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import AddScheduleModal from '../components/AddScheduleModal'

import useStyles from '../styles'

const HolidaySchedules = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false)
  const [deleteInfo, setDeleteInfo] = useState({ name: '', id: null })

  const {
    getSchedules,
    schedules,
    isSchedulesLoading,
    deleteSchedule,
    isDeletingSchedule,
    postSchedule,
    isSchedulePosting
  } = HolidaySchedulesStore

  useEffect(() => {
    getSchedules(match.customerId, match.groupId)
  }, [getSchedules, match.customerId, match.groupId])

  // Delete modal handlers
  const handleOpenDeleteModal = name => {
    setIsDeleteModalOpen(true)
    setDeleteInfo({ id: name, name: '' })
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    getSchedules(match.customerId, match.groupId)
  }

  const handleDelete = name => {
    const payload = {
      customerId: match.customerId,
      groupId: match.groupId,
      closeModal: handleCloseDeleteModal,
      name
    }
    deleteSchedule(payload)
  }

  // Add modal handlers
  const handleOpenAddScheduleModal = () => {
    setIsAddScheduleModalOpen(true)
  }

  const handleCloseAddScheduleModal = () => {
    setIsAddScheduleModalOpen(false)
    getSchedules(match.customerId, match.groupId)
  }

  const titleData = {
    mainText: `schedules_holiday_schedules`,
    iconCapture: t('add_schedule'),
    Icon: <AddOutlinedIcon />
  }

  const columns = [
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <Link
          to={`/customers/${match.customerId}/subaccounts/${match.groupId}/schedules/holiday_schedules/${row.name}`}
          className={classes.link}
        >
          {row.name}
        </Link>
      )
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.name)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  return (
    <Fragment>
      {isSchedulesLoading ? (
        <Loading />
      ) : (
        <Box className={classes.root}>
          <Paper>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock
                titleData={titleData}
                handleOpen={handleOpenAddScheduleModal}
              />
            </CustomContainer>
            <CustomTable
              classes={classes}
              columns={columns}
              rows={schedules}
              searchCriterias={['name']}
              noAvailableDataMessage={t('no_schedules_available')}
              idColStyles={classes.idColStyles}
              tableId={'holiday_schedules'}
            />
            {isAddScheduleModalOpen && (
              <AddScheduleModal
                open={isAddScheduleModalOpen}
                handleClose={handleCloseAddScheduleModal}
                title='add_holiday_schedule'
                postSchedule={postSchedule}
                isSchedulePosting={isSchedulePosting}
                closeModal={handleCloseAddScheduleModal}
              />
            )}
            {isDeleteModalOpen && (
              <DeleteModal
                classes={classes}
                open={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
                deleteInfo={deleteInfo}
                isDeleting={isDeletingSchedule}
                deleteSubject={`${t('holiday_schedule')}`}
                action={t('to_delete')}
                titleAction={t(`delete`)}
                identifier={' '}
              />
            )}
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(HolidaySchedules)
