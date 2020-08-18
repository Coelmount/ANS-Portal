import React, { useState, useEffect, Fragment, useRef } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useDebounce } from 'use-debounce'
import { useParams } from 'react-router-dom'
import classnames from 'classnames'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import AddInstance from '../AddInstance'
import AddMultipleNumbers from '../MultipleANSBasicNumber'
import usePreviousValue from 'utils/hooks/usePreviousValue'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import types from 'utils/types/basicSearchParams'

import useStyles from './styles'

const { COUNTRY_CODE, NUMBER_LIKE, TYPE } = types

const AvailableNumbers = ({ t }) => {
  const searchParamsList = [COUNTRY_CODE, NUMBER_LIKE, TYPE]

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null
  const [widthOffset, setWidthOffset] = useState('153px')
  const calcInput = useRef(null)
  const classes = useStyles({ widthOffset })
  const match = useParams()

  const {
    step,
    changeStep,
    updateSelectedPhoneNumber,
    getAvailableNumbersForAddInstance,
    totalPagesAvailableNumbers,
    isAvailableNumbersForAddInstanceLoading,
    availableNumbersForAddInstance,
    searchParam,
    updateSearchParam
  } = BasicTranslationsStore

  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [selectAll, setSelectAll] = useState(false)
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(
    storageRowsPerPage || DEFAULT_ROWS_PER_PAGE
  )
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [numberLike, setNumberLike] = useState('')
  const [isAddInstanceModalOpen, setIsAddInstanceModalOpen] = useState(false)
  const [showAddMultipleANSNumbers, setShowAddMultipleANSNumbers] = useState(
    false
  )
  const debouncedNumberLike = useDebounce(numberLike, 1000)[0]

  // Search params ? TRUE : FALSE
  const isSearchParamsActive = !!debouncedNumberLike || false

  useEffect(() => {
    getAvailableNumbersForAddInstance(
      match.customerId,
      match.groupId,
      1,
      rowsPerPage,
      orderBy,
      order,
      debouncedNumberLike
    )
  }, [])

  // set numbers in local state from store
  useEffect(() => {
    setNumbers(availableNumbersForAddInstance)
  }, [availableNumbersForAddInstance])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isAvailableNumbersForAddInstanceLoading)
      getAvailableNumbersForAddInstance(
        match.customerId,
        match.groupId,
        1,
        rowsPerPage,
        orderBy,
        order,
        debouncedNumberLike
      )
  }, [debouncedNumberLike, orderBy, order, searchParam])

  // onUpdate pagination
  useEffect(() => {
    if (!isAvailableNumbersForAddInstanceLoading)
      getAvailableNumbersForAddInstance(
        match.customerId,
        match.groupId,
        page,
        rowsPerPage,
        orderBy,
        order,
        debouncedNumberLike
      )
  }, [page, rowsPerPage])

  // Listener of params selector width
  useEffect(() => {
    if (calcInput.current) {
      setWidthOffset(`${+calcInput.current.clientWidth + 15}px`)
    }
  }, [calcInput.current, searchParam])

  const handleSingleConfigure = row => {
    const { country_code, nsn } = row
    const payload = {
      country_code,
      nsn
    }
    updateSelectedPhoneNumber(payload)
    changeStep(1)
    setIsAddInstanceModalOpen(true)
  }

  const handleAddInstanceModalClose = () => {
    setIsAddInstanceModalOpen(false)
    // setDefaultValues()
    getAvailableNumbersForAddInstance(
      match.customerId,
      match.groupId,
      1,
      rowsPerPage,
      orderBy,
      order,
      debouncedNumberLike
    )
  }

  const handleMultipleConfigure = () => {
    setShowAddMultipleANSNumbers(true)
  }

  const handleMultipleConfigureClose = () => {
    setShowAddMultipleANSNumbers(false)
    getAvailableNumbersForAddInstance(
      match.customerId,
      match.groupId,
      1,
      rowsPerPage,
      orderBy,
      order,
      debouncedNumberLike
    )
  }

  const changeSearchParam = value => {
    updateSearchParam(value)
  }

  // handle check/uncheck
  const selectNumbers = (checked, id) => {
    const newNumbers = transformOnChange(numbers, checked, id)
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
    checked
      ? setNumberOfChecked(numberOfChecked + 1)
      : setNumberOfChecked(numberOfChecked - 1)
  }

  // handle check all
  const handleSelectAll = () => {
    const newNumbers = numbers.map(item => {
      return { ...item, checked: !selectAll }
    })
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    selectAll ? setNumberOfChecked(0) : setNumberOfChecked(numbers.length)
  }

  // handler of check states schema
  const handleCheckedStates = newNumbers => {
    if (
      newNumbers.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    if (!newNumbers.length) {
      setSelectAll(false)
    }
  }

  // handle hovers
  const changeHover = (newHover, id) => {
    const newNumbers = transformOnHover(numbers, newHover, id)
    setNumbers(newNumbers)
  }

  const SearchSelector = (
    <Select
      value={searchParam}
      ref={calcInput}
      onChange={e => changeSearchParam(e.target.value)}
      IconComponent={ArrowDropDownIcon}
      className={classes.searchParamSelect}
    >
      {searchParamsList.map(paramItem => (
        <MenuItem
          value={paramItem}
          key={`${paramItem}`}
          className={classes.selectItem}
        >
          {t(paramItem).toLowerCase()}
        </MenuItem>
      ))}
    </Select>
  )

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.toolbarConfigureWrap}>
          <IconButton
            aria-label='assign icon button'
            component='span'
            className={classes.mainIconWrap}
            onClick={handleMultipleConfigure}
          >
            <AddOutlinedIcon />
          </IconButton>
          <Typography className={classes.iconTitle}>
            {t('bulk_import')}
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
              (page - 1) * rowsPerPage + i + 1
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
      id: 'country',
      label: 'country'
    },
    {
      id: 'phoneNumber',
      label: 'Phonenumber'
    },
    {
      id: 'type',
      label: 'type'
    },
    {
      id: 'status',
      label: 'status',
      extraProps: {
        className: classes.statusCell
      },
      getCellData: row => (
        <Typography className={classes.availableTitle}>
          {t(row.status)}
        </Typography>
      )
    },
    {
      id: 'service_capabilities',
      label: 'service_capabilities'
    },
    {
      id: 'configure',
      extraProps: {
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleSingleConfigure(row)}
          className={classes.configureButton}
        >
          {t('configure_now')}
        </Button>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isAvailableNumbersForAddInstanceLoading && !numberLike ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={false}
            classes={classes}
            rows={numbers}
            columns={columns}
            extraToolbarBlock={toolbarButtonsBlock}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            totalPages={totalPagesAvailableNumbers}
            query={numberLike}
            setQuery={setNumberLike}
            isSearchParamsActive={isSearchParamsActive}
            isLoadingData={isAvailableNumbersForAddInstanceLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            tableId={'ans_basic_available_numbers'}
            searchSelector={SearchSelector}
          />
        )}
        {isAddInstanceModalOpen && (
          <AddInstance
            open={isAddInstanceModalOpen}
            handleClose={handleAddInstanceModalClose}
          />
        )}
        {showAddMultipleANSNumbers && (
          <AddMultipleNumbers
            open={showAddMultipleANSNumbers}
            handleClose={handleMultipleConfigureClose}
            numbers={numbers}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AvailableNumbers))
