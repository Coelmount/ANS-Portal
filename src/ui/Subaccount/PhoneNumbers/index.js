import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
// import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import PhoneNumbersStore from 'stores/PhoneNumbers'
import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTableBackendPagination'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import AddPhoneNumbersModal from './components/AddPhoneNumbersModal'
import FiltersModal from './components/FiltersModal'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'

import RightArrowIcon from 'source/images/svg/right-arrow.svg'
// import deleteIcon from 'source/images/svg/delete-icon.svg'
import filtersIcon from 'source/images/svg/filters.svg'
import useStyles from './styles'

const PhoneNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [searchList, setSearchList] = useState([])
  const [isAddPhoneNumbersModalOpen, setIsAddPhoneNumbersModalOpen] = useState(
    false
  )
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('phoneNumber')
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)

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

  const isSearchParamsActive =
    !!filterValues.type || !!filterValues.status || false

  // initial request
  useEffect(() => {
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      page,
      rowsPerPage,
      filterValues,
      orderBy,
      order
    )
  }, [
    page,
    rowsPerPage,
    match.customerId,
    match.groupId,
    getPhoneNumbers,
    filterValues.status,
    filterValues.type,
    filterValues.country.label,
    orderBy,
    order
  ])

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
    handleCheckedStates(searchList)
    setPhoneNumbers(searchList)
  }, [searchList, setPhoneNumbers])

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
    const newNumbers = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    selectAll ? setNumberOfChecked(0) : setNumberOfChecked(searchList.length)
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

  const handleAddModalClick = () => {
    setIsAddPhoneNumbersModalOpen(true)
  }

  const handleAddModalClose = () => {
    setIsAddPhoneNumbersModalOpen(false)
    setDefaultValues()
  }

  const changeHover = (newHover, id) => {
    const newNumbers = transformOnHover(numbers, newHover, id)
    setNumbers(newNumbers)
  }

  const handleFiltersButtonClick = () => {
    setIsFiltersModalOpen(true)
  }

  const handleFiltersModalClose = () => {
    setIsFiltersModalOpen(false)
    getPhoneNumbers(
      match.customerId,
      match.groupId,
      page,
      rowsPerPage,
      filterValues
    )
  }

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
              to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/translations/${row.phoneNumber}`}
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
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <Fragment>
          {row.status === 'free' && (
            <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
          )}
        </Fragment>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} handleOpen={handleAddModalClick} />
        </CustomContainer>
        {isPhoneNumbersLoading && !isSearchParamsActive ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={false}
            classes={classes}
            rows={numbers}
            columns={columns}
            searchCriterias={['countryName', 'phoneNumber', 'type', 'state']}
            extraToolbarBlock={toolbarButtonsBlock}
            getSearchList={setSearchList}
            page={page}
            setPage={setPage}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            totalPages={totalPages}
            isSearchParamsActive={isSearchParamsActive}
            isLoadingData={isPhoneNumbersLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
          />
        )}
        {isAddPhoneNumbersModalOpen && (
          <AddPhoneNumbersModal
            open={isAddPhoneNumbersModalOpen}
            handleClose={handleAddModalClose}
          />
        )}
        {isFiltersModalOpen && (
          <FiltersModal
            open={isFiltersModalOpen}
            handleClose={handleFiltersModalClose}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(PhoneNumbers)
