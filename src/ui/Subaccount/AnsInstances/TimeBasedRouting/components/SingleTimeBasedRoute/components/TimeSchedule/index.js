import React, { useState, useEffect, Fragment } from 'react'
import { observer, useLocalStore, useObserver } from 'mobx-react-lite'
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
import EditDefaultDestinationModal from './components/EditDefaultDestinationModal'
import TimeScheduleCalendar from './components/TimeScheduleCalendar'
import Input from 'components/Input'
import { EDIT_DESTINATION_ID } from 'utils/types/addDestinationModalStepsId'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import editIcon from 'source/images/svg/edit-blue.svg'
import listTableIcon from 'source/images/svg/list-table.svg'
import scheduleIcon from 'source/images/svg/schedule.svg'
import useStyles from './styles'

import { toJS } from 'mobx'

const addModalId = 1
const deleteModalId = 2
const editDefaultDestinationModalId = 3
const LIST_VIEW_ID = 'list'
const CALENDAR_VIEW_ID = 'calendar'

const pageViews = [
  {
    icon: <img src={listTableIcon} alt='list-table' />,
    id: LIST_VIEW_ID
  },
  {
    icon: <img src={scheduleIcon} alt='schedule' />,
    id: CALENDAR_VIEW_ID
  }
]

const PageViewSelectorMenu = ({ t, setViewType }) => {
  const classes = useStyles()

  const handlePageViewChange = id => {
    setViewType(id)
  }

  return (
    <Box className={classes.pageViewWrap}>
      <Typography className={classes.blockLabel}>{t('page_view')}</Typography>
      {pageViews.map(({ icon, id }) => (
        <div className={classes.pageViewBlock} key={id}>
          <Box
            onClick={() => handlePageViewChange(id)}
            className={classes.pageViewIconWrap}
          >
            {icon}
          </Box>
          <Typography>{t(id)}</Typography>
        </div>
      ))}
    </Box>
  )
}

const ListView = ({
  t,
  open,
  isLoading,
  handleAddClick,
  handleEditIconClick,
  handleDeleteClick
}) => {
  const classes = useStyles()
  const { schedules } = TimeSchedulesStore

  const columns = [
    {
      id: 'color',
      label: 'color',
      getCellData: row => (
        <div style={{ width: 20, height: 20, background: row.color }}></div>
      ),
      extraProps: {
        className: classes.colorCell
      },
      isSortAvailable: false
    },
    {
      id: 'name',
      label: t('name')
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
    <Fragment>
      <DefaultDestination t={t} classes={classes} open={open} />
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
    </Fragment>
  )
}

const DefaultDestination = ({ t, classes, open }) => {
  const { defaultDestination } = TimeSchedulesStore

  const handleEditIconClick = () => {
    open(editDefaultDestinationModalId)
  }

  return useObserver(() => (
    <Box className={classes.defaultDestinationWrap}>
      <Typography className={classes.blockLabel}>
        {t('default_destination')}
      </Typography>
      <Box className={classes.inputWrap}>
        <Input
          value={defaultDestination}
          label={t('forward_to')}
          variant='outlined'
          disabled
        />
      </Box>
      <Box onClick={handleEditIconClick} className={classes.editButtonWrap}>
        <img src={editIcon} alt='edit' />
      </Box>
    </Box>
  ))
}

const Toolbar = ({ t, classes, isLoading, handleAddClick }) => {
  return (
    <Box className={classes.toolbarWrap}>
      <Typography className={classes.toolbarLabel}>
        {t('time_based_destination_list')}
      </Typography>
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

  const [viewType, setViewType] = useState(LIST_VIEW_ID)
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
  const isEditDefaultDestinationModal =
    modalStore.openedId === editDefaultDestinationModalId

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

  return (
    <Paper className={classes.root}>
      <PageViewSelectorMenu t={t} setViewType={setViewType} />

      {viewType === LIST_VIEW_ID ? (
        <ListView
          t={t}
          open={modalStore.open}
          isLoading={isLoading}
          handleAddClick={handleAddClick}
          handleEditIconClick={handleEditIconClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        <TimeScheduleCalendar />
      )}

      {isAddModalOpen && (
        <AddModal open={isAddModalOpen} handleClose={modalStore.close} />
      )}
      {isEditDefaultDestinationModal && (
        <EditDefaultDestinationModal
          open={isEditDefaultDestinationModal}
          handleClose={modalStore.close}
        />
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
  )
}

export default withNamespaces()(observer(TimeSchedule))
