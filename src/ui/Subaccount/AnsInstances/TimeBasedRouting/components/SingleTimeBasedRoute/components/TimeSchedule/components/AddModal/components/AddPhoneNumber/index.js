import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useDebounce } from 'use-debounce'
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

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import CustomTable, {
  DEFAULT_ROWS_PER_PAGE
} from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import CountryInput from 'components/CountryInput'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import useStyles from '../../styles'
import { toJS } from 'mobx'

const AddPhoneNumber = ({ open, handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .basic_instance_select_access_numbers
    : null

  const {
    getPhoneNumbers,
    postSecondaryNumbers,
    availableNumbers,
    secondaryNumbers,
    totalPages,
    countries,
    isAvailableNumbersLoading,
    isSecondaryNumbersAdding
  } = TimeSchedulesStore

  const isLoading = isAvailableNumbersLoading || isSecondaryNumbersAdding

  const [selectedCountry, setSelectedCountry] = useState({
    code: '',
    phone: '',
    label: ''
  })

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

  // Initial request
  const getRequest = () => {
    const payload = {
      customerId,
      groupId,
      page: 1,
      rowsPerPage,
      order,
      orderBy,
      countryCode: selectedCountry.phone
    }
    getPhoneNumbers(payload)
  }

  useEffect(() => {
    getRequest()
  }, [])

  // onUpdate search/sorting
  useEffect(() => {
    setPage(1)
    if (!isLoading) {
      getRequest()
    }
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
        countryCode: selectedCountry.phone
      }
      getRequest(payload)
    }
  }, [page, rowsPerPage, selectedCountry])

  // trigger store POST request
  const handleAddButtonClick = () => {
    console.log('add')
    // const payload = {
    //   customerId,
    //   groupId,
    //   closeModal: handleClose,
    //   numbers
    // }
    // postSecondaryNumbers(payload)
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          className={classes.headCheckbox}
          checked={selectAll}
          // onChange={handleSelectAll}
        />
      ),
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            // onChange={() => selectNumbers(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            // onClick={() => selectNumbers(!row.checked, row.id)}
            // onMouseLeave={() => changeHover(false, row.id)}
            // onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                // onChange={() => selectNumbers(true, row.id)}
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
              // disabled={}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(AddPhoneNumber))
