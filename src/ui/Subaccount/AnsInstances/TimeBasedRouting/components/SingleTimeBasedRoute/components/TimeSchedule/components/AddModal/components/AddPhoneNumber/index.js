import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react'
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
import SingleCheckCell from 'components/SingleCheckCell'
import { ADD_DESTINATION_DEFAULT_ID } from 'utils/types/addDestinationModalStepsId'

import useStyles from '../../styles'
import { toJS } from 'mobx'

const AddPhoneNumber = ({ handleClose, t }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const storageRowsPerPage = localStorage.rowsPerPageScheme
    ? JSON.parse(localStorage.getItem('rowsPerPageScheme'))
        .ans_tbr_add_phone_number_step
    : null

  const {
    getPhoneNumbers,
    postTimeSchedule,
    setStep,
    phoneNumbers,
    countries,
    totalPages,
    isPhoneNumbersLoading,
    isTimeScheduleAdding
  } = TimeSchedulesStore

  const isLoading = isPhoneNumbersLoading || isTimeScheduleAdding

  const localStore = useLocalStore(() => ({
    page: 1,
    rowsPerPage: storageRowsPerPage || DEFAULT_ROWS_PER_PAGE,
    order: 'asc',
    orderBy: 'id',
    countryCode: '',
    selectedCountry: {
      code: '',
      phone: '',
      label: ''
    },
    currentCheckedNumber: {
      id: null,
      destination: ''
    },
    setPage(value) {
      this.page = value
    },
    setRowsPerPage(value) {
      this.rowsPerPage = value
    },
    setCurrentCheckedNumber(value) {
      this.currentCheckedNumber = value
    },
    setOrder(value) {
      this.order = value
    },
    setOrderBy(value) {
      this.order = value
    },
    setCountryCode(value) {
      this.countryCode = value
    },
    setSelectedCountry(value) {
      this.selectedCountry = value
    }
  }))
  const {
    page,
    rowsPerPage,
    currentCheckedNumber,
    order,
    orderBy,
    countryCode,
    selectedCountry,
    setField,
    setPage,
    setRowsPerPage,
    setCurrentCheckedNumber,
    setOrder,
    setOrderBy,
    setCountryCode,
    setSelectedCountry
  } = localStore

  // Initial request
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
    getPhoneNumbers(payload)
  }

  useEffect(() => {
    getRequest()
  }, [])

  // On update search/sorting
  useEffect(() => {
    setPage(1)
    if (!isLoading) {
      getRequest()
    }
  }, [orderBy, order])

  // On update pagination
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
      getRequest(payload)
    }
  }, [page, rowsPerPage, selectedCountry])

  // Trigger store POST request
  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      destination: currentCheckedNumber.destination,
      closeModal: handleClose
    }
    postTimeSchedule(payload)
  }

  // Back to first step
  const handleBackButtonClick = () => {
    setStep(ADD_DESTINATION_DEFAULT_ID)
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox className={classes.headCheckbox} checked={false} disabled />
      ),
      isSortAvailable: false,
      getCellData: (row, i) => (
        <SingleCheckCell
          key={i}
          row={row}
          i={i}
          classes={classes}
          checked={i === currentCheckedNumber.id}
          setCurrentCheckedNumber={setCurrentCheckedNumber}
        />
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
    <Fragment>
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
            <CountryInput
              value={selectedCountry}
              setValue={setSelectedCountry}
              countries={countries}
              className={classes.countryInput}
            />
            <CustomTable
              firstCell={false}
              classes={classes}
              rows={phoneNumbers}
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
              tableId={'ans_tbr_add_phone_number_step'}
            />
          </DialogContent>
          <DialogActions className={classes.dialogActionsSecond}>
            <Button
              variant='outlined'
              color='primary'
              className={classes.backButton}
              onClick={handleBackButtonClick}
            >
              {t('back')}
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              onClick={handleAddButtonClick}
              disabled={!currentCheckedNumber.destination}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(AddPhoneNumber))
