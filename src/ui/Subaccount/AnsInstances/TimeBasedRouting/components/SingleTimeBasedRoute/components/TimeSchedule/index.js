import React, { useState, useEffect, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, Link } from 'react-router-dom'
import classnames from 'classnames'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import Checkbox from 'components/Checkbox'
import AddModal from './components/AddModal'
import EditModal from './components/EditModal'
import { EDIT_DESTINATION_ID } from 'utils/types/addDestinationModalStepsId'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import editIcon from 'source/images/svg/edit-blue.svg'
import useStyles from './styles'

import { toJS } from 'mobx'

const addModalId = 1
const deleteModalId = 2
const editModalId = 3

const Toolbar = ({ t, classes, isLoading, handleAddClick }) => {
  return (
    <Box className={classes.toolbarWrap}>
      <Typography>{t('time_based_destination_list')}</Typography>
      <Box
        className={classnames(classes.addButtonWrap, {
          [classes.disabledAddButtonWrap]: isLoading
        })}
      >
        <IconButton
          aria-label='add icon button'
          component='span'
          className={classes.mainIconWrap}
          onClick={handleAddClick}
        >
          <AddIcon />
        </IconButton>
        <Typography className={classes.addCustomerTitle}>{t('add')}</Typography>
      </Box>
    </Box>
  )
}

const TimeSchedule = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const { customerId, groupId, tbrName } = useParams()

  const {
    schedules,
    defaultDestination,
    deleteString,
    isSchedulesLoading: isLoading,
    isTimeScheduleDeleting: isDeleting,
    setScheduleToEdit,
    getSchedules,
    deleteTimeSchedule,
    setStep,
    setIsEditMode
  } = TimeSchedulesStore

  const modalStore = useLocalStore(() => ({
    openedId: null,
    deleteItem: {},
    open(modalId) {
      this.openedId = modalId
    },
    close() {
      this.openedId = null
      this.deleteItem = {}
      getRequest()
      setStep(1)
      setIsEditMode(false)
    }
  }))

  const isDeleteModalOpen = modalStore.openedId === deleteModalId
  const isAddModalOpen = modalStore.openedId === addModalId
  const isEditModalOpen = modalStore.openedId === editModalId

  const getRequest = () => {
    const payload = {
      customerId,
      groupId,
      tbrName
    }
    getSchedules(payload)
  }

  useEffect(() => {
    getRequest()
  }, [])

  // Modal click handlers -----
  const handleDeleteClick = row => {
    modalStore.open(deleteModalId)
    modalStore.deleteItem = row
  }

  const handleAddClick = () => {
    if (!isLoading) modalStore.open(addModalId)
  }

  const handleEditIconClick = row => {
    setScheduleToEdit(row)
    setStep(EDIT_DESTINATION_ID)
    setIsEditMode(true)
    modalStore.open(addModalId)
  }
  // ------

  // Delete request trigger
  const handleDelete = () => {
    const { close, deleteItem } = modalStore
    const payload = {
      customerId,
      groupId,
      name: deleteItem.name,
      closeModal: close
    }
    deleteTimeSchedule(payload)
  }

  const extraDeleteBlock = (
    <span
      className={classes.deleteName}
    >{` ${modalStore.deleteItem.name}?`}</span>
  )

  const columns = [
    {
      id: 'name',
      label: t('name'),
      getCellData: row => (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/time_based_routing/${row.name}`}
          className={classes.link}
        >
          {row.name}
        </Link>
      )
    },
    {
      id: 'forwardTo',
      label: 'forward_to'
    },
    {
      id: 'timeSchedule',
      label: 'schedule'
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <Fragment>
          <IconButton onClick={() => handleDeleteClick(row)}>
            <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
          </IconButton>
          <IconButton onClick={() => handleEditIconClick(row)}>
            <img src={editIcon} alt='edit' />
          </IconButton>
        </Fragment>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Toolbar
          t={t}
          classes={classes}
          isLoading={isLoading}
          handleAddClick={handleAddClick}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell
            rows={schedules}
            columns={columns}
            searchCriterias={['name', 'defaultDestination']}
            noAvailableDataMessage={t('no_time_schedules_available')}
            tableId='time_based_routing_schedules_list'
          />
        )}
        {isAddModalOpen && (
          <AddModal open={isAddModalOpen} handleClose={modalStore.close} />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={modalStore.close}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isDeleting}
            deleteSubject={t('time_based_destination')}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(TimeSchedule))
