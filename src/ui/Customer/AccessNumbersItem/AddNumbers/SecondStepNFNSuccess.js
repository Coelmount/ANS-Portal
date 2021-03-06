import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import sharp from 'source/images/svg/sharp.svg'
import CallOutlined from '@material-ui/icons/CallOutlined'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

import Input from 'components/Input'
import Select from 'components/Select'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import numbersStore from 'stores/Numbers'
import AccessNumbersStore from 'stores/AssignedNumbers'

import useStyles from './styles'
import Loading from 'components/Loading'

const FirstStepNFN = props => {
  const { handleClose, t, changeStep } = props
  const classes = useStyles()
  const match = useParams()
  const {
    availableNumbersTable,
    postAssignNumbersToCustomer,
    isAddingNumbers,
    clearNumbers
  } = numbersStore
  const { currentEntitlement } = AccessNumbersStore
  const [numbers, setNumbers] = useState(availableNumbersTable)
  const [selectAll, setSelectAll] = useState(false)
  const [countNumbers, setCountNumbers] = useState(0)

  const selectNumbers = (checked, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.rangeFrom === number)
    newNumbers[index].checked = checked
    if (checked) {
      setCountNumbers(countNumbers + newNumbers[index].length)
    } else {
      setCountNumbers(countNumbers - newNumbers[index].length)
    }
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setNumbers(newNumbers)
  }

  const handleSelectAll = () => {
    const newNumbers = numbers.map(el => ({
      ...el,
      checked: !selectAll,
      hover: false
    }))
    if (!selectAll) {
      let accumulator = 0
      numbers.forEach(el => {
        accumulator = accumulator + el.length
      })
      setCountNumbers(accumulator)
    } else {
      setCountNumbers(0)
    }
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
  }

  const changeHover = (newHover, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.rangeFrom === number)
    newNumbers[index].hover = newHover
    setNumbers(newNumbers)
  }

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectNumbers(!row.checked, row.rangeFrom)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.rangeFrom)}
            onMouseLeave={() => changeHover(false, row.rangeFrom)}
            onMouseEnter={() => changeHover(true, row.rangeFrom)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.rangeFrom)}
              />
            ) : (
              i + 1
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
      id: 'from',
      label: 'Range from',
      isSortAvailable: false,
      getCellData: row => row.rangeFrom,
      extraHeadProps: {
        className: classes.rangeFromTo
      }
    },
    {
      id: 'arrow',
      isSortAvailable: false,
      getCellData: row => <Typography>→</Typography>
    },
    {
      id: 'to',
      label: 'Range to',
      isSortAvailable: false,
      getCellData: row => `${row.rangeTo} (${row.length})`,
      extraHeadProps: {
        className: classes.rangeFromTo
      }
    },
    {
      id: 'type',
      label: 'Type',
      isSortAvailable: false,
      getCellData: row => row.type
    }
  ]

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('add_numbers_inv')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.stepStyles}>{'SEARCH RESULT'}</Box>
        <Box
          className={classes.thirdParagraphBox}
        >{`${currentEntitlement.name} (${currentEntitlement.country_code})`}</Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          showSearchBar={false}
          showToolBar={false}
          rows={numbers}
          noAvailableDataMessage={t('no_phone_numbers_available')}
          tableId={'second_step_nfn_success'}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={() => {
            changeStep(1)
            clearNumbers()
          }}
          disable={isAddingNumbers}
        >
          <ChevronLeft />
          {t('back')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          disable={isAddingNumbers}
          onClick={() =>
            postAssignNumbersToCustomer(match.customerId, changeStep, 3)
          }
        >
          {`${t('add')} (${countNumbers})`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStepNFN))
