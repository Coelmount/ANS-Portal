import React, { useEffect, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import AddModal from './components/AddModal'
import EditMainNumberModal from './components/EditMainNumberModal'
import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import DeleteModal from 'components/DeleteModal'

import AccessNumbersStore from 'stores/DestinationGroups/AccessNumbers'

import useStyles from './styles'
import EditIcon from 'source/images/components/EditIcon'

const addModal = 1
const editModal = 2
const deleteModal = 3

const AccessNumbers = observer(({ t }) => {
  const classes = useStyles()
  const { customerId, groupId, destinationGroupName } = useParams()

  const {
    getMainNumber,
    getSecondaryNumbers,
    getAvailableNumbers,
    deleteSecondaryNumber,
    mainNumber,
    secondaryNumbers,
    availableNumbers,
    isMainNumberLoading,
    isSecondaryNumbersLoading,
    isAvailableNumbersLoading,
    isSecondaryNumberDeleting
  } = AccessNumbersStore

  const isLoading =
    isMainNumberLoading ||
    isSecondaryNumbersLoading ||
    isAvailableNumbersLoading
  const isAvailableNumbersExist = availableNumbers.length

  const initialRequest = () => {
    const payload = {
      customerId,
      groupId,
      destinationGroupName
    }
    const availableNumbersPayload = {
      customerId,
      groupId,
      page: 1,
      rowsPerPage: 1
    }

    getMainNumber(payload)
    getSecondaryNumbers(payload)
    // Disable Add button if there are no available numbers
    getAvailableNumbers(availableNumbersPayload)
  }

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
      initialRequest()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Trigger delete action in store
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      secondaryNumberId: modals.data.id,
      destinationGroupName,
      closeModal: openedModal.close
    }
    deleteSecondaryNumber(payload)
  }

  // Modal open click handlers -----
  const handleAddIconClick = () => {
    if (isAvailableNumbersExist) openedModal.open(addModal)
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
              <Tooltip
                title={
                  isAvailableNumbersExist ? '' : t('no_phone_numbers_available')
                }
              >
                <Box
                  className={classnames(classes.addIconWrap, {
                    [classes.disabledButton]: !isAvailableNumbersExist
                  })}
                  onClick={handleAddIconClick}
                >
                  <AddOutlinedIcon />
                </Box>
              </Tooltip>
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
