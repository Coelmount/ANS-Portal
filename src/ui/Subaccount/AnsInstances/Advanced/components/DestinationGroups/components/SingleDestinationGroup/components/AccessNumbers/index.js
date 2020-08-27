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
import Select from '@material-ui/core/Select'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import AddModal from './components/AddModal'
import EditMainNumberModal from './components/EditMainNumberModal'
import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import DeleteModal from 'components/DeleteModal'

import AccessNumbersStore from 'stores/DestinationGroups/AccessNumbers'

import useStyles from './styles'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'
import EditIcon from 'source/images/components/EditIcon'

import { toJS } from 'mobx'

const addModal = 1
const editModal = 2
const deleteModal = 3
const SELECT_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const AccessNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, destinationGroupName } = match

  const {
    getMainNumber,
    getSecondaryNumbers,
    deleteSecondaryNumber,
    clearLoadingStates,
    mainNumber,
    secondaryNumbers,
    isMainNumberLoading,
    isSecondaryNumbersLoading,
    isSecondaryNumberDeleting
  } = AccessNumbersStore

  const [priorityValue, setPriorityValue] = useState('')
  const isLoading = isMainNumberLoading || isSecondaryNumbersLoading

  const initialRequest = () => {
    const payload = {
      customerId,
      groupId,
      destinationGroupName
    }
    getMainNumber(payload)
    getSecondaryNumbers(payload)
  }

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
      initialRequest()
      clearLoadingStates()
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
    initialRequest()
  }, [])

  // Trigger delete action in store
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      secondaryNumberId: modals.data.id,
      closeModal: openedModal.close
    }
    deleteSecondaryNumber(payload)
  }

  // Modal open click handlers -----
  const handleAddIconClick = () => {
    openedModal.open(addModal)
  }

  const handleEditIconClick = () => {
    openedModal.open(editModal)
  }

  const handleDeleteIconClick = row => {
    modals.setData(row, deleteModal)
  }
  // ------------

  const extraDeleteBlock = (
    <span
      className={classes.deleteName}
    >{` ${modals.data.country}, ${modals.data.value} ?`}</span>
  )

  const mainNumberColumns = [
    { id: 'country', label: 'country' },
    {
      id: 'value',
      label: 'phone_number'
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.mainNumberDeleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: () => (
        <CloseOutlinedIcon className={classes.mainDeleteCustomerIcon} />
      )
    }
  ]

  const secondaryNumbersColumns = [
    { id: 'country', label: 'country' },
    {
      id: 'value',
      label: 'phone_number'
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
            onClick={() => handleDeleteIconClick(row)}
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
            <Box className={classes.mainTitleWraper}>
              <Typography className={classes.mainTitle}>
                {t('main_number')}
              </Typography>
              <Box
                onClick={handleEditIconClick}
                className={classes.buttonIconsWrapper}
              >
                <EditIcon className={classes.icon} />
              </Box>
            </Box>

            <CustomTable
              firstCell={true}
              rows={mainNumber ? [mainNumber] : []}
              columns={mainNumberColumns}
              showSearchBar={false}
              showPagination={false}
              classes={classes}
              noAvailableDataMessage={t('no_main_number_available')}
            />
            <Typography className={classes.secondaryNumbersTitle}>
              {t('secondary_numbers')}
            </Typography>
            <CustomTable
              firstCell={true}
              rows={secondaryNumbers}
              columns={secondaryNumbersColumns}
              showSearchBar={false}
              showPagination={false}
              classes={classes}
              noAvailableDataMessage={t('no_secondary_numbers_available')}
            />
            <Box className={classes.addWrap}>
              <Box className={classes.addIconWrap} onClick={handleAddIconClick}>
                <AddOutlinedIcon />
              </Box>
              <Typography className={classes.addTitle}>
                {t(`${t('add')} (max 10)`)}
              </Typography>
            </Box>
          </Fragment>
        )}
        {openedModal.id === addModal && (
          <AddModal
            open={openedModal.id === addModal}
            handleClose={openedModal.close}
          />
        )}
        {openedModal.id === editModal && (
          <EditMainNumberModal
            open={openedModal.id === editModal}
            handleClose={openedModal.close}
          />
        )}
        {openedModal.id === deleteModal && (
          <DeleteModal
            classes={classes}
            open={openedModal.id === deleteModal}
            handleClose={openedModal.close}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isSecondaryNumberDeleting}
            deleteSubject={`${t('secondary_number').toLowerCase()}`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(AccessNumbers)
