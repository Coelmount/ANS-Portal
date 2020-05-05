import React, { useState, useContext, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import EntitlementsStore from 'stores/Entitlements'
import AssignedNumbersStore from 'stores/AssignedNumbers'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddNumbers from './AddNumbers/'
import AssignToSubaccountModal from './AssignToSubaccountModal'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import disconnectFromCustomerIcon from 'source/images/svg/disconnect-from-customer.svg'

import useStyles from './styles'

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showAddNumbers, setShowAddNumber] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [searchList, setSearchList] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [phoneNumberToDelete, setPhoneNumberToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const {
    assignedNumbers,
    isAssignedNumbersLoading,
    isLoadingEntitlements,
    isDeletingAssignedNumber,
    getAssignedNumbers,
    deleteAssignedNumber,
    totalPagesServer,
    getEntitlementsAndFindCurrent,
    currentEntitlement,
    setDefaultValues,
    setNumbersToAssign
  } = AssignedNumbersStore

  const isAssignEnabled =
    numberOfChecked > 0 &&
    !selected.some(item => item.checked && item.subaccountId !== 'none')

  useEffect(() => {
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    return () => setDefaultValues()
  }, [])

  useEffect(() => {
    setSelected(assignedNumbers)
  }, [assignedNumbers])

  const handlePageChange = () => {
    setNumberOfChecked(0)
  }

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setPhoneNumberToDelete({ id })
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleDelete = id => {
    const payload = {
      id,
      callback: setIsDeleteModalOpen
    }
    deleteAssignedNumber(payload)
  }

  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false)
    getEntitlementsAndFindCurrent(match.customerId, match.numbersId)
    setNumberOfChecked(0)
  }

  const selectNumbers = (checked, id) => {
    const newSelected = transformOnChange(selected, checked, id)
    setSelected(newSelected)
    handleCheckedStates(newSelected)
    checked
      ? setNumberOfChecked(numberOfChecked + 1)
      : setNumberOfChecked(numberOfChecked - 1)
  }

  const handleSelectAll = () => {
    const newSelected = transformOnCheckAll(searchList, selected, selectAll)
    handleCheckedStates(newSelected)
    setSelected(newSelected)
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
    const newSelected = transformOnHover(selected, newHover, id)
    setSelected(newSelected)
  }

  const handleAssignButtonClick = () => {
    if (isAssignEnabled) {
      const checkedNumbers = selected.filter(item => item.checked === true)
      setNumbersToAssign(checkedNumbers)
      setIsAssignModalOpen(true)
    }
  }

  const extraTitleBlock = (
    <Box
      className={classnames(classes.addCustomerWrap, classes.extraTitleWrap)}
    >
      <Box className={classes.addIconWrap}>
        <img
          className={classes.disconnectIcon}
          src={disconnectFromCustomerIcon}
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
            className={classnames(classes.addIconWrap, {
              [classes.enabledButton]: isAssignEnabled
            })}
          >
            <DoneOutlinedIcon className={classes.assignIcon} />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('assign_to_subaccount')}
          </Typography>
        </Box>
        <Box className={`${classes.addCustomerWrap} ${classes.deassignWrap}`}>
          <Box className={classes.addIconWrap}>
            <img
              className={classes.deleteIcon}
              src={deleteIcon}
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
      label: 'phone_numbers'
    },
    {
      id: 'subaccountId',
      label: 'subaccount_id'
    },
    {
      id: 'usedBy',
      label: 'used_by',
      getCellData: row => (
        <Typography>
          {row.connected_to ? row.connected_to : t('none')}
        </Typography>
      )
    },
    {
      id: 'status',
      label: 'status',
      getCellData: row => (
        <Typography
          className={
            row.status === 'in_use'
              ? classes.inUseTitle
              : classes.avaliableTitle
          }
        >
          {t(`${row.status}`)}
        </Typography>
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
          {row.status === 'available' && (
            <CloseOutlinedIcon
              onClick={() => handleOpenDeleteModal(match.customerId)}
              className={classes.deleteCustomerIcon}
            />
          )}
        </Fragment>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isAssignedNumbersLoading || isLoadingEntitlements ? (
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
              rows={selected}
              searchCriterias={[
                'phoneNumber',
                'subaccountId',
                'usedBy',
                'status'
              ]}
              getSearchList={setSearchList}
              extraToolbarBlock={toolbarButtonsBlock}
              // isLoadingData={isAssignedNumbersLoading && isLoadingEntitlements}
              setCurrentPage={setCurrentPage}
              setCurrentPerPage={setCurrentPerPage}
              totalPagesServer={totalPagesServer}
              onPageChangeActions={handlePageChange}
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
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={phoneNumberToDelete}
            isDeleting={isDeletingAssignedNumber}
            deleteSubject={t('phone_number')}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbersItem))
