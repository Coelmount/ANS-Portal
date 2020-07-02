import React, { useState, useEffect, Fragment } from 'react'
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
  const classes = useStyles()
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

  // set numbers in local state from store
  useEffect(() => {
    setNumbers(availableNumbersForAddInstance)
  }, [availableNumbersForAddInstance])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
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

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.searchParamWrap}>
          <Select
            value={searchParam}
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
          <Typography className={classes.searchParamsTitle}>
            {t('search_param')}
          </Typography>
        </Box>
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
            {t('configure_now')}
          </Typography>
        </Box>
      </Box>
    )
  }

  const columns = [
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
            firstCell={true}
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
            placeholderText={t('search_available_numbers')}
            tableId={'ans_basic_available_numbers'}
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
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AvailableNumbers))
