import React, { useState, useContext, useEffect } from 'react'
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
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import NoAvailableDataBlock from 'components/NoAvailableDataBlock'
import AddNumbers from './AddNumbers/'

import useStyles from './styles'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const rows = [
  {
    id: 1,
    phone_numbers: '+24440300011',
    subaccount_id: '10440_01',
    status: 'in use',
    checked: false,
    hover: false
  },
  {
    id: 2,
    phone_numbers: '+24440300012',
    subaccount_id: '10440_01',
    status: 'in use',
    checked: false,
    hover: false
  },
  {
    id: 3,
    phone_numbers: '+24440300044',
    subaccount_id: '10440_01',
    status: 'in use',
    checked: false,
    hover: false
  },
  {
    id: 4,
    phone_numbers: '+24440300014',
    subaccount_id: '10440abs1',
    status: 'in use',
    checked: false,
    hover: false
  },
  {
    id: 5,
    phone_numbers: '+24440300015',
    subaccount_id: '10440_01',
    status: 'available',
    checked: false,
    hover: false
  },
  {
    id: 6,
    phone_numbers: '+24440300016',
    subaccount_id: '10440_01',
    status: 'available',
    checked: false,
    hover: false
  }
]

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showAddNumbers, setShowAddNumber] = useState(false)
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState(rows)
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  console.log(selected, 'selected')
  const { assignedNumbers, getAssignedNumbers } = AssignedNumbersStore

  useEffect(() => {
    getAssignedNumbers(match.customerId)
  }, [])

  const handleOpenDeleteModal = (id, name) => {
    console.log('delete')
    // setIsDeleteModalOpen(true)
    // setSubaccountToDelete({ id, name })
  }

  const selectNumbers = (checked, id) => {
    const newSelected = [...selected]
    const index = selected.findIndex((el) => el.id === id)
    newSelected[index].checked = checked
    if (newSelected.every((el) => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setSelected(newSelected)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map((item) => item.id)
    const newSelected = selected.map((el) => {
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

  const handleCheckedStates = (newSelected) => {
    if (
      newSelected.every((el) => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newSelected.some((el) => el.checked)) {
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
    const index = selected.findIndex((el) => el.id === id)
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
      id: 'phone_numbers',
      label: 'phone_numbers'
    },
    {
      id: 'subaccount_id',
      label: 'subaccount_id'
    },
    {
      id: 'status',
      label: 'status'
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: (row) => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.country)}
          className={classes.deleteCustomerIcon}
        />
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
        {selected.length ? (
          <CustomTable
            // classes={classes}
            columns={columns}
            firstCell={false}
            rows={selected}
            searchCriterias={['phone_numbers', 'subaccount_id']}
            getSearchList={setSearchList}
            extraToolbarBlock={toolbarButtonsBlock}
          />
        ) : (
          <NoAvailableDataBlock />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbersItem))
