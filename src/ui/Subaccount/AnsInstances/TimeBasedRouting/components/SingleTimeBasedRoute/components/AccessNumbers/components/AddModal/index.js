import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import AccessNumbersStore from 'stores/TimeBasedRouting/AccessNumbers'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import CountryInput from 'components/CountryInput'
import ModalHelperText from 'components/ModalHelperText'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import useStyles from './styles'

const AddModal = ({ open, handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, tbrName } = match

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null

  const {
    getAvailableNumbers,
    postSecondaryNumbers,
    availableNumbers,
    secondaryNumbers,
    totalPages,
    countries,
    isAvailableNumbersLoading,
    isSecondaryNumbersAdding
  } = AccessNumbersStore

  const isLoading = isAvailableNumbersLoading || isSecondaryNumbersAdding

  const [selectedCountry, setSelectedCountry] = useState({
    code: '',
    phone: '',
    label: ''
  })

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [numberOfChecked, setNumberOfChecked] = useState(0)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(
    storageRowsPerPage || DEFAULT_ROWS_PER_PAGE
  )
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')

  const getRequest = () => {
    const payload = {
      customerId,
      groupId,
      page: 1,
      rowsPerPage,
      order,
      orderBy,
      countryCode: selectedCountry ? selectedCountry.phone : ''
    }
    getAvailableNumbers(payload)
  }

  useEffect(() => {
    getRequest()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // set numbers in local state from store
  useEffect(() => {
    setNumbers(availableNumbers)
  }, [availableNumbers])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isLoading) {
      getRequest()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderBy, order])

  //  onUpdate pagination
  useEffect(() => {
    if (!isLoading) {
      const payload = {
        customerId,
        groupId,
        page,
        rowsPerPage,
        order,
        orderBy,
        countryCode: selectedCountry ? selectedCountry.phone : ''
      }
      getAvailableNumbers(payload)
      setNumberOfChecked(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage, selectedCountry])

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
    const newNumbers = transformOnCheckAll(numbers, numbers, selectAll)
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

  // trigger store POST request
  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      tbrId: tbrName,
      closeModal: handleClose,
      numbers
    }
    postSecondaryNumbers(payload)
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
            onChange={() => selectNumbers(!row.checked, row.id)}
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
      extraProps: {
        className: classes.checkboxCell
      },
      extraHeadProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'phoneNumber',
      label: 'number'
    },
    {
      id: 'type',
      label: 'type'
    }
  ]

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('add_access_number')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.entitlementsDialogContent}>
            <ModalHelperText helperText='add_access_number_single_tbr' />
            <Typography className={classes.setEntitlementsTitle}>
              {t('select_access_number')}
            </Typography>

            <CountryInput
              value={selectedCountry}
              setValue={setSelectedCountry}
              countries={countries}
              className={classes.countryInput}
            />
            <CustomTable
              firstCell={false}
              classes={classes}
              rows={numbers}
              columns={columns}
              page={page}
              setPage={setPage}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              totalPages={totalPages}
              isLoadingData={isLoading}
              noAvailableDataMessage={t('no_phone_numbers_available')}
              showSearchBar={false}
              isModal={true}
              tableId={'ans_advanced_add_select_access_numbers'}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleClose}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={handleAddButtonClick}
              disabled={
                numberOfChecked < 1 ||
                secondaryNumbers.length + numberOfChecked > 10
              }
            >
              {`${t('Add')}${
                numberOfChecked > 0 ? `(${numberOfChecked})` : ''
              }`}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
