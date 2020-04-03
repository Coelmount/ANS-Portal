import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  Fragment
} from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import EntitlementsStore from 'stores/Entitlements'

import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'

import phoneNumbersRangeFilter from 'utils/phoneNumbersRangeFilter'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'

const PHONE_NUMBERS = [
  {
    id: 1,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423437',
    type: 'local',
    status: 'assigned',
    checked: false
  },
  {
    id: 2,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423432',
    type: 'geo',
    status: 'assigned',
    checked: false
  },
  {
    id: 3,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423433',
    type: 'geo',
    status: 'available',
    checked: false
  },
  {
    id: 4,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423435',
    type: 'local',
    status: 'available',
    checked: false
  },
  {
    id: 5,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423436',
    type: 'local',
    status: 'assigned',
    checked: false
  },
  {
    id: 6,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423439',
    type: 'geo',
    status: 'available',
    checked: false
  },
  {
    id: 7,
    country: 'Nigeria',
    countryCode: '+30',
    phoneNumber: '53423440',
    type: 'geo',
    status: 'assigned',
    checked: false
  },
  {
    id: 8,
    country: 'Angola',
    countryCode: '+24',
    phoneNumber: '53423434',
    type: 'geo',
    status: 'available',
    checked: false
  },
  {
    id: 9,
    country: 'South Africa',
    countryCode: '+27',
    phoneNumber: '53423438',
    type: 'local',
    status: 'available',
    checked: false
  }
]

const PhoneNumbers = observer(({ t }) => {
  const classes = useStyles()
  const [transformedNumbers, setTransformedNumbers] = useState([])
  const [numbers, setNumbers] = useState(PHONE_NUMBERS)
  const [selectAll, setSelectAll] = useState(false)
  console.log(numbers, 'numbers')

  const selectNumbers = (checked, id) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.id === id)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setNumbers(newNumbers)
  }

  const handleSelectAll = () => {
    const newNumbers = numbers.map(el => ({ ...el, checked: !selectAll }))
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
  }

  useEffect(() => {
    const result = phoneNumbersRangeFilter(numbers).map(item => {
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

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
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
            onClick={e => selectNumbers(!row.checked, row.id)}
          >
            {i + 1}
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
      id: 'country',
      label: 'country'
    },
    {
      id: 'rangeStart',
      label: 'phone_numbers',
      getCellData: row => (
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
      getCellData: row => (
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
      getCellData: row => (
        <Box className={classes.numbersWrap}>
          <Typography className={classes.numbersTitle}>
            {row.phoneNumbers && `${row.countryCode} ${row.rangeEnd}`}
          </Typography>
          <Typography className={classes.numbersAmount}>
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
        <CloseOutlinedIcon
          // onClick={() => handleOpenDeleteModal(row.tenantId, row.name)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  const titleData = {
    mainText: t('phone_numbers'),
    iconCapture: t('add'),
    Icon: <AddOutlinedIcon />
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            // handleOpen={handleOpenCreateCustomer}
          />
        </CustomContainer>
        <CustomTable
          firstCell={false}
          classes={classes}
          rows={transformedNumbers}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          id='country'
          name='rangeStart'
        />
      </Paper>
    </div>
  )
})

export default withNamespaces()(PhoneNumbers)
