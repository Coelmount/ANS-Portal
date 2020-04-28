import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
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
import AddInstance from './components/AddInstance'

import BasicTranslationsStore from 'stores/BasicTranslations'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'

const Translations = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)

  const [isAddInstanceModalOpen, setIsAddInstanceModalOpen] = useState(false)

  const isAddPopoverOpen = Boolean(anchorEl)
  const id = isAddPopoverOpen ? 'simple-popover' : undefined

  const {
    setDefaultValues,
    updateSelectedInstance,
    basicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    getBasicTranslationsNumbers,
    getCountriesConfig,
    setNumbersWithConfig
  } = BasicTranslationsStore

  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
  }, [])

  useEffect(() => {
    setNumbers(basicTranslationsNumbers)
  }, [basicTranslationsNumbers])

  useEffect(() => {
    handleCheckedStates(searchList)
    // setPhoneNumbers(searchList)
  }, [searchList])

  const handleAddInstanceModalOpen = () => {
    setIsAddInstanceModalOpen(true)
  }

  const handleAddInstanceModalClose = () => {
    setIsAddInstanceModalOpen(false)
    setDefaultValues()
  }

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleMenuItemClick = id => {
    if (id === 1) handleAddInstanceModalOpen()
  }

  const selectNumbers = (checked, id) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.id === id)
    newNumbers[index].checked = checked
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const enableNumbers = (enabled, id) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.id === id)
    newNumbers[index].enabled = enabled
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map(item => item.id)
    const newNumbers = numbers.map(el => {
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

  const changeHover = (newHover, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.id === number)
    newNumbers[index].hover = newHover
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
      id: 'access_number',
      label: 'access_number',
      isSortAvailable: false,
      getCellData: row => (
        <Box>
          <Link
            onClick={() => updateSelectedInstance(row)}
            to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/translations/${row.access_number}`}
            className={classes.link}
          >
            {row.access_number}
          </Link>
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
      getCellData: row => (
        <img
          src={RightArrowIcon}
          className={classes.rightArrowIcon}
          alt='right icon'
        />
      )
    },
    {
      id: 'destination_number',
      label: 'destination_number',
      isSortAvailable: false,
      getCellData: row => (
        <Box>
          <Typography className={classes.destinationNumberText}>
            {row.destination_number}
          </Typography>
          <Typography>{row.destinationCountry}</Typography>
        </Box>
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
        <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
      )
    }
  ]

  const addPopoverItems = [
    {
      id: 1,
      label: t('1_ans_basic_number')
    },
    {
      id: 2,
      label: t('multiply_ans_basic_number')
    }
  ]

  const titleData = {
    mainText: t('basic_translations'),
    buttonBlock: (
      <Box className={classes.addCustomerWrap}>
        <Box onClick={handlePopoverOpen} className={classes.addIconWrap}>
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
          onClose={handlePopoverClose}
        >
          <Box className={classes.addPopoverWrap}>
            {addPopoverItems.map(item => (
              <MenuItem
                onClick={() => handleMenuItemClick(item.id)}
                value={item.label}
                key={item.id}
                className={classes.addPopoverItem}
              >
                <Typography className={classes.addPopoverItemText}>
                  {item.label}
                </Typography>
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
          <TitleBlock titleData={titleData} />
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
            'accessNumber',
            'destinationNumber'
          ]}
          extraToolbarBlock={toolbarButtonsBlock}
          getSearchList={setSearchList}
        />
        {isAddInstanceModalOpen && (
          <AddInstance
            open={isAddInstanceModalOpen}
            handleClose={handleAddInstanceModalClose}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(Translations)
