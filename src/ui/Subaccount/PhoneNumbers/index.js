import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddPhoneNumbersModal from './components/AddPhoneNumbersModal'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import phoneNumbersRangeFilter from 'utils/phoneNumbersRangeFilter'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import filtersIcon from 'source/images/svg/filters.svg'

const PHONE_NUMBERS = [
  {
    id: 1,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423437',
    type: 'local',
    status: 'assigned',
    checked: false,
    hover: false
  },
  {
    id: 2,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423432',
    type: 'geo',
    status: 'assigned',
    checked: false,
    hover: false
  },
  {
    id: 3,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423433',
    type: 'geo',
    status: 'available',
    checked: false,
    hover: false
  },
  {
    id: 4,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423435',
    type: 'local',
    status: 'available',
    checked: false,
    hover: false
  },
  {
    id: 5,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423436',
    type: 'local',
    status: 'assigned',
    checked: false,
    hover: false
  },
  {
    id: 6,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423439',
    type: 'geo',
    status: 'available',
    checked: false,
    hover: false
  },
  {
    id: 7,
    country: 'Nigeria',
    countryCode: '+30',
    phoneNumber: '53423440',
    type: 'geo',
    status: 'assigned',
    checked: false,
    hover: false
  },
  {
    id: 8,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423434',
    type: 'geo',
    status: 'available',
    checked: false,
    hover: false
  },
  {
    id: 9,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423438',
    type: 'local',
    status: 'available',
    checked: false,
    hover: false
  }
]

const PhoneNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const [transformedNumbers, setTransformedNumbers] = useState([])
  const [numbers, setNumbers] = useState(PHONE_NUMBERS)
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [isAddPhoneNumbersModalOpen, setIsAddPhoneNumbersModalOpen] = useState(
    false
  )
  const {
    setPhoneNumbers,
    setDefaultValues,
    getPhoneNumbers
  } = PhoneNumbersStore

  const selectNumbers = (checked, phoneNumber) => {
    const newNumbers = [...transformedNumbers]
    const index = transformedNumbers.findIndex(
      (el) => el.phoneNumber === phoneNumber
    )
    newNumbers[index].checked = checked
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map((item) => item.phoneNumber)
    const newNumbers = transformedNumbers.map((el) => {
      let result = {}
      if (searchListId.includes(el.phoneNumber)) {
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
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  const handleCheckedStates = (newNumbers) => {
    if (
      newNumbers.every((el) => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newNumbers.some((el) => el.checked)) {
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

  const changeHover = (newHover, number) => {
    const newNumbers = [...transformedNumbers]
    const index = transformedNumbers.findIndex(
      (el) => el.phoneNumber === number
    )
    newNumbers[index].hover = newHover
    setTransformedNumbers(newNumbers)
  }

  useEffect(() => {
    getPhoneNumbers(match.customerId, match.groupId)
  }, [])

  useEffect(() => {
    const result = phoneNumbersRangeFilter(numbers).map((item) => {
      return {
        numberWithCode: `${item.countryCode} ${item.phoneNumber}`,
        rangeStart: `${item.countryCode} ${
          item.rangeStart ? item.rangeStart : item.phoneNumber
        }`,
        rangeEnd: `${item.countryCode} ${item.rangeEnd}`,
        ...item
      }
    })
    setTransformedNumbers(result)
  }, [numbers])

  useEffect(() => {
    handleCheckedStates(searchList)
    setPhoneNumbers(searchList)
  }, [searchList])

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
            onChange={(e) => selectNumbers(!row.checked, row.phoneNumber)}
          />
        ) : (
          <div
            className={classes.cursorPointer}
            onClick={() => selectNumbers(!row.checked, row.phoneNumber)}
            onMouseLeave={() => changeHover(false, row.phoneNumber)}
            onMouseEnter={() => changeHover(true, row.phoneNumber)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.phoneNumber)}
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
      getCellData: (row) => (
        <Typography className={classes.numbersTitle}>
          {row.phoneNumbers
            ? `${row.countryCode} ${row.rangeStart}`
            : `${row.countryCode} ${row.phoneNumber}`}
        </Typography>
      )
    },
    {
      id: 'rightArrow',
      isSortAvailable: false,
      getCellData: (row) => (
        <img
          src={RightArrowIcon}
          className={classes.rightArrowIcon}
          alt='right icon'
        />
      )
    },
    {
      id: 'phoneNumbersEnd',
      isSortAvailable: false,
      getCellData: (row) => (
        <Box className={classes.numbersWrap}>
          <Typography className={classes.numbersTitle}>
            {row.phoneNumbers && `${row.countryCode} ${row.rangeEnd}`}
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
      getCellData: (row) => (
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
          rows={transformedNumbers}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          searchCriterias={['country', 'rangeStart']}
          extraToolbarBlock={toolbarButtonsBlock}
          getSearchList={setSearchList}
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
