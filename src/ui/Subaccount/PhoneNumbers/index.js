import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'

import { withStyles } from '@material-ui/core/styles'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import AssignedNumbersStore from 'stores/AssignedNumbers'
import TitleBlock from 'components/TitleBlock'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import FiltersModal from './components/FiltersModal'
import Loading from 'components/Loading'
import DeleteModal from 'components/DeleteModal'

import filtersIcon from 'source/images/svg/filters.svg'
import deassignIcon from 'source/images/svg/deassign.svg'
import useStyles from './styles'

const StyledTooltip = withStyles({
  tooltip: {
    textAlign: 'center'
  }
})(Tooltip)

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

  const [isDeassignModalOpen, setIsDeassignModalOpen] = useState(false)
  const [deassignMessageBlock, setDeassignMessageBlock] = useState(null)
  const [deassignMessage, setDeassignMessage] = useState('')
  const [deassignSubject, setDeassignSubject] = useState('')

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

  const {
    isDeassigningNumber,
    showErrorNotification,
    setNumbersToDeassign,
    deassignNumbersSubLvl
  } = AssignedNumbersStore

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

  const handleDeassignAll = () => {
    if (numbers.filter(el => el.status !== 'used').every(el => el.checked)) {
      const newNumbers = numbers.map(el => {
        if (el.status === 'used') {
          return el
        } else {
          return { ...el, checked: false }
        }
      })
      setNumbers(newNumbers)
    } else {
      const newNumbers = numbers.map(el => {
        if (el.status === 'used') {
          return el
        } else {
          return { ...el, checked: true }
        }
      })
      setNumbers(newNumbers)
    }
  }

  const singleDeassignSelect = row => {
    const newNumbers = numbers.map(el => {
      if (el.id === row.id) {
        return { ...el, checked: !row.checked }
      } else {
        return el
      }
    })
    setNumbers(newNumbers)
  }

  const createDeassignMessage = numbers => {
    const amountOfNumbers = numbers.length
    const deassignText =
      amountOfNumbers > 1
        ? t('phone_numbers').toLowerCase()
        : t('phone_number').toLowerCase()
    setDeassignSubject(deassignText)
    const totalMessage = `${amountOfNumbers} ${deassignText}:`
    setDeassignMessage(totalMessage)
  }

  const createDeassignMessageBlock = numbers => {
    const numbersArr = numbers.map(item => item.phoneNumber)
    const splitedNumbersStr = numbersArr.join(', ')
    const totalMessage = `${splitedNumbersStr} ?`
    const deassignMessageBlock = (
      <Box>
        <Typography className={classes.boldDeassignText}>
          {totalMessage}
        </Typography>
        <Typography>{t('deassign_message_end')}</Typography>
      </Box>
    )
    setDeassignMessageBlock(deassignMessageBlock)
  }

  const handleDeassignButtonClick = () => {
    if (numbers.filter(el => el.status !== 'used').some(el => el.checked)) {
      const selectedNumbers = numbers.filter(el => el.checked)
      setNumbersToDeassign(selectedNumbers)
      createDeassignMessage(selectedNumbers)
      createDeassignMessageBlock(selectedNumbers)
      setIsDeassignModalOpen(true)
    } else {
      showErrorNotification(t('no_numbers_selected_to_deassign'))
    }
  }

  const handleCloseDeassignModal = () => {
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
  }

  const handleDeassign = () => {
    const payload = {
      customerId: match.customerId,
      groupId: match.groupId,
      numbers: numbers.filter(el => el.checked),
      closeModal: () => setIsDeassignModalOpen(false),
      callback: handleCloseDeassignModal
    }
    deassignNumbersSubLvl(payload)
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
        <Box>
          <Box className={`${classes.buttonContainer} ${classes.deassignWrap}`}>
            <IconButton
              aria-label='deassign icon button'
              component='span'
              className={classnames(classes.mainIconWrap, {
                [classes.disabledButton]: !numbers
                  .filter(el => el.status !== 'used')
                  .some(el => el.checked)
              })}
              onClick={handleDeassignButtonClick}
            >
              <img
                className={classes.deassignIcon}
                src={deassignIcon}
                alt='deassign from subaccount'
              />
            </IconButton>
            <Typography
              className={classnames(classes.iconTitle, {
                [classes.disabledContent]: !numbers
                  .filter(el => el.status !== 'used')
                  .some(el => el.checked)
              })}
            >
              {t('deassign_from_subaccount')}
            </Typography>
          </Box>
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
    },
    {
      id: 'subaccount',
      label: '',
      headIcon: (
        <StyledTooltip title={t('deassign_all_tooltip')}>
          <IconButton
            aria-label='deassign icon button'
            component='span'
            className={classnames(classes.tableIconHeaderWrap, {
              [classes.btnBack]: numbers
                .filter(el => el.status !== 'used')
                .every(el => el.checked),
              [classes.enabledColumnButton]: numbers
                .filter(el => el.status !== 'used')
                .some(el => el.checked)
            })}
          >
            <img
              className={classes.deassignIcon}
              src={deassignIcon}
              alt='deassign'
            />
          </IconButton>
        </StyledTooltip>
      ),
      onIconClick: handleDeassignAll,
      getCellData: row => (
        <Box>
          <Fragment>
            {isDeassigningNumber && row.checked ? (
              <CircularProgress className={classes.deleteLoading} />
            ) : (
              <StyledTooltip
                title={
                  row.status === 'used'
                    ? t('not_available_to_deassign_tooltip')
                    : t('available_to_deassign_tooltip')
                }
              >
                <IconButton
                  aria-label='deassign icon button'
                  component='span'
                  className={classnames(classes.tableIconWrap, {
                    [classes.btnBack]: row.checked,
                    [classes.enabledColumnButton]: row.checked,
                    [classes.disabledTableIconWrap]: row.status === 'used'
                  })}
                  onClick={
                    row.status === 'used'
                      ? () => {}
                      : () => singleDeassignSelect(row)
                  }
                >
                  <img
                    className={classes.deassignIcon}
                    src={deassignIcon}
                    alt='deassign from subaccount'
                  />
                </IconButton>
              </StyledTooltip>
            )}
          </Fragment>
        </Box>
      )
    }
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
      {isDeassignModalOpen && (
        <DeleteModal
          classes={classes}
          open={isDeassignModalOpen}
          handleClose={handleCloseDeassignModal}
          handleDelete={handleDeassign}
          deleteSubject={deassignSubject}
          extraDeleteSubject={deassignMessage}
          action={t('to_deassign')}
          titleAction={t(`deassign`)}
          extraMessageBlock={deassignMessageBlock}
        />
      )}
    </div>
  )
})

export default withNamespaces()(PhoneNumbers)
