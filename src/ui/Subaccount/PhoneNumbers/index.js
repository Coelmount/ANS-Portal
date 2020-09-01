import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import TitleBlock from 'components/TitleBlock'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import FiltersModal from './components/FiltersModal'
import Loading from 'components/Loading'

import filtersIcon from 'source/images/svg/filters.svg'
import useStyles from './styles'

const PhoneNumbers = observer(({ t }) => {
  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .subaccount_phone_numbers
    : null

  const classes = useStyles()
  const match = useParams()
  const [numbers, setNumbers] = useState([])
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(
    storageRowsPerPage || DEFAULT_ROWS_PER_PAGE
  )
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [numberLike, setNumberLike] = useState('')
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const debouncedNumberLike = useDebounce(numberLike, 1000)[0]

  const {
    transformedPhoneNumbers,
    setPhoneNumbers,
    setDefaultValues,
    getPhoneNumbers,
    totalPages,
    isPhoneNumbersLoading,
    filterValues,
    deleteSearchParam
  } = PhoneNumbersStore

  // Filter or search params ? TRUE : FALSE
  const isSearchParamsActive =
    !!filterValues.type ||
    !!filterValues.status ||
    !!filterValues.country.label ||
    !!debouncedNumberLike ||
    false

  // initial request
  useEffect(() => {
    setPage(1)
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      1,
      rowsPerPage,
      filterValues,
      orderBy,
      order,
      debouncedNumberLike
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    match.customerId,
    match.groupId,
    filterValues.status,
    filterValues.type,
    filterValues.country.label,
    orderBy,
    order,
    debouncedNumberLike
  ])

  // request on pagination change
  useEffect(() => {
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      page,
      rowsPerPage,
      filterValues,
      orderBy,
      order,
      debouncedNumberLike
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  // Unmount clear
  useEffect(() => {
    return () => {
      setDefaultValues()
    }
  }, [setDefaultValues])

  // set in component after store transformation
  useEffect(() => {
    setNumbers(transformedPhoneNumbers)
  }, [transformedPhoneNumbers])

  // handle search
  useEffect(() => {
    setPhoneNumbers(numbers)
  }, [numbers, setPhoneNumbers])

  // Filters open
  const handleFiltersButtonClick = () => {
    setIsFiltersModalOpen(true)
  }

  // Filters close
  const handleFiltersModalClose = () => {
    setIsFiltersModalOpen(false)
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      page,
      rowsPerPage,
      filterValues,
      orderBy,
      order,
      numberLike,
      debouncedNumberLike
    )
  }

  // Filters param chip remove
  const handleDeleteSeachParam = field => {
    deleteSearchParam(field)
  }

  const titleData = {
    mainText: t('phone_numbers')
  }

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.filterChipsWrap}>
          {filterValues.type && (
            <Chip
              label={filterValues.type}
              onDelete={() => handleDeleteSeachParam('type')}
              color='primary'
            />
          )}
          {filterValues.status && (
            <Chip
              label={filterValues.status}
              onDelete={() => handleDeleteSeachParam('status')}
              color='primary'
            />
          )}
          {filterValues.country && (
            <Chip
              label={filterValues.country.label}
              onDelete={() => handleDeleteSeachParam('country')}
              color='primary'
            />
          )}
        </Box>

        <Box className={classes.addCustomerWrap}>
          <Box
            onClick={handleFiltersButtonClick}
            className={classes.addIconWrap}
          >
            <img
              className={classes.deleteIcon}
              src={filtersIcon}
              alt='filters'
            />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('filters')}
          </Typography>
        </Box>
      </Box>
    )
  }

  const columns = [
    {
      id: 'countryName',
      label: 'country',
      extraProps: {
        className: classes.countryNameColumn
      }
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
        <Fragment>
          {row.status !== 'free' ? (
            <Link
              to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/${row.phoneNumber}`}
            >
              <Typography className={classes.assignedTitle}>
                {t(row.status)}
              </Typography>
            </Link>
          ) : (
            <Typography className={classes.availableTitle}>
              {t(row.status)}
            </Typography>
          )}
        </Fragment>
      )
    },
    {
      id: 'service_capabilities',
      label: 'service_capabilities',
      getCellData: row => (
        <Fragment>{t(row.service_capabilities).toLowerCase()}</Fragment>
      )
    }
    // {
    //   id: 'delete',
    //   extraProps: {
    //     className: classes.deleteCell,
    //     align: 'right'
    //   },
    //   isSortAvailable: false,
    //   getCellData: row => (
    //     <Fragment>
    //       {row.status === 'free' && (
    //         <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
    //       )}
    //     </Fragment>
    //   )
    // }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} />
        </CustomContainer>
        {isPhoneNumbersLoading && !isSearchParamsActive && !numberLike ? (
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
            totalPages={totalPages}
            query={numberLike}
            setQuery={setNumberLike}
            isSearchParamsActive={isSearchParamsActive}
            isLoadingData={isPhoneNumbersLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            placeholderText={t('search_by_phone_number')}
            tableId={'subaccount_phone_numbers'}
          />
        )}
        {isFiltersModalOpen && (
          <FiltersModal
            open={isFiltersModalOpen}
            handleClose={handleFiltersModalClose}
            setPage={setPage}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(PhoneNumbers)
