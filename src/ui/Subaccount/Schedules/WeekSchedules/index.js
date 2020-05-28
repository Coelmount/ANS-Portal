import React, { Fragment, useEffect, useState } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

import CustomContainer from 'components/CustomContainer'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import WeekSchedulesStore from 'stores/WeekSchedules'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'

import useStyles from '../styles'

const WeekSchedules = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState()
  const [deleteInfo, setDeleteInfo] = useState({ name: '', id: null })
  const {
    getSchedules,
    schedules,
    isSchedulesLoading,
    deleteSchedule,
    isDeletingSchedule
  } = WeekSchedulesStore

  useEffect(() => {
    getSchedules(match.customerId, match.groupId)
  }, [])

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

  const titleData = {
    mainText: `${t('schedules')}: ${t('week_schedules')}`
  }

  const columns = [
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <Link to={`/customers`} className={classes.link}>
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
              <TitleBlock titleData={titleData} />
            </CustomContainer>
            <CustomTable
              classes={classes}
              columns={columns}
              rows={schedules}
              searchCriterias={['name']}
              noAvailableDataMessage={t('no_schedules_available')}
              idColStyles={classes.idColStyles}
            />
            {isDeleteModalOpen && (
              <DeleteModal
                classes={classes}
                open={isDeleteModalOpen}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
                deleteInfo={deleteInfo}
                isDeleting={isDeletingSchedule}
                deleteSubject={`${t('week_schedule')}`}
                action={t('to_delete')}
                titleAction={t(`delete`)}
                identifier={t('name')}
              />
            )}
          </Paper>
        </Box>
      )}
    </Fragment>
  )
})

export default withNamespaces()(WeekSchedules)
