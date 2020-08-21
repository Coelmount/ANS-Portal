import React, { useState, useEffect, Fragment, useRef } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
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

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import AddModal from '../AddModal'
import usePreviousValue from 'utils/hooks/usePreviousValue'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import types from 'utils/types/basicSearchParams'

import useStyles from './styles'

const { COUNTRY_CODE, NUMBER_LIKE, TYPE } = types
const addModalId = 1
const deleteModalId = 2

const AvailableNumbers = ({ t }) => {
  const searchParamsList = [COUNTRY_CODE, NUMBER_LIKE, TYPE]

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null

  const {
    getAvailableNumbers,
    updateSearchParam,
    availableNumbers,
    searchParam,
    totalPagesAvailableNumbers,
    isAvailableNumbersLoading,
    setNumberToConfigure
  } = TimeBaseRoutingStore

  const [widthOffset, setWidthOffset] = useState('153px')
  const calcInput = useRef(null)
  const classes = useStyles({ widthOffset })
  const { customerId, groupId } = useParams()

  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(
    storageRowsPerPage || DEFAULT_ROWS_PER_PAGE
  )
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [numberLike, setNumberLike] = useState('')
  const debouncedNumberLike = useDebounce(numberLike, 1000)[0]

  // Search params ? TRUE : FALSE
  const isSearchParamsActive = !!debouncedNumberLike || false

  const modalsStore = useLocalStore(() => ({
    openedId: null,
    open(modalId) {
      this.openedId = modalId
    },
    close() {
      this.openedId = null
      getRequest()
    }
  }))

  const getRequest = () => {
    getAvailableNumbers(
      customerId,
      groupId,
      1,
      rowsPerPage,
      orderBy,
      order,
      debouncedNumberLike
    )
  }

  useEffect(() => {
    getRequest()
  }, [])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isAvailableNumbersLoading) getRequest()
  }, [debouncedNumberLike, orderBy, order, searchParam])

  // onUpdate pagination
  useEffect(() => {
    if (!isAvailableNumbersLoading)
      getAvailableNumbers(
        customerId,
        groupId,
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

  const changeSearchParam = value => {
    updateSearchParam(value)
  }

  const handleSingleConfigureClick = number => {
    setNumberToConfigure(number)
    modalsStore.open(addModalId)
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

  const columns = [
    {
      id: 'country',
      label: 'country'
    },
    {
      id: 'phoneNumber',
      label: 'phone_number'
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
          onClick={() => handleSingleConfigureClick(row.phoneNumber)}
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
        {isAvailableNumbersLoading && !numberLike ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={true}
            classes={classes}
            rows={availableNumbers}
            columns={columns}
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
            isLoadingData={isAvailableNumbersLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            tableId={'ans_basic_available_numbers'}
            searchSelector={SearchSelector}
          />
        )}
        {modalsStore.openedId === addModalId && (
          <AddModal
            open={modalsStore.openedId === addModalId}
            handleClose={modalsStore.close}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AvailableNumbers))
