import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTableBackendPagination'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddPhoneNumbersModal from './components/AddPhoneNumbersModal'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import filtersIcon from 'source/images/svg/filters.svg'
import useStyles from './styles'

const PhoneNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [isAddPhoneNumbersModalOpen, setIsAddPhoneNumbersModalOpen] = useState(
    false
  )
  console.log(numbers, 'numbers')
  const [currentPage, setCurrentPage] = useState(0)
  const [currentPerPage, setCurrentPerPage] = useState(10)
  const {
    transformedPhoneNumbers,
    setPhoneNumbers,
    setDefaultValues,
    getPhoneNumbers
  } = PhoneNumbersStore

  // initial request
  useEffect(() => {
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      currentPage + 1, // cause on back pagination starts from 1, not 0
      currentPerPage
    )
  }, [])

  // set in component after store transformation
  useEffect(() => {
    setNumbers(transformedPhoneNumbers)
  }, [transformedPhoneNumbers])

  // handle search
  useEffect(() => {
    handleCheckedStates(searchList)
    setPhoneNumbers(searchList)
  }, [searchList])

  // handle check/uncheck
  const selectNumbers = (checked, id) => {
    const newNumbers = transformOnChange(numbers, checked, id)
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  // handle check all
  const handleSelectAll = () => {
    const newNumbers = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  // handler of check states schema
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

  const handleAddModalClick = () => {
    setIsAddPhoneNumbersModalOpen(true)
  }

  const handleAddModalClose = () => {
    setIsAddPhoneNumbersModalOpen(false)
    setDefaultValues()
  }

  const changeHover = (newHover, id) => {
    const newNumbers = transformOnHover(numbers, newHover, id)
    setNumbers(newNumbers)
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
            className={classes.cursorPointer}
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
        // className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'country',
      label: 'country'
    },
    {
      id: 'rangeStart',
      label: 'phone_numbers',
      extraProps: {
        className: classes.numbersTitle
      }
    },
    {
      id: 'rightArrow',
      isSortAvailable: false,
      getCellData: row => (
        <Fragment>
          {row.phoneNumbers && (
            <img
              src={RightArrowIcon}
              className={classes.rightArrowIcon}
              alt='right icon'
            />
          )}
        </Fragment>
      )
    },
    {
      id: 'phoneNumbersEnd',
      isSortAvailable: false,
      getCellData: row => (
        <Box className={classes.numbersWrap}>
          <Typography className={classes.numbersTitle}>
            {row.phoneNumbers && row.rangeEnd}
          </Typography>
          <Typography className={classes.numberPhoneNumbersStoresAmount}>
            {row.phoneNumbers && `(${row.phoneNumbers.length})`}
          </Typography>
        </Box>
      )
    },
    {
      id: 'type',
      label: 'type'
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
      getCellData: row => (
        <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
      )
    }
  ]

  const titleData = {
    mainText: t('phone_numbers'),
    iconCapture: t('add'),
    Icon: <AddOutlinedIcon />
  }

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.addCustomerWrap}>
          <Box className={classes.addIconWrap}>
            <img
              className={classes.deleteIcon}
              src={filtersIcon}
              alt='delete icon'
            />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('filters')}
          </Typography>
        </Box>
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
              {t('delete')}
            </Typography>
          </Box>
        )}
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} handleOpen={handleAddModalClick} />
        </CustomContainer>
        <CustomTable
          firstCell={false}
          // classes={classes}
          rows={numbers}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          searchCriterias={['country', 'rangeStart']}
          extraToolbarBlock={toolbarButtonsBlock}
          getSearchList={setSearchList}
          setCurrentPage={setCurrentPage}
          setCurrentPerPage={setCurrentPerPage}
        />
        {isAddPhoneNumbersModalOpen && (
          <AddPhoneNumbersModal
            open={isAddPhoneNumbersModalOpen}
            handleClose={handleAddModalClose}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(PhoneNumbers)
