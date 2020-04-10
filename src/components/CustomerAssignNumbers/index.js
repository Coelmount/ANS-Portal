import React, { useContext, useState, useEffect } from 'react'
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

import Input from 'components/Input'
import Select from 'components/Select'
import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'

import Group3Person from 'source/images/svg/Group3Person.svg'

import SubaccountsStore from 'stores/Subaccounts'
import NumbersStore from 'stores/Numbers'

import capitalize from 'lodash/capitalize'

import useStyles from './styles'

const NUMBERS = [
  {
    id: 1,
    number: '+27 540310011',
    type: 'local',
    country: 'South Africa',
    checked: false,
    hover: false
  },
  {
    id: 2,
    number: '+27 540300012',
    type: 'local',
    country: 'South Africa',
    checked: false,
    hover: false
  },
  {
    id: 3,
    number: '+27 540310013',
    type: 'local',
    country: 'Uganda',
    checked: false,
    hover: false
  },
  {
    id: 4,
    number: '+27 540300014',
    type: 'not-local',
    country: 'South Africa',
    checked: false,
    hover: false
  },
  {
    id: 5,
    number: '+27 540300015',
    type: 'local',
    country: 'South Africa',
    checked: false,
    hover: false
  },
  {
    id: 6,
    number: '+27 540300016',
    type: 'local',
    country: 'South Africa',
    checked: false,
    hover: false
  }
]

const AssignNumbers = props => {
  const { t } = props
  const [numbers, setNumbers] = useState(NUMBERS)
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [searchList, setSearchList] = useState([])
  const classes = useStyles()
  const match = useParams()
  const { getSubaccounts, selectGroups, isLoadingSubaccounts } = useContext(
    SubaccountsStore
  )
  const { isLoadingNumbers, getAvailableNumbers } = NumbersStore

  useEffect(() => {
    getSubaccounts(match.customerId)
    getAvailableNumbers()
  }, [])

  useEffect(() => {
    handleCheckedStates(searchList)
    //setPhoneNumbers(searchList)
  }, [searchList])

  const selectNumbers = (checked, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.number === number)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setNumbers(newNumbers)
  }

  const handleCheckedStates = newNumbers => {
    if (
      newNumbers.every(el => {
        return el.checked
      })
    ) {
      setSelectAll(true)
      setIsAnyChecked(true)
    } else {
      setSelectAll(false)
      if (newNumbers.some(el => el.checked)) {
        setIsAnyChecked(true)
      } else {
        setIsAnyChecked(false)
      }
    }
    if (!newNumbers.length) {
      setSelectAll(false)
      setIsAnyChecked(false)
    }
  }

  const handleSelectAll = () => {
    const searchListId = searchList.map(item => item.number)
    const newNumbers = numbers.map(el => {
      let result = {}
      if (searchListId.includes(el.number)) {
        result = {
          ...el,
          checked: !selectAll,
          hover: false
        }
      } else {
        result = { ...el }
      }
      return result
    })
    console.log(newNumbers)
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
  }

  const changeHover = (newHover, number) => {
    const newNumbers = [...numbers]
    const index = numbers.findIndex(el => el.number === number)
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
            onChange={() => selectNumbers(!row.checked, row.number)}
          />
        ) : (
          <div
            className={classes.cursorPointer}
            onClick={() => selectNumbers(!row.checked, row.number)}
            onMouseLeave={() => changeHover(false, row.number)}
            onMouseEnter={() => changeHover(true, row.number)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.number)}
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
      id: 'number',
      label: 'number',
      isSortAvailable: false,
      getCellData: row => row.number,
      extraProps: {
        className: classes.textLeft
      }
    },
    {
      id: 'type',
      label: 'type',
      isSortAvailable: false,
      getCellData: row => <Typography>{row.type}</Typography>,
      extraHeadProps: {
        className: classes.totalHeader
      },
      extraProps: {
        className: classes.textCenter
      }
    },
    {
      id: 'country',
      label: 'country',
      isSortAvailable: false,
      getCellData: row => <Typography>{row.country}</Typography>
    }
  ]

  if (isLoadingSubaccounts || isLoadingNumbers) {
    return (
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        className={classes.modalDialog}
      >
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      className={classes.modalDialog}
    >
      <DialogTitle className={classes.title}>
        {t('assign_numbers_subaccounts')}
        <IconButton
          aria-label='close'
          onClick={props.handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.paragraphBox}>
          <div>{t('select_subaccount')}</div>
          <Box>
            <Select
              label={capitalize(t('subaccount'))}
              icon={<img src={Group3Person} alt='Group3Person' />}
              selectStyles={classes.select}
              wrapperStyles={classes.wrapper}
              options={selectGroups}
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.secondParagraphBox}>
          {t('select_access_ph_num')}
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          rows={numbers}
          searchCriterias={['number', 'type', 'country']}
          getSearchList={setSearchList}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={props.handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={props.handleClose}
        >
          {t('assign')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AssignNumbers))
