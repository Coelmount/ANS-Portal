import React, { useState, useEffect, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'
import capitalize from 'lodash/capitalize'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'

import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'
import { withStyles } from '@material-ui/core/styles'

import AssignedNumbersStore from 'stores/AssignedNumbers'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import AddNumbers from './AddNumbers/'
import AssignToSubaccountModal from './AssignToSubaccountModal'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import getUrlWithServiceCapability from 'utils/getUrlWithServiceCapability'

import disconnectIcon from 'source/images/svg/delete-icon.svg'
import deassignIcon from 'source/images/svg/deassign.svg'

import useStyles from './styles'

const StyledTooltip = withStyles({
  tooltip: {
    textAlign: 'center'
  }
})(Tooltip)

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  const history = useHistory()

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
  const [disconnectMessage, setDisconnectMessage] = useState('')
  const [disconnectMessageBlock, setDisconnectMessageBlock] = useState(null)
  const [disconnectSubject, setDisconnectSubject] = useState('')
  const [deassignMessage, setDeassignMessage] = useState('')
  const [deassignMessageBlock, setDeassignMessageBlock] = useState(null)
  const [deassignSubject, setDeassignSubject] = useState('')
  const [clickedInstance, setClickedInstance] = useState({})
  const [isSubaccountLinkClicked, setIsSubaccountLinkClicked] = useState(false)
  const [isDisconnectAll, setIsDisconnectAll] = useState(false)
  const [isDeassignAll, setIsDeassignAll] = useState(false)
  const classes = useStyles({ isDisconnectAll, isDeassignAll, selectAll })

  const {
    assignedNumbers,
    isAssignedNumbersLoading,
    isLoadingEntitlements,
    isDisconnectingNumber,
    disconnectNumbers,
    deassignNumbers,
    getEntitlementsAndFindCurrent,
    currentEntitlement,
    setDefaultValues,
    setNumbersToAssign,
    setNumbersToDisconnect,
    setNumbersToDeassign,
    showErrorNotification,
    numbersToDisconnect,
    numbersToDeassign,
    getSubaccountId,
    clearSubaccountLinkId,
    subaccountLinkId,
    isSubaccountLinkIdLoading,
    isDeassigningNumber,
    isNumbersDeassigned
  } = AssignedNumbersStore

  const isLoading =
    (isLoadingEntitlements && !isDisconnectingNumber && !isDeassigningNumber) ||
    (isAssignedNumbersLoading &&
      !isDisconnectingNumber &&
      !isDeassigningNumber) ||
    isSubaccountLinkIdLoading

  const isAssignEnabled =
    numberOfChecked > 0 &&
    !numbers.some(
      item =>
        (item.checked && item.subaccount !== 'none') ||
        (item.checked && item.inUse !== 'no')
    )
  const isAssignAllPossible = numbers.some(
    number => number.subaccount === 'none' && number.inUse === 'no'
  )

  const isDeassignEnabled =
    !isDeassigningNumber &&
    numberOfSelectedToDeassign > 0 &&
    !numbers.some(
      item =>
        (item.isSelectedToDeassign && item.subaccount === 'none') ||
        (item.isSelectedToDeassign && item.inUse !== 'no')
    )
  const isDeassignAllPossible = numbers.some(
    number => number.subaccount !== 'none' && number.inUse === 'no'
  )

  const isDisconnectEnabled =
    !isDisconnectingNumber &&
    numberOfSelectedToDisconnect > 0 &&
    !numbers.some(
      item =>
        (item.isSelectedToDisconnect && item.subaccount !== 'none') ||
        (item.isSelectedToDisconnect && item.inUse !== 'no')
    )
  const isDisconnectAllPossible = numbers.some(
    number => number.subaccount === 'none' && number.inUse === 'no'
  )

  useEffect(() => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    return () => {
      setDefaultValues()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (assignedNumbers.length > 0) setNumbers(assignedNumbers)
    setNumberOfSelectedToDisconnect(0)
    setNumberOfSelectedToDeassign(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignedNumbers])

  // Status(in use) column redirect
  useEffect(() => {
    // for 'used' status column value redirect
    if (subaccountLinkId && clickedInstance.phoneNumber) {
      const url = getUrlWithServiceCapability(
        currentEntitlement.service_capabilities,
        clickedInstance
      )
      history.push(
        `/customers/${match.customerId}/subaccounts/${subaccountLinkId}/ans_instances/${url}`
      )
    }
    // for 'free' status column value redirect
    if (subaccountLinkId && !clickedInstance.phoneNumber) {
      const url = getUrlWithServiceCapability(
        currentEntitlement.service_capabilities
      )
      history.push(
        `/customers/${match.customerId}/subaccounts/${subaccountLinkId}/ans_instances/${url}`
      )
    }
    return () => {
      clearSubaccountLinkId()
      setClickedInstance({})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subaccountLinkId])

  // Subaccount column redirect
  useEffect(() => {
    if (subaccountLinkId && isSubaccountLinkClicked) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${subaccountLinkId}`
      )
    }
    return () => {
      clearSubaccountLinkId()
      setIsSubaccountLinkClicked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subaccountLinkId])

  // update page after deassign
  useEffect(() => {
    if (isNumbersDeassigned) {
      getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNumbersDeassigned])

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false)
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setNumberOfChecked(0)
    setSelectAll(false)
  }

  const selectNumbers = (newValue, id, fieldName) => {
    const newSelected = transformOnChange(numbers, newValue, id, fieldName)
    setNumbers(newSelected)
    handleCheckedStates(newSelected)
    handleDisconnectedStates()
    handleDeassignedStates()

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
    if (isAssignAllPossible) {
      const filteredNumbers = searchList.filter(
        number => number.subaccount === 'none' && number.inUse === 'no'
      )
      const newSelected = transformOnCheckAll(
        filteredNumbers,
        numbers,
        selectAll
      )
      handleCheckedStates(newSelected)
      setNumbers(newSelected)
      setSelectAll(!selectAll)
      selectAll ? setNumberOfChecked(0) : setNumberOfChecked(searchList.length)
    }
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

  const handleDisconnectedStates = () => {
    const possibleToDisconnectArr = numbers.filter(
      number => number.subaccount === 'none' && number.inUse === 'no'
    )

    if (
      possibleToDisconnectArr.every(el => el.isSelectedToDisconnect === true)
    ) {
      setIsDisconnectAll(true)
    } else {
      setIsDisconnectAll(false)
    }
    if (!possibleToDisconnectArr.length) {
      setIsDisconnectAll(false)
    }
  }

  const handleDeassignedStates = () => {
    const possibleToDeassignArr = numbers.filter(
      number => number.subaccount !== 'none' && number.inUse === 'no'
    )

    if (possibleToDeassignArr.every(el => el.isSelectedToDeassign === true)) {
      setIsDeassignAll(true)
    } else {
      setIsDeassignAll(false)
    }
    if (!possibleToDeassignArr.length) {
      setIsDeassignAll(false)
    }
  }

  const createDeassignMessage = numbers => {
    const amountOfNumbers = numbers.length
    const deassignText =
      amountOfNumbers > 1
        ? t('phone_numbers').toLowerCase()
        : t('phone_number').toLowerCase()
    setDeassignSubject(deassignText)
    const totalMessage = `${amountOfNumbers} ${deassignText}:`
    setDeassignMessage(totalMessage)
  }

  const createDisconnectMessage = numbers => {
    const amountOfNumbers = numbers.length
    const disconnectText =
      amountOfNumbers > 1
        ? t('phone_numbers').toLowerCase()
        : t('phone_number').toLowerCase()
    setDisconnectSubject(disconnectText)
    const totalMessage = `${amountOfNumbers} ${disconnectText}:`
    setDisconnectMessage(totalMessage)
  }

  const createDeassignMessageBlock = numbers => {
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

  const createDisconnectMessageBlock = numbers => {
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

  const handleAssignButtonClick = () => {
    if (isAssignEnabled) {
      const checkedNumbers = numbers.filter(item => item.checked === true)
      setNumbersToAssign(checkedNumbers)
      setIsAssignModalOpen(true)
    } else {
      showErrorNotification(t('no_numbers_selected_to_assign'))
    }
  }

  const handleDeassignButtonClick = () => {
    if (isDeassignEnabled) {
      const selectedNumbers = numbers.filter(
        item => item.isSelectedToDeassign === true
      )
      setNumbersToDeassign(selectedNumbers)
      createDeassignMessage(selectedNumbers)
      createDeassignMessageBlock(selectedNumbers)
      setIsDeassignModalOpen(true)
    } else {
      showErrorNotification(t('no_numbers_selected_to_deassign'))
    }
  }

  const handleDisconnectButtonClick = () => {
    if (isDisconnectEnabled) {
      const selectedNumbers = numbers.filter(
        item => item.isSelectedToDisconnect === true
      )
      setNumbersToDisconnect(selectedNumbers)
      createDisconnectMessage(selectedNumbers)
      createDisconnectMessageBlock(selectedNumbers)
      setIsDisconnectModalOpen(true)
    } else {
      showErrorNotification(t('no_numbers_selected_to_disconnect'))
    }
  }

  const handleCloseDeassignModal = () => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setIsDeassignModalOpen(false)
    setNumberOfSelectedToDeassign(0)
    setSelectAll(false)
    setIsDisconnectAll(false)
    setIsDeassignAll(false)
  }

  const handleCloseDisconnectModal = () => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setIsDisconnectModalOpen(false)
    setIsDisconnectAll(false)
    setNumberOfSelectedToDisconnect(0)
    setSelectAll(false)
    setIsDisconnectAll(false)
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

  const handleInUseLinkClick = (row, isPhoneNumberRedirect = true) => {
    getSubaccountId(match.customerId, row.subaccount)
    setClickedInstance(isPhoneNumberRedirect ? row : {})
  }

  const handleSubaccountLinkClick = row => {
    if (row.subaccount !== 'none') {
      getSubaccountId(match.customerId, row.subaccount)
      setIsSubaccountLinkClicked(true)
    }
  }

  const handleDisconnectAll = () => {
    if (isDisconnectAllPossible) {
      setIsDisconnectAll(!isDisconnectAll)
      let localCounter = 0
      const currentVisibleList = searchList.map(item => item.id)

      const numbersWithChangedDisconnectFlag = numbers.map(number => {
        if (
          number.subaccount === 'none' &&
          number.inUse === 'no' &&
          currentVisibleList.includes(number.id)
        ) {
          if (number.isSelectedToDisconnect === false) {
            localCounter = localCounter + 1
          }
          setNumberOfSelectedToDisconnect(
            isDisconnectAll ? 0 : localCounter + numberOfSelectedToDisconnect
          )
          return {
            ...number,
            isSelectedToDisconnect: !isDisconnectAll
          }
        } else {
          return { ...number }
        }
      })
      setNumbers(numbersWithChangedDisconnectFlag)
    }
  }

  const handleDeassignAll = () => {
    if (isDeassignAllPossible) {
      setIsDeassignAll(!isDeassignAll)
      let localCounter = 0
      const currentVisibleList = searchList.map(item => item.id)

      const numbersWithChangedDeassignFlag = numbers.map(number => {
        if (
          number.subaccount !== 'none' &&
          number.inUse === 'no' &&
          currentVisibleList.includes(number.id)
        ) {
          if (number.isSelectedToDeassign === false) {
            localCounter = localCounter + 1
          }
          setNumberOfSelectedToDeassign(
            isDeassignAll ? 0 : localCounter + numberOfSelectedToDeassign
          )
          return {
            ...number,
            isSelectedToDeassign: !isDeassignAll
          }
        } else {
          return { ...number }
        }
      })
      setNumbers(numbersWithChangedDeassignFlag)
    }
  }

  const extraTitleBlock = (
    <Box
      className={classnames(classes.buttonContainer, classes.extraTitleWrap)}
    >
      <IconButton
        aria-label='disconnect icon button'
        component='span'
        className={classnames(classes.mainIconWrap, {
          [classes.disabledButton]: !isDisconnectEnabled
        })}
        onClick={handleDisconnectButtonClick}
      >
        <img
          className={classes.disconnectIcon}
          src={disconnectIcon}
          alt='disconnect from customer'
        />
      </IconButton>
      <Typography
        className={classnames(classes.iconTitle, {
          [classes.disabledContent]: !isDisconnectEnabled
        })}
      >
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
        <Box className={classes.buttonContainer}>
          <IconButton
            aria-label='assign icon button'
            component='span'
            className={classnames(classes.mainIconWrap, {
              [classes.disabledButton]: !isAssignEnabled
            })}
            onClick={handleAssignButtonClick}
          >
            <DoneOutlinedIcon className={classes.assignIcon} />
          </IconButton>
          <Typography
            className={classnames(classes.iconTitle, {
              [classes.disabledContent]: !isAssignEnabled
            })}
          >
            {t('assign_to_subaccount')}
          </Typography>
        </Box>
        <Box className={`${classes.buttonContainer} ${classes.deassignWrap}`}>
          <IconButton
            aria-label='deassign icon button'
            component='span'
            className={classnames(classes.mainIconWrap, {
              [classes.disabledButton]: !isDeassignEnabled
            })}
            onClick={handleDeassignButtonClick}
          >
            <img
              className={classes.deassignIcon}
              src={deassignIcon}
              alt='deassign from subaccount'
            />
          </IconButton>
          <Typography
            className={classnames(classes.iconTitle, {
              [classes.disabledContent]: !isDeassignEnabled
            })}
          >
            {t('deassign_from_subaccount')}
          </Typography>
        </Box>
      </Box>
    )
  }

  const columns = [
    {
      id: 'phoneNumber',
      label: 'phone_numbers',
      extraProps: {
        className: classes.phoneNumberColumn
      },
      extraHeadProps: {
        className: classes.phoneNumberHeadCell
      },
      headIcon: (
        <StyledTooltip
          title={
            !isDisconnectAllPossible
              ? t('no_numbers_possible_to_disconnect')
              : t('disconnect_all_tooltip')
          }
        >
          <img
            className={classnames(classes.disconnectIcon, {
              [classes.disabledContent]: !isDisconnectAllPossible
            })}
            src={disconnectIcon}
            alt='disconnect'
          />
        </StyledTooltip>
      ),
      headIconWrapStyles: classes.customPhoneNumberHeadIconWrap,
      headCellInsideWrapStyles: classes.headCellInsideWrap,
      onIconClick: handleDisconnectAll,
      getCellData: row => (
        <Box className={classes.subaccountCell}>
          <Typography className={classes.phoneTitle}>
            {t(row.phoneNumber)}
          </Typography>
          <Fragment>
            {isDisconnectingNumber &&
            numbersToDisconnect.some(item => item.id === row.id) ? (
              <CircularProgress className={classes.deleteLoading} />
            ) : (
              <StyledTooltip
                title={
                  row.subaccount !== 'none' || row.inUse !== 'no'
                    ? t('not_avaliable_to_disconnect_tooltip')
                    : t('available_to_disconnect_tooltip')
                }
              >
                <IconButton
                  aria-label='upload picture'
                  component='span'
                  className={classnames(classes.tableIconWrap, {
                    [classes.btnBack]:
                      row.isSelectedToDisconnect && !isDisconnectingNumber,
                    [classes.enabledColumnButton]:
                      row.subaccount === 'none' && row.inUse === 'no'
                  })}
                  onClick={() => {
                    if (row.subaccount === 'none' && row.inUse === 'no')
                      selectNumbers(
                        !row.isSelectedToDisconnect,
                        row.id,
                        'isSelectedToDisconnect'
                      )
                  }}
                >
                  <img
                    className={classes.disconnectIcon}
                    src={disconnectIcon}
                    alt='disconnect'
                  />
                </IconButton>
              </StyledTooltip>
            )}
          </Fragment>
        </Box>
      )
    },
    {
      id: 'subaccount',
      label: 'subaccount',
      extraHeadProps: {
        className: classes.subaccountHeadCell
      },
      headIcon: (
        <StyledTooltip
          title={
            !isDeassignAllPossible
              ? t('no_numbers_possible_to_deassign')
              : t('deassign_all_tooltip')
          }
        >
          <img
            className={classnames(classes.deassignIcon, {
              [classes.disabledContent]: !isDeassignAllPossible
            })}
            src={deassignIcon}
            alt='deassign'
          />
        </StyledTooltip>
      ),
      headIconWrapStyles: classes.customSubaccountHeadIconWrap,
      headCellInsideWrapStyles: classes.headCellInsideWrap,
      onIconClick: handleDeassignAll,
      getCellData: row => (
        <Box className={classes.subaccountCell}>
          <Typography
            onClick={() => handleSubaccountLinkClick(row)}
            className={classnames(classes.subaccountTitle, {
              [classes.linkTitle]: row.subaccount !== 'none'
            })}
          >
            {t(row.subaccount)}
          </Typography>
          <Fragment>
            {isDeassigningNumber &&
            numbersToDeassign.some(item => item.id === row.id) ? (
              <CircularProgress className={classes.deleteLoading} />
            ) : (
              <StyledTooltip
                title={
                  row.subaccount === 'none' || row.inUse !== 'no'
                    ? t('not_available_to_deassign_tooltip')
                    : t('available_to_deassign_tooltip')
                }
              >
                <IconButton
                  aria-label='deassign icon button'
                  component='span'
                  className={classnames(classes.tableIconWrap, {
                    [classes.btnBack]:
                      row.isSelectedToDeassign && !isDeassigningNumber,
                    [classes.enabledColumnButton]:
                      row.subaccount !== 'none' && row.inUse === 'no'
                  })}
                  onClick={() => {
                    if (row.subaccount !== 'none' && row.inUse === 'no')
                      selectNumbers(
                        !row.isSelectedToDeassign,
                        row.id,
                        'isSelectedToDeassign'
                      )
                  }}
                >
                  <img
                    className={classes.deassignIcon}
                    src={deassignIcon}
                    alt='deassign from subaccount'
                  />
                </IconButton>
              </StyledTooltip>
            )}
          </Fragment>
        </Box>
      )
    },
    {
      id: 'asign',
      headIcon: (
        <StyledTooltip
          title={
            !isAssignAllPossible
              ? t('no_numbers_possible_to_assign')
              : t('assign_all_tooltip')
          }
        >
          <DoneOutlinedIcon
            className={classnames(classes.assignIcon, {
              [classes.disabledContent]: !isAssignAllPossible
            })}
          />
        </StyledTooltip>
      ),
      headIconWrapStyles: classes.customAsignHeadIconWrap,
      headCellInsideWrapStyles: classes.headCellInsideWrap,
      onIconClick: handleSelectAll,
      isSortAvailable: false,
      extraProps: {
        className: classes.asignCell
      },
      extraHeadProps: {
        className: classes.asignCell
      },
      getCellData: row => (
        <StyledTooltip
          title={
            row.subaccount !== 'none' || row.inUse !== 'no'
              ? t('not_available_to_assign_tooltip')
              : t('available_to_assign_tooltip')
          }
        >
          <IconButton
            aria-label='assign all picture'
            component='span'
            className={classnames(classes.tableIconWrap, {
              [classes.btnBack]: row.checked,
              [classes.enabledColumnButton]:
                row.subaccount === 'none' && row.inUse === 'no'
            })}
            onClick={() => {
              if (row.subaccount === 'none' && row.inUse === 'no')
                selectNumbers(!row.checked, row.id, 'checked')
            }}
          >
            <DoneOutlinedIcon className={classes.assignIcon} />
          </IconButton>
        </StyledTooltip>
      )
    },
    {
      id: 'inUse',
      label: 'status',
      getCellData: row => (
        <Fragment>
          {row.connected_to ? (
            <Typography
              onClick={() => handleInUseLinkClick(row)}
              className={classes.linkTitle}
            >
              {t('used')}
            </Typography>
          ) : (
            <StyledTooltip
              title={
                row.subaccount === 'none'
                  ? t('status_assign_subaccount_first')
                  : ''
              }
            >
              <Typography
                onClick={
                  row.subaccount !== 'none'
                    ? () => handleInUseLinkClick(row, false)
                    : undefined
                }
                className={classes.availableTitle}
              >
                {t('free')}
              </Typography>
            </StyledTooltip>
          )}
        </Fragment>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isLoading ? (
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
                showHelper={false}
              />
            </CustomContainer>
            <CustomTable
              classes={classes}
              columns={columns}
              firstCell={true}
              rows={numbers}
              searchCriterias={['phoneNumber', 'subaccount', 'inUse', 'status']}
              getSearchList={setSearchList}
              extraToolbarBlock={toolbarButtonsBlock}
              noAvailableDataMessage={t('no_assigned_numbers_available')}
              tableId={'access_number_item_list'}
              idColStyles={classes.idColumn}
            />
          </Fragment>
        )}
        {showAddNumbers && (
          <AddNumbers
            open={showAddNumbers}
            handleClose={() => {
              setShowAddNumber(false)
              getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
              setSelectAll(false)
              setIsDisconnectAll(false)
              setIsDeassignAll(false)
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
