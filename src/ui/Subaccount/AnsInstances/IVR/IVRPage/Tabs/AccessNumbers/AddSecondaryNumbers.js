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
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import IVRStore from 'stores/IVR'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import CountryInput from 'components/CountryInput'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import useStyles from './styles'

const AddModal = props => {
  const { open, handleClose, t } = props
  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const {
    getAvailableNumbers,
    availableNumbers,
    totalPages,
    countries,
    isAvailableNumbersLoading,
    freeSecondaryIDs,
    putAddSecondaryNumbers,
    isAddingSecondaryNumbers
  } = IVRStore

  const [selectedCountry, setSelectedCountry] = useState({
    code: '',
    phone: '',
    label: ''
  })

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
  const [countryCode, setCountryCode] = useState('')

  useEffect(() => {
    let cc = ''
    if (!!selectedCountry) {
      cc = selectedCountry.phone
    }
    const payload = {
      customerId,
      groupId,
      page: 1,
      rowsPerPage,
      order,
      orderBy,
      countryCode: cc
    }
    getAvailableNumbers(payload)
  }, [])

  // set numbers in local state from store
  useEffect(() => {
    setNumbers(availableNumbers)
  }, [availableNumbers])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isAvailableNumbersLoading) {
      const payload = {
        customerId,
        groupId,
        page: 1,
        rowsPerPage,
        order,
        orderBy,
        countryCode: selectedCountry.phone
      }
      getAvailableNumbers(payload)
    }
  }, [orderBy, order])

  //  onUpdate pagination
  useEffect(() => {
    let cc = ''
    if (!!selectedCountry) {
      cc = selectedCountry.phone
    }
    if (!isAvailableNumbersLoading) {
      const payload = {
        customerId,
        groupId,
        page,
        rowsPerPage,
        order,
        orderBy,
        countryCode: cc
      }
      getAvailableNumbers(payload)
      setNumberOfChecked(0)
    }
  }, [page, rowsPerPage])

  // onUpdate country input
  useEffect(() => {
    let cc = ''
    if (!!selectedCountry) {
      cc = selectedCountry.phone
    }
    if (!isAvailableNumbersLoading) {
      const payload = {
        customerId,
        groupId,
        page,
        rowsPerPage,
        order,
        orderBy,
        countryCode: cc
      }
      getAvailableNumbers(payload)
      setNumberOfChecked(0)
    }
  }, [selectedCountry])

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
      return { ...item, checked: !selectAll, hover: false }
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

  const handleAddNumbers = () => {
    const selectedNumbers = numbers.filter(el => el.checked)
    let index = 0
    let data = []
    selectedNumbers.forEach(el => {
      data.push({
        id: freeSecondaryIDs[index],
        cc_number: el.country_code,
        number: el.nsn
      })
      index++
    })
    putAddSecondaryNumbers(
      match.customerId,
      match.groupId,
      match.ivrId,
      data,
      handleClose
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
    <Dialog open={open} onClose={handleClose} className={classes.rootSN}>
      {isAvailableNumbersLoading || isAddingSecondaryNumbers ? (
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
              isLoadingData={isAvailableNumbersLoading}
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
              className={classes.cancelButton}
              onClick={handleClose}
              disabled={isAddingSecondaryNumbers}
            >
              {t('cancel')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.assignButton}
              onClick={handleAddNumbers}
              disabled={
                !numbers.some(item => item.checked === true) ||
                numberOfChecked > freeSecondaryIDs.length ||
                isAddingSecondaryNumbers
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
