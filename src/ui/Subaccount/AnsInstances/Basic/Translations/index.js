import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'

import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
// import AddPhoneNumbersModal from './components/AddPhoneNumbersModal'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import useStyles from './styles'
import arrowsIcon from 'source/images/svg/arrows.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const PHONE_NUMBERS = [
  {
    id: 1,
    accessCountry: 'South Africa',
    accessCountryCode: '+27',
    accessNumber: '53423437',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243242',
    enabled: false,
    checked: false,
    hover: false
  },
  {
    id: 2,
    accessCountry: 'Ghana',
    accessCountryCode: '+27',
    accessNumber: '53423421',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243242',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 3,
    accessCountry: 'South Africa',
    accessCountryCode: '+27',
    accessNumber: '53423437',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243242',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 4,
    accessCountry: 'South Africa',
    accessCountryCode: '+27',
    accessNumber: '53423467',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243212',
    enabled: false,
    checked: false,
    hover: false
  },
  {
    id: 5,
    accessCountry: 'South Africa',
    accessCountryCode: '+27',
    accessNumber: '53423312',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243612',
    enabled: true,
    checked: false,
    hover: false
  },
  {
    id: 6,
    accessCountry: 'South Africa',
    accessCountryCode: '+27',
    accessNumber: '53423432',
    destinationCountry: 'USA',
    destinationCountryCode: '+1',
    destinationNumber: '23243231',
    enabled: false,
    checked: false,
    hover: false
  }
]

const Translations = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const [numbers, setNumbers] = useState(PHONE_NUMBERS)
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [isAddPhoneNumbersModalOpen, setIsAddPhoneNumbersModalOpen] = useState(
    false
  )
  const [anchorEl, setAnchorEl] = React.useState(null)
  // const [isAddPopoverOpen, setIsPopoverOpen] = useState(false)
  const isAddPopoverOpen = Boolean(anchorEl)
  const id = isAddPopoverOpen ? 'simple-popover' : undefined
  const {
    setPhoneNumbers,
    setDefaultValues,
    getPhoneNumbers
  } = PhoneNumbersStore

  console.log(numbers, 'numbers')

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const selectNumbers = (checked, id) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex((el) => el.id === id)
    newNumbers[index].checked = checked
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const enableNumbers = (enabled, id) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex((el) => el.id === id)
    newNumbers[index].enabled = enabled
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map((item) => item.id)
    const newNumbers = numbers.map((el) => {
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
    const newNumbers = [...numbers]
    const index = numbers.findIndex((el) => el.id === number)
    newNumbers[index].hover = newHover
    setNumbers(newNumbers)
  }

  useEffect(() => {
    getPhoneNumbers(match.customerId, match.groupId)
  }, [])

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
            onChange={(e) => selectNumbers(!row.checked, row.id)}
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
      label: 'access_number',
      isSortAvailable: false,
      getCellData: (row) => (
        <Box>
          <Typography
            className={classes.accessNumberText}
          >{`${row.accessCountryCode} ${row.accessNumber}`}</Typography>
          <Typography>{row.accessCountry}</Typography>
        </Box>
      ),
      extraHeadProps: {
        className: classes.accessHeadCell
      },
      extraProps: {
        className: classes.accessNumberCell
      }
    },
    {
      id: 'rightArrow',
      isSortAvailable: false,
      getCellData: (row) => (
        <img
          src={arrowsIcon}
          className={classes.rightArrowIcon}
          alt='right icon'
        />
      )
    },
    {
      label: 'destination_number',
      isSortAvailable: false,
      getCellData: (row) => (
        <Box>
          <Typography
            className={classes.destinationNumberText}
          >{`${row.destinationCountryCode} ${row.destinationNumber}`}</Typography>
          <Typography>{row.destinationCountry}</Typography>
        </Box>
      )
    },
    {
      id: 'status',
      label: 'enable_disable',
      isSortAvailable: false,
      align: 'center',
      getCellData: (row) => (
        <Switch
          checked={row.enabled}
          onChange={(e) => enableNumbers(!row.enabled, row.id)}
          focusVisibleClassName={classes.focusVisible}
          classes={{
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked
          }}
        />
      )
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

  const addPopoverItems = [
    {
      id: 1,
      label: t('1_ans_basic_number'),
      link: '/'
    },
    {
      id: 2,
      label: t('multiply_ans_basic_number'),
      link: '/'
    }
  ]

  const titleData = {
    mainText: t('basic_translations'),
    buttonBlock: (
      <Box className={classes.addCustomerWrap}>
        <Box onClick={handleClick} className={classes.addIconWrap}>
          <AddOutlinedIcon />
        </Box>
        <Box className={classes.addTitleWrap}>
          <Typography className={classes.addCustomerTitle}>
            {t('add')}
          </Typography>
          <ArrowDropUpOutlinedIcon className={classes.upArrowIcon} />
          <ArrowDropDownOutlinedIcon className={classes.downArrowIcon} />
        </Box>
        <Popover
          id={id}
          open={isAddPopoverOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <Box className={classes.addPopoverWrap}>
            {addPopoverItems.map((item) => (
              <MenuItem
                value={item.label}
                key={item.id}
                className={classes.addPopoverItem}
              >
                <Link to={item.link}>
                  <Typography className={classes.addPopoverItemText}>
                    {item.label}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Box>
        </Popover>
      </Box>
    )
  }

  const toolbarButtonsBlock = () => {
    return (
      <Fragment>
        {isAnyChecked && (
          <Box className={classes.toolbarButtonsBlockWrap}>
            <Box className={classes.addCustomerWrap}>
              <Box className={classes.addIconWrap}>
                <UpdateIcon />
              </Box>
              <Typography className={classes.addCustomerTitle}>
                {t('update')}
              </Typography>
            </Box>
            <Box className={classes.deleteBlockWrap}>
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
          </Box>
        )}
      </Fragment>
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
          searchCriterias={[
            'accessCountry',
            'destinationCountry',
            'accessCountryCode',
            'accessNumber',
            'destinationCountryCode',
            'destinationNumber'
          ]}
          extraToolbarBlock={toolbarButtonsBlock}
          getSearchList={setSearchList}
        />
        {/* {isAddPhoneNumbersModalOpen && (
          <AddPhoneNumbersModal
            open={isAddPhoneNumbersModalOpen}
            handleClose={handleAddModalClose}
          />
        )} */}
      </Paper>
    </div>
  )
})

export default withNamespaces()(Translations)
