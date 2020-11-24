import React, { useEffect, useState, Fragment, useCallback } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import AddModal from './components/AddModal'
import EditWeightsModal from './components/EditWeightsModal'
import CustomTableDnd from 'components/CustomTableDnd'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import DeleteModal from 'components/DeleteModal'

import DestinationsStore from 'stores/DestinationGroups/Destinations'

import disconnectIcon from 'source/images/svg/delete-icon.svg'
import editSvg from 'source/images/svg/edit-blue.svg'
import useStyles from './styles'

const addModal = 1
const editModal = 2
const deleteModal = 3

const Destinations = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, destinationGroupName } = match

  const {
    getDestinations,
    deleteDestinations,
    destinations,
    isDestinationsLoading,
    isDestinationDeleting,
    isDestinationsUpdating,
    putDestinations,
    cancelOrderUpdate
  } = DestinationsStore

  const [numbers, setNumbers] = useState([...destinations])
  const [selectAll, setSelectAll] = useState(false)
  const [isSingleDeleteMode, setIsSingleDeleteMode] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const isLoading = isDestinationsLoading || isDestinationsUpdating
  const isAnyNumberChecked = numbers.some(number => number.checked)

  const initialRequest = () => {
    const payload = {
      customerId,
      groupId,
      destinationGroupName
    }
    getDestinations(payload)
    setIsSaving(false)
  }

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
      setIsSingleDeleteMode(false)
      initialRequest()
    }
  }))

  const modals = useLocalStore(() => ({
    data: [],
    setData(value, modalId) {
      this.data = value
      openedModal.open(modalId)
    }
  }))

  useEffect(() => {
    initialRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setNumbers(destinations)
  }, [destinations])

  useEffect(() => {
    handleCheckedStates(numbers)
  }, [numbers])

  const selectNumbers = (checked, id) => {
    const newSelected = transformOnChange(numbers, checked, id)
    setNumbers(newSelected)
  }

  const handleSelectAll = () => {
    const newSelected = transformOnCheckAll(numbers, numbers, selectAll)
    handleCheckedStates(newSelected)
    setNumbers(newSelected)
    setSelectAll(!selectAll)
  }

  const handleCheckedStates = newSelected => {
    if (
      newSelected.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    if (!newSelected.length) {
      setSelectAll(false)
    }
  }

  const changeHover = (newHover, id) => {
    const newSelected = transformOnHover(numbers, newHover, id)
    setNumbers(newSelected)
  }

  // Trigger delete action in store
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      closeModal: openedModal.close,
      numbers: modals.data
    }
    deleteDestinations(payload)
  }

  // Modal open click handlers -----
  const handleAddIconClick = () => {
    openedModal.open(addModal)
  }

  const handleSingleDeleteIconClick = row => {
    setIsSingleDeleteMode(true)
    modals.setData([{ ...row, checked: true }], deleteModal)
  }

  const handleMultipleDeleteClick = () => {
    if (isAnyNumberChecked) {
      modals.setData(
        numbers.filter(number => number.checked),
        deleteModal
      )
    }
  }
  // ------------

  const handleEditIconClick = () => {
    openedModal.open(editModal)
  }

  const catchCallback = state => setNumbers([...state])

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const newArr = [...numbers]
      ;[newArr[dragIndex], newArr[hoverIndex]] = [
        newArr[hoverIndex],
        newArr[dragIndex]
      ]
      setNumbers(newArr)
      setIsSaving(true)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [numbers]
  )

  const handleSaveButtonClick = () => {
    if (isSaving)
      putDestinations({
        customerId,
        groupId,
        destinationGroupName,
        numbers,
        callback: initialRequest
      })
  }

  const handleCancelButtonClick = () => {
    if (isSaving) {
      cancelOrderUpdate(catchCallback)
      setIsSaving(false)
    }
  }

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${
      modals.data.length ? modals.data[0].name : ''
    } ?`}</span>
  )

  const extraMultipleDeleteBlock = () => {
    const checkedNumbers = numbers.filter(number => number.checked)
    const numbersArr = checkedNumbers.map(number => number.name)
    const splitedNumbersStr = numbersArr.join(', ')
    const totalMessage = `${splitedNumbersStr}`

    return (
      <Box>
        <span className={classes.boldDeleteText}>{totalMessage}</span>
        <span className={classes.deleteText}>{` ?`}</span>
      </Box>
    )
  }

  const toolbarButtonsBlock = () => (
    <Box className={classes.toolbarContainer}>
      <Box
        className={classnames(classes.buttonsWrap, {
          [classes.disabledBlock]: !isSaving
        })}
      >
        <Box className={classes.buttonBlock}>
          <IconButton
            aria-label='cancel icon button'
            component='span'
            className={classnames(
              classes.buttonIconWrap,
              classes.cancelButtonWrap,
              {
                [classes.disabledButton]: !isSaving
              }
            )}
            onClick={handleCancelButtonClick}
          >
            <CloseOutlinedIcon className={classes.cancelIcon} />
          </IconButton>
          <Typography className={classes.buttonLabel}>{t('cancel')}</Typography>
        </Box>

        <Box className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}>
          <IconButton
            aria-label='save icon button'
            component='span'
            className={classnames(
              classes.buttonIconWrap,
              classes.asignButtonWrap,
              {
                [classes.disabledButton]: !isSaving
              }
            )}
            onClick={handleSaveButtonClick}
          >
            <DoneOutlinedIcon className={classes.assignIcon} />
          </IconButton>
          <Typography className={classes.buttonLabel}>{t('save')}</Typography>
        </Box>
      </Box>

      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={`${classes.buttonContainer} ${classes.deassignWrap}`}>
          <IconButton
            aria-label='deassign icon button'
            component='span'
            className={classnames(classes.mainIconWrap, {
              [classes.disabledButton]: !isAnyNumberChecked
            })}
            onClick={handleMultipleDeleteClick}
          >
            <img
              className={classes.disconnectIcon}
              src={disconnectIcon}
              alt='delete'
            />
          </IconButton>
          <Typography
            className={classnames(classes.iconTitle, {
              [classes.disabledIconTitle]: !isAnyNumberChecked
            })}
          >
            {t('delete')}
          </Typography>
        </Box>
      </Box>
    </Box>
  )

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
            onChange={() => selectNumbers(!row.checked, row.id)}
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
    { id: 'name', label: 'name' },
    {
      id: 'phoneNumber',
      label: 'phone_number'
    },
    {
      id: 'weight',
      label: 'weight',
      headIcon: <img src={editSvg} alt='edit weight' />,
      onIconClick: () => handleEditIconClick(),
      extraProps: {
        className: classes.textCenter
      },
      headCellInsideWrapStyles: classes.headCellInsideWrap
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => {
        return (
          <CloseOutlinedIcon
            className={classes.deleteCustomerIcon}
            onClick={() => handleSingleDeleteIconClick(row)}
          />
        )
      }
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <CustomTableDnd
              firstCell={false}
              rows={numbers}
              columns={columns}
              extraToolbarBlock={toolbarButtonsBlock}
              searchCriterias={['name', 'phoneNumber', 'weight']}
              noAvailableDataMessage={t('no_secondary_numbers_available')}
              tableId={'advanced_destinations_list'}
              moveCard={moveCard}
              isSaving={isSaving}
              classes={classes}
            />
            <Box className={classes.addWrap}>
              <Box className={classes.addIconWrap} onClick={handleAddIconClick}>
                <AddOutlinedIcon />
              </Box>
              <Typography className={classes.addTitle}>{t('add')}</Typography>
            </Box>
          </Fragment>
        )}
        {openedModal.id === addModal && (
          <AddModal
            open={openedModal.id === addModal}
            handleClose={openedModal.close}
          />
        )}
        {openedModal.id === deleteModal && (
          <DeleteModal
            classes={classes}
            open={openedModal.id === deleteModal}
            handleClose={openedModal.close}
            handleDelete={handleDelete}
            extraMessageBlock={
              isSingleDeleteMode ? extraDeleteBlock : extraMultipleDeleteBlock()
            }
            isDeleting={isDestinationDeleting}
            deleteSubject={
              isSingleDeleteMode
                ? `${t('destination').toLowerCase()}`
                : `${t('destinations').toLowerCase()}`
            }
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
        {openedModal.id === editModal && (
          <EditWeightsModal
            handleClose={openedModal.close}
            open={openedModal.id === editModal}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(Destinations)
