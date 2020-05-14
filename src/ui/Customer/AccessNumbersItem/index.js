import React, { useState, useEffect, Fragment } from 'react'
import { useParams, Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'
import capitalize from 'lodash/capitalize'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import AssignedNumbersStore from 'stores/AssignedNumbers'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddNumbers from './AddNumbers/'
import AssignToSubaccountModal from './AssignToSubaccountModal'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import disconnectIcon from 'source/images/svg/delete-icon.svg'
import deassignIcon from 'source/images/svg/disconnect-from-customer.svg'

import useStyles from './styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showAddNumbers, setShowAddNumber] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isDeassignModalOpen, setIsDeassignModalOpen] = useState(false)
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [
    numberOfSelectedToDisconnect,
    setNumberOfSelectedToDisconnect
  ] = useState(0)
  const [numberOfSelectedToDeassign, setNumberOfSelectedToDeassign] = useState(
    0
  )
  const [searchList, setSearchList] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const [disconnectMessage, setDisconnectMessage] = useState('')
  const [disconnectMessageBlock, setDisconnectMessageBlock] = useState(null)
  const [disconnectSubject, setDisconnectSubject] = useState('')
  const [deassignMessage, setDeassignMessage] = useState('')
  const [deassignMessageBlock, setDeassignMessageBlock] = useState(null)
  const [deassignSubject, setDeassignSubject] = useState('')
  const {
    assignedNumbers,
    isAssignedNumbersLoading,
    isLoadingEntitlements,
    isDisconnectingNumber,
    disconnectNumbers,
    deassignNumbers,
    totalPagesServer,
    getEntitlementsAndFindCurrent,
    currentEntitlement,
    setDefaultValues,
    setNumbersToAssign,
    setNumbersToDisconnect,
    setNumbersToDeassign,
    showErrorNotification,
    numbersToDisconnect
  } = AssignedNumbersStore

  const isAssignEnabled =
    numberOfChecked > 0 &&
    !numbers.some(
      item =>
        (item.checked && item.subaccount !== 'none') ||
        (item.checked && item.inUse !== 'no')
    )

  const isDeassignEnabled =
    numberOfSelectedToDeassign > 0 &&
    !numbers.some(
      item =>
        (item.isSelectedToDeassign && item.subaccount === 'none') ||
        (item.isSelectedToDeassign && item.inUse !== 'no')
    )

  const isDisconnectEnabled =
    !isDisconnectingNumber &&
    numberOfSelectedToDisconnect > 0 &&
    !numbers.some(
      item =>
        (item.isSelectedToDisconnect && item.subaccount !== 'none') ||
        (item.isSelectedToDisconnect && item.inUse !== 'no')
    )

  useEffect(() => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    return () => {
      setDefaultValues()
    }
  }, [])

  useEffect(() => {
    setNumbers(assignedNumbers)
    setNumberOfSelectedToDisconnect(0)
  }, [assignedNumbers])

  const handlePageChange = () => {
    setNumberOfChecked(0)
  }

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false)
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setNumberOfChecked(0)
  }

  const selectNumbers = (newValue, id, fieldName) => {
    const newSelected = transformOnChange(numbers, newValue, id, fieldName)
    setNumbers(newSelected)
    handleCheckedStates(newSelected)
    switch (fieldName) {
      case 'checked':
        newValue
          ? setNumberOfChecked(numberOfChecked + 1)
          : setNumberOfChecked(numberOfChecked - 1)
        break
      case 'isSelectedToDeassign':
        newValue
          ? setNumberOfSelectedToDeassign(numberOfSelectedToDeassign + 1)
          : setNumberOfSelectedToDeassign(numberOfSelectedToDeassign - 1)
        break
      case 'isSelectedToDisconnect':
        newValue
          ? setNumberOfSelectedToDisconnect(numberOfSelectedToDisconnect + 1)
          : setNumberOfSelectedToDisconnect(numberOfSelectedToDisconnect - 1)
        break
      default:
        return
    }
  }

  const handleSelectAll = () => {
    const newSelected = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newSelected)
    setNumbers(newSelected)
    setSelectAll(!selectAll)
    selectAll ? setNumberOfChecked(0) : setNumberOfChecked(searchList.length)
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

  const builtDisconnectMessage = numbers => {
    const amountOfNumbers = numbers.length
    const disconnectText =
      amountOfNumbers > 1
        ? t('phone_numbers').toLowerCase()
        : t('phone_number').toLowerCase()
    setDisconnectSubject(disconnectText)
    const totalMessage = `${amountOfNumbers} ${disconnectText}:`
    setDisconnectMessage(totalMessage)
  }

  const builtDeassignMessage = numbers => {
    const amountOfNumbers = numbers.length
    const deassignText =
      amountOfNumbers > 1
        ? t('phone_numbers').toLowerCase()
        : t('phone_number').toLowerCase()
    setDeassignSubject(deassignText)
    const totalMessage = `${amountOfNumbers} ${deassignText}:`
    setDeassignMessage(totalMessage)
  }

  const buildDisconnectMessageBlock = numbers => {
    const numbersArr = numbers.map(item => item.phoneNumber)
    const splitedNumbersStr = numbersArr.join(', ')
    const totalMessage = `${splitedNumbersStr} ?`
    const disconnectMessageBlock = (
      <Box>
        <Typography className={classes.boldDeassignText}>
          {totalMessage}
        </Typography>
        <Typography>{t('deassign_message_end')}</Typography>
      </Box>
    )
    setDisconnectMessageBlock(disconnectMessageBlock)
  }

  const buildDeassignMessageBlock = numbers => {
    const numbersArr = numbers.map(item => item.phoneNumber)
    const splitedNumbersStr = numbersArr.join(', ')
    const totalMessage = `${splitedNumbersStr} ?`
    const deassignMessageBlock = (
      <Box>
        <Typography className={classes.boldDeassignText}>
          {totalMessage}
        </Typography>
        <Typography>{t('deassign_message_end')}</Typography>
      </Box>
    )
    setDeassignMessageBlock(deassignMessageBlock)
  }

  const handleAssignButtonClick = () => {
    if (isAssignEnabled) {
      const checkedNumbers = numbers.filter(item => item.checked === true)
      setNumbersToAssign(checkedNumbers)
      setIsAssignModalOpen(true)
    } else if (numberOfChecked === 0) {
      showErrorNotification(t('no_numbers_selected'))
    } else {
      showErrorNotification(t('unable_assign'))
    }
  }

  const handleDisconnectButtonClick = () => {
    if (isDisconnectEnabled) {
      const selectedNumbers = numbers.filter(
        item => item.isSelectedToDisconnect === true
      )
      setNumbersToDisconnect(selectedNumbers)
      builtDisconnectMessage(selectedNumbers)
      buildDisconnectMessageBlock(selectedNumbers)
      setIsDisconnectModalOpen(true)
    } else if (numberOfSelectedToDisconnect === 0) {
      showErrorNotification(t('no_numbers_selected'))
    } else {
      showErrorNotification(t('unable_disconnect'))
    }
  }

  const handleDeassignButtonClick = () => {
    if (isDeassignEnabled) {
      const selectedNumbers = numbers.filter(
        item => item.isSelectedToDeassign === true
      )
      setNumbersToDeassign(selectedNumbers)
      builtDeassignMessage(selectedNumbers)
      buildDeassignMessageBlock(selectedNumbers)
      setIsDeassignModalOpen(true)
    } else if (numberOfSelectedToDeassign === 0) {
      showErrorNotification(t('no_numbers_selected'))
    } else {
      showErrorNotification(t('unable_deassign'))
    }
  }

  const handleDisconnectOneNumberClick = row => {
    setNumbersToDisconnect(row)
    builtDisconnectMessage([row])
    buildDisconnectMessageBlock([row])
    setIsDisconnectModalOpen(true)
  }

  const handleCloseDisconnectModal = () => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setIsDisconnectModalOpen(false)
  }

  const handleCloseDeassignModal = () => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setIsDeassignModalOpen(false)
  }

  const handleDisconnect = () => {
    const payload = {
      customerId: match.customerId,
      callback: handleCloseDisconnectModal
    }
    disconnectNumbers(payload)
  }

  const handleDeassign = () => {
    const payload = {
      customerId: match.customerId,
      callback: handleCloseDeassignModal
    }
    deassignNumbers(payload)
  }

  const extraTitleBlock = (
    <Box
      className={classnames(classes.addCustomerWrap, classes.extraTitleWrap)}
    >
      <Box
        onClick={handleDisconnectButtonClick}
        className={classnames(classes.iconWrap, classes.iconWrapBackground, {
          [classes.disabledButton]: !isDisconnectEnabled
        })}
      >
        <img
          className={classes.disconnectIcon}
          src={disconnectIcon}
          alt='disconnect from customer'
        />
      </Box>
      <Typography className={classes.addCustomerTitle}>
        {t('disconnect_from_customer')}
      </Typography>
    </Box>
  )

  const titleData = {
    mainText: currentEntitlement && currentEntitlement.name,
    iconCapture: t('add_numbers'),
    Icon: <AddOutlinedIcon />,
    extraBlock: extraTitleBlock
  }

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.addCustomerWrap}>
          <Box
            onClick={handleAssignButtonClick}
            className={classnames(
              classes.iconWrap,
              classes.iconWrapBackground,
              {
                [classes.disabledButton]: !isAssignEnabled
              }
            )}
          >
            <DoneOutlinedIcon className={classes.assignIcon} />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('assign_to_subaccount')}
          </Typography>
        </Box>
        <Box className={`${classes.addCustomerWrap} ${classes.deassignWrap}`}>
          <Box
            onClick={handleDeassignButtonClick}
            className={classnames(
              classes.iconWrap,
              classes.iconWrapBackground,
              {
                [classes.disabledButton]: !isDeassignEnabled
              }
            )}
          >
            <img
              className={classes.deassignIcon}
              src={deassignIcon}
              alt='delete icon'
            />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('deassign_from_subaccount')}
          </Typography>
        </Box>
      </Box>
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
            onChange={() => selectNumbers(!row.checked, row.id, 'checked')}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.id, 'checked')}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.id, 'checked')}
              />
            ) : (
              currentPage * currentPerPage + i + 1
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
      id: 'phoneNumber',
      label: 'phone_numbers',
      getCellData: row => (
        <Box className={classes.subaccountCell}>
          <Typography className={classes.subaccountTitle}>
            {t(row.phoneNumber)}
          </Typography>
          {row.subaccount === 'none' && row.inUse === 'no' && (
            <Fragment>
              {isDisconnectingNumber &&
              numbersToDisconnect.some(item => item.id === row.id) ? (
                <CircularProgress className={classes.deleteLoading} />
              ) : (
                <Box
                  onClick={() =>
                    selectNumbers(
                      !row.isSelectedToDisconnect,
                      row.id,
                      'isSelectedToDisconnect'
                    )
                  }
                  className={classnames(classes.iconWrap, {
                    [classes.iconWrapBackground]:
                      row.isSelectedToDisconnect && !isDisconnectingNumber
                  })}
                >
                  <img
                    className={classes.disconnectIcon}
                    src={disconnectIcon}
                    alt='disconnect'
                  />
                </Box>
              )}
            </Fragment>
          )}
        </Box>
      )
    },
    {
      id: 'subaccount',
      label: 'subaccount',
      getCellData: row => (
        <Box className={classes.subaccountCell}>
          <Typography className={classes.subaccountTitle}>
            {t(row.subaccount)}
          </Typography>
          {row.subaccount !== 'none' && row.inUse === 'no' && (
            <Box
              onClick={() =>
                selectNumbers(
                  !row.isSelectedToDeassign,
                  row.id,
                  'isSelectedToDeassign'
                )
              }
              className={classnames(classes.iconWrap, {
                [classes.iconWrapBackground]: row.isSelectedToDeassign
              })}
            >
              <img
                className={classes.deassignIcon}
                src={deassignIcon}
                alt='delete icon'
              />
            </Box>
          )}
        </Box>
      )
    },
    {
      id: 'inUse',
      label: 'in_use',
      extraProps: {
        className: classes.inUseCell
      },
      getCellData: row => (
        <Fragment>
          {row.connected_to ? (
            <Link
              to={`/customers/${match.customerId}/subaccounts/${row.subaccountId}/ans_instances/basic/translations/${row.phoneNumber}`}
            >
              <Typography className={classes.usedTitle}>
                {t(row.connected_to)}
              </Typography>
            </Link>
          ) : (
            t('no')
          )}
        </Fragment>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {(isLoadingEntitlements && !isDisconnectingNumber) ||
        (isAssignedNumbersLoading && !isDisconnectingNumber) ? (
          <Loading />
        ) : (
          <Fragment>
            <CustomContainer>
              <CustomBreadcrumbs />
              <TitleBlock
                titleData={titleData}
                handleOpen={() => {
                  setShowAddNumber(true)
                  setStep(1)
                }}
              />
            </CustomContainer>
            <CustomTable
              classes={classes}
              columns={columns}
              firstCell={false}
              rows={numbers}
              searchCriterias={['phoneNumber', 'subaccount', 'inUse', 'status']}
              getSearchList={setSearchList}
              extraToolbarBlock={toolbarButtonsBlock}
              setCurrentPage={setCurrentPage}
              setCurrentPerPage={setCurrentPerPage}
              totalPagesServer={totalPagesServer}
              onPageChangeActions={handlePageChange}
              noAvailableDataMessage={t('no_assigned_numbers_available')}
            />
          </Fragment>
        )}
        {showAddNumbers && (
          <AddNumbers
            open={showAddNumbers}
            handleClose={() => {
              setShowAddNumber(false)
              getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
            }}
            step={step}
            changeStep={setStep}
          />
        )}
        {isAssignModalOpen && (
          <AssignToSubaccountModal
            open={isAssignModalOpen}
            handleClose={handleCloseAssignModal}
          />
        )}
        {isDeassignModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeassignModalOpen}
            handleClose={handleCloseDeassignModal}
            handleDelete={handleDeassign}
            // isDeleting={isDisconnectingNumber}
            deleteSubject={deassignSubject}
            extraDeleteSubject={deassignMessage}
            action={t('to_deassign')}
            titleAction={t(`deassign`)}
            extraMessageBlock={deassignMessageBlock}
          />
        )}
        {isDisconnectModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDisconnectModalOpen}
            handleClose={handleCloseDisconnectModal}
            handleDelete={handleDisconnect}
            deleteSubject={disconnectSubject}
            extraDeleteSubject={disconnectMessage}
            action={t('to_disconnect')}
            titleAction={capitalize(t(`disconnect`))}
            extraMessageBlock={disconnectMessageBlock}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbersItem))
