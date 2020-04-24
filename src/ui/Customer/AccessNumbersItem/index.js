import React, { useState, useContext, useEffect, Fragment } from 'react'
import { withRouter } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import EntitlementsStore from 'stores/Entitlements'

import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import AssignedNumbersStore from 'stores/AssignedNumbers'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTableBackendPagination'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddNumbers from './AddNumbers/'

import useStyles from './styles'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showAddNumbers, setShowAddNumber] = useState(false)
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [phoneNumberToDelete, setPhoneNumberToDelete] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const {
    assignedNumbers,
    isAssignedNumbersLoading,
    isDeletingAssignedNumber,
    getAssignedNumbers,
    deleteAssignedNumber,
    totalPagesServer
  } = AssignedNumbersStore

  useEffect(() => {
    getAssignedNumbers(match.customerId, currentPage + 1, currentPerPage)
  }, [currentPage, currentPerPage])

  useEffect(
    id => {
      setSelected(assignedNumbers)
    },
    [assignedNumbers]
  )

  const handlePageChange = () => {
    setIsAnyChecked(false)
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

  const selectNumbers = (checked, id) => {
    const newSelected = [...selected]
    const index = selected.findIndex(el => el.id === id)
    newSelected[index].checked = checked
    if (newSelected.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setSelected(newSelected)
    handleCheckedStates(newSelected)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map(item => item.id)
    const newSelected = selected.map(el => {
      let result = {}
      if (searchListId.includes(el.id)) {
        result = {
          ...el,
          checked: !selectAll,
          hover: false
        }
      } else {
        result = { ...el }
      }
      return result
    })
    handleCheckedStates(newSelected)
    setSelected(newSelected)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  const handleCheckedStates = newSelected => {
    if (
      newSelected.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newSelected.some(el => el.checked)) {
        setIsAnyChecked(true)
      } else {
        setIsAnyChecked(false)
      }
    }
    if (!newSelected.length) {
      setSelectAll(false)
      setIsAnyChecked(false)
    }
  }

  const changeHover = (newHover, id) => {
    const newSelected = [...selected]
    const index = selected.findIndex(el => el.id === id)
    newSelected[index].hover = newHover
    setSelected(newSelected)
  }

  const titleData = {
    mainText: match.numbersId,
    iconCapture: t('add_numbers'),
    Icon: <AddOutlinedIcon />
  }

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        {isAnyChecked && (
          <Box className={classes.addCustomerWrap}>
            <Box className={classes.addIconWrap}>
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete icon'
              />
            </Box>
            <Typography className={classes.addCustomerTitle}>
              {t('deassign')}
            </Typography>
          </Box>
        )}
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
      {showAddNumbers && (
        <AddNumbers
          open={showAddNumbers}
          handleClose={() => {
            setShowAddNumber(false)
          }}
          step={step}
          changeStep={setStep}
        />
      )}
      <Paper className={classes.paper}>
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
          searchCriterias={['phoneNumber', 'subaccountId', 'usedBy', 'status']}
          getSearchList={setSearchList}
          extraToolbarBlock={toolbarButtonsBlock}
          isLoadingData={isAssignedNumbersLoading}
          setCurrentPage={setCurrentPage}
          setCurrentPerPage={setCurrentPerPage}
          totalPagesServer={totalPagesServer}
          onPageChangeActions={handlePageChange}
        />
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
