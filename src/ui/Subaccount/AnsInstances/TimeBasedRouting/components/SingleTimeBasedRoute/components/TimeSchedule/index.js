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

import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'

import { toJS } from 'mobx'

const addModalId = 1
const deleteModalId = 2

const TimeSchedule = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const { customerId, groupId } = useParams()

  const {
    schedules,
    deleteString,
    isSchedulesLoading,
    getSchedules
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
    }
  }))

  const isDeleteModalOpen = modalStore.openedId === deleteModalId
  const isAddModalOpen = modalStore.openedId === addModalId

  const getRequest = () => {
    const payload = {
      customerId,
      groupId
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
    console.log('add open')
    modalStore.open(addModalId)
  }
  // ------

  // Delete request trigger
  const handleDelete = () => {
    const { close, deleteItem } = modalStore
    const payload = {
      customerId,
      groupId,
      callback: close,
      deleteItem: deleteItem
    }
    // deleteTimeBasedRoutes(payload)
  }

  const titleData = {
    mainText: t('time_base_routing'),
    iconCapture: t('add'),
    Icon: <AddIcon />
  }

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${
      isDeleteModalOpen ? `'${modalStore.deleteItem.name}'` : deleteString
    }? `}</span>
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
      id: 'defaultDestination',
      label: t('default_destination')
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <IconButton onClick={() => handleDeleteClick(row)}>
          <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
        </IconButton>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box className={classes.toolbarButtonsBlockWrap}>
          <Box className={classes.addCustomerWrap}>
            <IconButton
              aria-label='deassign icon button'
              component='span'
              className={classes.mainIconWrap}
              onClick={handleAddClick}
            >
              <AddIcon />
            </IconButton>
            <Typography className={classes.addCustomerTitle}>
              {t('add')}
            </Typography>
          </Box>
        </Box>
        {isSchedulesLoading ? (
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
        {/* {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={modalStore.close}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isDeleting}
            deleteSubject={deleteSubject}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )} */}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(TimeSchedule))