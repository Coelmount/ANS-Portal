import React, { useState, useEffect, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import AddModal from './components/AddModal'
import EditDefaultDestinationModal from './components/EditDefaultDestinationModal'
import TimeScheduleCalendar from './components/TimeScheduleCalendar'
// import Input from 'components/Input'
import { EDIT_DESTINATION_ID } from 'utils/types/addDestinationModalStepsId'

import editIcon from 'source/images/svg/edit-blue.svg'
import listTableIcon from 'source/images/svg/list-table.svg'
import scheduleIcon from 'source/images/svg/schedule.svg'
import useStyles from './styles'

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

const PageViewSelectorMenu = ({ t, setViewType, viewType }) => {
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
            className={classnames(classes.pageViewIconWrap, {
              [classes.activePageView]: viewType === id
            })}
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
  handleDeleteClick,
  customerId,
  groupId
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
      label: t('name'),
      isSortAvailable: false
    },
    {
      id: 'forwardTo',
      label: 'forward_to',
      isSortAvailable: false
    },
    {
      id: 'timeSchedule',
      label: 'schedule',
      isSortAvailable: false,
      getCellData: row => (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/schedules/week_schedules/${row.timeSchedule}`}
          className={classes.link}
          target='_blank'
        >
          {row.timeSchedule}
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
      {/* <DefaultDestination t={t} classes={classes} open={open} /> */}
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
          isLoadingData={isLoading}
        />
      )}
    </Fragment>
  )
}

// const DefaultDestination = ({ t, classes, open }) => {
//   const { defaultDestination } = TimeSchedulesStore

//   const handleEditIconClick = () => {
//     open(editDefaultDestinationModalId)
//   }

//   return useObserver(() => (
//     <Box className={classes.defaultDestinationWrap}>
//       <Typography className={classes.blockLabel}>
//         {t('default_destination')}
//       </Typography>
//       <Box className={classes.inputWrap}>
//         <Input
//           value={defaultDestination}
//           label={t('forward_to')}
//           variant='outlined'
//           disabled
//         />
//       </Box>
//       <Box onClick={handleEditIconClick} className={classes.editButtonWrap}>
//         <img src={editIcon} alt='edit' />
//       </Box>
//     </Box>
//   ))
// }

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
  const { customerId, groupId, tbrName } = useParams()

  const {
    isSchedulesLoading: isLoading,
    isTimeScheduleDeleting: isDeleting,
    setScheduleToEdit,
    getSchedules,
    deleteTimeSchedule,
    setStep,
    setIsEditMode,
    clearCurrentTimeSchedule
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
      initRequest()
      setStep(1)
      setIsEditMode(false)
    }
  }))

  const isDeleteModalOpen = modalStore.openedId === deleteModalId
  const isAddModalOpen = modalStore.openedId === addModalId
  const isEditDefaultDestinationModal =
    modalStore.openedId === editDefaultDestinationModalId

  const initRequest = () => {
    const payload = {
      customerId,
      groupId,
      tbrName
    }
    getSchedules(payload)
    clearCurrentTimeSchedule()
  }

  useEffect(() => {
    initRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      tbrId: tbrName,
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
      <PageViewSelectorMenu
        t={t}
        setViewType={setViewType}
        viewType={viewType}
      />

      {viewType === LIST_VIEW_ID ? (
        <ListView
          t={t}
          open={modalStore.open}
          isLoading={isLoading}
          handleAddClick={handleAddClick}
          handleEditIconClick={handleEditIconClick}
          handleDeleteClick={handleDeleteClick}
          customerId={customerId}
          groupId={groupId}
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
