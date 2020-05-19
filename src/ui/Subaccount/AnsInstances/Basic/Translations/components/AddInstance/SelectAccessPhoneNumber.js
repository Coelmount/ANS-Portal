import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useDebounce } from 'use-debounce'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable from 'components/CustomTableBackendPagination'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import usePreviousValue from 'utils/hooks/usePreviousValue'

import useStyles from './styles'

const SelectAccessPhoneNumber = ({ handleClose, t }) => {
  const classes = useStyles()
  const match = useParams()

  const {
    step,
    changeStep,
    updateSelectedPhoneNumber,
    getAvailableNumbersForAddInstance,
    totalPagesAvailableNumbers,
    isAvailableNumbersForAddInstanceLoading,
    availableNumbersForAddInstance
  } = BasicTranslationsStore

  const [numbers, setNumbers] = useState([])
  const [selectedNumber, setSelectedNumber] = useState(null)
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [numberLike, setNumberLike] = useState('')
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false)
  const debouncedNumberLike = useDebounce(numberLike, 1000)[0]

  const prevDebouncedNumberLike = usePreviousValue(debouncedNumberLike)
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
  }, [debouncedNumberLike, orderBy, order])

  // onUpdate pagination
  useEffect(() => {
    getAvailableNumbersForAddInstance(
      match.customerId,
      match.groupId,
      page,
      rowsPerPage,
      orderBy,
      order,
      debouncedNumberLike,
      getAvailableNumbersForAddInstance
    )
  }, [page, rowsPerPage])

  // set/remove checked in state
  const selectInstance = (checked, id) => {
    const newSelected = numbers.map(item => {
      let result = {}
      if (item.id === id) {
        result = {
          ...item,
          checked: checked,
          hover: false
        }
        setSelectedNumber(result)
      } else {
        result = {
          ...item,
          checked: false,
          hover: false
        }
      }
      return result
    })
    setNumbers(newSelected)
  }

  const changeHover = (newHover, id) => {
    const newSelected = [...numbers]
    const index = numbers.findIndex(el => el.id === id)
    newSelected[index].hover = newHover
    setNumbers(newSelected)
  }

  // Next step
  const handleNextButtonClick = () => {
    updateSelectedPhoneNumber(selectedNumber)
    changeStep(2)
  }

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={false} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectInstance(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectInstance(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectInstance(true, row.id)}
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
    <Fragment>
      <DialogTitle className={classes.title}>
        {t('add_ans_basic_instance')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.subtitle}>
          <Typography className={classes.stepStyles}>{`${t(
            'step'
          )} 1/2`}</Typography>
          <Typography className={classes.setEntitlementsTitle}>
            {t('select_access_ph_num')}
          </Typography>
        </Box>

        {isAvailableNumbersForAddInstanceLoading &&
        !isSearchParamsActive &&
        !numberLike ? (
          <Loading />
        ) : (
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
            totalPages={totalPagesAvailableNumbers}
            query={numberLike}
            setQuery={setNumberLike}
            isSearchParamsActive={isSearchParamsActive}
            isLoadingData={isAvailableNumbersForAddInstanceLoading}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            isModal={true}
          />
        )}
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
          onClick={handleNextButtonClick}
          disabled={!numbers.some(item => item.checked === true)}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(SelectAccessPhoneNumber))
