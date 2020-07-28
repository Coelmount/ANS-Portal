import React, { useEffect, useState, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'

import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import AddModal from './components/AddModal'
import EditModal from './components/EditModal'
import DeleteModal from 'components/DeleteModal'

import DestinationsStore from 'stores/Destionations'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'

const addModal = 1
const editModal = 2
const deleteModal = 3
const multipleDeleteModal = 4

const Destinations = observer(({ t }) => {
  const {
    destinationsToDelete,
    destinations,
    isDestinationsLoading,
    isDestinationDeleting,
    getDestinations,
    deleteDestination,
    deleteDestinations
  } = DestinationsStore

  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [destinationsToDeleteString, setDestinationsToDeleteString] = useState(
    ''
  )

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
      const payload = {
        customerId,
        groupId
      }
      getDestinations(payload)
    }
  }))

  const modals = useLocalStore(() => ({
    data: '',
    setData(value, modalId) {
      this.data = value
      openedModal.open(modalId)
    }
  }))

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getDestinations(payload)
  }, [])

  useEffect(() => {
    setNumbers(destinations)
  }, [destinations])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  useEffect(() => {
    const destinationNames = destinationsToDelete.map(
      destination => destination.name
    )
    setDestinationsToDeleteString(destinationNames.join(' , '))
  }, [destinationsToDelete.length])

  // Checkboxes handlers ----
  const selectNumbers = (checked, id) => {
    const newNumbers = transformOnChange(numbers, checked, id)
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const handleSelectAll = () => {
    const newNumbers = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  const handleCheckedStates = newNumbers => {
    if (
      newNumbers.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newNumbers.some(el => el.checked)) {
        setIsAnyChecked(true)
      } else {
        setIsAnyChecked(false)
      }
    }
    if (!newNumbers.length) {
      setSelectAll(false)
      setIsAnyChecked(false)
    }
  }

  const changeHover = (newHover, id) => {
    const newNumbers = transformOnHover(numbers, newHover, id)
    setNumbers(newNumbers)
  }
  // -----------

  const handleMultipleDeleteClick = () => {
    openedModal.open(multipleDeleteModal)
  }

  // Trigger delete actions in store ----
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      destinationId: modals.data.userId,
      closeModal: openedModal.close
    }
    deleteDestination(payload)
  }

  const handleMultipleDelete = () => {
    const payload = {
      customerId,
      groupId,
      closeModal: openedModal.close
    }
    deleteDestinations(payload)
  }
  // --------

  const titleData = {
    mainText: `${t('advanced')}: ${t('destinations')}`,
    iconCapture: t('add'),
    Icon: <AddOutlinedIcon />
  }

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${modals.data.name}?`}</span>
  )

  const extraMultipleDeleteBlock = (
    <Fragment>
      <span
        className={classes.deleteName}
      >{` ${destinationsToDeleteString}?`}</span>
    </Fragment>
  )

  const toolbarButtonsBlock = () => {
    return (
      <Fragment>
        <Box className={classes.toolbarButtonsBlockWrap}>
          <Box className={classes.addCustomerWrap}>
            <IconButton
              aria-label='delete icon button'
              component='span'
              className={classnames(classes.mainIconWrap, {
                [classes.disabledButton]: !isAnyChecked
              })}
              onClick={isAnyChecked ? handleMultipleDeleteClick : undefined}
            >
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete'
              />
            </IconButton>
            <Typography className={classes.addCustomerTitle}>
              {t('delete')}
            </Typography>
          </Box>
        </Box>
      </Fragment>
    )
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          className={classes.headCheckbox}
          checked={selectAll}
          onChange={handleSelectAll}
        />
      ),
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={e => selectNumbers(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.id)}
              />
            ) : (
              i + 1
            )}
          </div>
        ),
      extraHeadProps: {
        className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <span
          onClick={() => modals.setData(row.userId, editModal)}
          className={classes.nameCellTitle}
        >
          {row.name}
        </span>
      )
    },
    {
      id: 'phoneNumber',
      label: 'phone_number'
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
          onClick={() => modals.setData(row, deleteModal)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            handleOpen={() => openedModal.open(addModal)}
          />
        </CustomContainer>
        {isDestinationsLoading ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={false}
            rows={numbers}
            columns={columns}
            searchCriterias={['name', 'phoneNumber']}
            extraToolbarBlock={toolbarButtonsBlock}
            getSearchList={setSearchList}
            noAvailableDataMessage={t('no_destinations_available')}
            tableId={'ans_advanced_destinations_list'}
          />
        )}
        {openedModal.id === addModal && (
          <AddModal
            open={openedModal.id === addModal}
            handleClose={openedModal.close}
          />
        )}
        {openedModal.id === editModal && (
          <EditModal
            open={openedModal.id === editModal}
            handleClose={openedModal.close}
            destinationId={modals.data}
          />
        )}
        {openedModal.id === deleteModal && (
          <DeleteModal
            classes={classes}
            open={openedModal.id === deleteModal}
            handleClose={() => openedModal.close()}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isDestinationDeleting}
            deleteSubject={`${t('destination').toLowerCase()}`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
        {openedModal.id === multipleDeleteModal && (
          <DeleteModal
            classes={classes}
            open={openedModal.id === multipleDeleteModal}
            handleClose={() => openedModal.close()}
            handleDelete={handleMultipleDelete}
            extraMessageBlock={extraMultipleDeleteBlock}
            isDeleting={isDestinationDeleting}
            deleteSubject={`${t('destinations').toLowerCase()}`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(Destinations)
