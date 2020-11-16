import React, { useState, useEffect, useRef } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react-lite'
import { useDebounce } from 'use-debounce'
import { useParams } from 'react-router-dom'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Loading from 'components/Loading'
import types from 'utils/types/basicSearchParams'

import useStyles from './styles'

const { COUNTRY_CODE, NUMBER_LIKE, TYPE } = types

const ConfiguredNumbers = ({ t }) => {
  const searchParamsList = [COUNTRY_CODE, NUMBER_LIKE, TYPE]

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null

  const {
    getConfiguredNumbers,
    updateSearchParam,
    configuredNumbers,
    searchParam,
    totalPagesConfiguredNumbers,
    isConfiguredNumbersLoading
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

  const getRequest = () => {
    getConfiguredNumbers(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isConfiguredNumbersLoading) getRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNumberLike, orderBy, order, searchParam])

  // onUpdate pagination
  useEffect(() => {
    if (!isConfiguredNumbersLoading)
      getConfiguredNumbers(
        customerId,
        groupId,
        page,
        rowsPerPage,
        orderBy,
        order,
        debouncedNumberLike
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  // Listener of params selector width
  useEffect(() => {
    if (calcInput.current) {
      setWidthOffset(`${+calcInput.current.clientWidth + 15}px`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calcInput.current, searchParam])

  const changeSearchParam = value => {
    updateSearchParam(value)
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
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isConfiguredNumbersLoading && !numberLike ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={true}
            classes={classes}
            rows={configuredNumbers}
            columns={columns}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            totalPages={totalPagesConfiguredNumbers}
            query={numberLike}
            setQuery={setNumberLike}
            isSearchParamsActive={isSearchParamsActive}
            isLoadingData={isConfiguredNumbersLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            tableId={'ans_basic_available_numbers'}
            searchSelector={SearchSelector}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(ConfiguredNumbers))
