import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import CustomTable from 'components/CustomTable'

import Group3Person from 'source/images/svg/Group3Person.svg'

import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import Select from 'components/Select'
import ModalHelperText from 'components/ModalHelperText'

import NumbersStore from 'stores/Numbers'
import SubaccountsStore from 'stores/Subaccounts'
import AssignedNumbersStore from 'stores/AssignedNumbers'

import capitalize from 'lodash/capitalize'
import cloneDeep from 'lodash/cloneDeep'

import useStyles from './styles'

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabPanel(props) {
  const { children, value, index, classes, ...other } = props

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className={classes.tabPanel}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

const AddedListStep = ({ handleClose, t }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [addedNumbers, setAddedNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const { addedNumbers: addedNumbersStore, rejectedNumbers } = NumbersStore
  const {
    getSubaccounts,
    selectGroups,
    isLoadingSubaccounts
  } = SubaccountsStore
  const {
    postAssignToSubaccountWithClearData,
    isPostAssignNumbers
  } = AssignedNumbersStore

  const match = useParams()

  useEffect(() => {
    getSubaccounts(match.customerId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const deep = cloneDeep(addedNumbersStore)
    setAddedNumbers(deep)
  }, [addedNumbersStore])

  const handleAssignNumbersToSubaccaunt = () => {
    const checkedNumbers = addedNumbers
      .filter(el => el.checked)
      .map(num => ({
        country_code: `+${
          parsePhoneNumberFromString(num.phoneNumber).countryCallingCode
        }`,
        range: [
          Number(
            num.phoneNumber.slice(
              parsePhoneNumberFromString(num.phoneNumber).countryCallingCode
                .length + 1
            )
          )
        ]
      }))
    postAssignToSubaccountWithClearData(
      match.customerId,
      selectedGroup,
      { ranges: checkedNumbers },
      handleClose
    )
  }

  const handleSelectAll = () => {
    const newNumbers = addedNumbers.map(el => ({
      ...el,
      checked: !selectAll,
      hover: false
    }))
    setAddedNumbers(newNumbers)
    setSelectAll(!selectAll)
  }

  const selectNumbers = (checked, number) => {
    const newNumbers = [...addedNumbers]
    const index = addedNumbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].checked = checked
    if (newNumbers.every(el => el.checked)) {
      setSelectAll(true)
    } else {
      setSelectAll(false)
    }
    setAddedNumbers(newNumbers)
  }

  const changeHover = (newHover, number) => {
    const newNumbers = [...addedNumbers]
    const index = addedNumbers.findIndex(el => el.phoneNumber === number)
    newNumbers[index].hover = newHover
    setAddedNumbers(newNumbers)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const columnsAdded = [
    {
      id: 'checkbox',
      label: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectNumbers(!row.checked, row.phoneNumber)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.phoneNumber)}
            onMouseLeave={() => changeHover(false, row.phoneNumber)}
            onMouseEnter={() => changeHover(true, row.phoneNumber)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.phoneNumber)}
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
      id: 'phoneNumber',
      label: 'number',
      getCellData: row => (
        <Typography className={classes.phoneNumberCellText}>
          {row.phoneNumber}
        </Typography>
      ),
      isSortAvailable: false,
      extraProps: { className: classes.numbersCell },
      extraHeadProps: { className: classes.headNumbersCell }
    },
    {
      id: 'addStatus',
      label: 'status',
      getCellData: row => (
        <Typography
          className={
            row.status === 'added'
              ? classes.addedStatusText
              : classes.rejectedStatusText
          }
        >
          {row.status}
        </Typography>
      ),
      isSortAvailable: false
    }
  ]

  const columnsRejected = [
    {
      id: 'phoneNumber',
      label: 'number',
      getCellData: row => (
        <Typography className={classes.phoneNumberCellText}>
          {row.phoneNumber}
        </Typography>
      ),
      isSortAvailable: false,
      extraProps: { className: classes.numbersCell },
      extraHeadProps: { className: classes.headNumbersCell }
    },
    {
      id: 'addStatus',
      label: 'status',
      getCellData: row => (
        <Typography
          className={
            row.status === 'added'
              ? classes.addedStatusText
              : classes.rejectedStatusText
          }
        >
          {row.status}
        </Typography>
      ),
      isSortAvailable: false
    }
  ]

  if (isLoadingSubaccounts || isPostAssignNumbers) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('added_phone_numbers_list')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.addedListStepDialogContent}>
        <Box className={classes.helperTextWrap}>
          <ModalHelperText title='added_phone_numbers_list' />
        </Box>
        <AppBar className={classes.appBar} position='static'>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label='simple tabs example'
            className={classes.tabsWrap}
          >
            <Tab
              className={value === 0 ? classes.activeTab : classes.nonActiveTab}
              label={`${t('added')} (${addedNumbers.length})`}
              disabled={addedNumbers.length <= 0}
              {...a11yProps(0)}
            />
            <Tab
              className={value === 1 ? classes.activeTab : classes.nonActiveTab}
              label={`${t('rejected')} (${rejectedNumbers.length})`}
              disabled={rejectedNumbers.length <= 0}
              {...a11yProps(1)}
            />
          </Tabs>
        </AppBar>
        <TabPanel classes={classes} value={value} index={0}>
          <Box className={classes.secondParagraphBox}>
            <Box>
              <Box>{t('select_subaccount')}</Box>
              <Box className={classes.marginBottom2}>
                <Select
                  label={capitalize(t('subaccount'))}
                  icon={<img src={Group3Person} alt='Group3Person' />}
                  selectStyles={classes.select}
                  wrapperStyles={classes.wrapper}
                  options={selectGroups}
                  value={selectedGroup}
                  disabled={!selectGroups.length}
                  onChange={e => setSelectedGroup(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
          <CustomTable
            classes={classes}
            columns={columnsAdded}
            firstCell={false}
            showPagination={false}
            rows={addedNumbers}
            showSearchBar={false}
            showToolBar={false}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            tableId={'added_list_step_first_tab'}
          />
        </TabPanel>
        <TabPanel classes={classes} value={value} index={1}>
          <CustomTable
            classes={classes}
            columns={columnsRejected}
            showPagination={false}
            rows={rejectedNumbers}
            showSearchBar={false}
            showToolBar={false}
            noAvailableDataMessage={t('no_phone_numbers_available')}
            tableId={'added_list_step_second_tab'}
          />
        </TabPanel>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='contained'
          color='primary'
          className={classes.okButtonAddedList}
          onClick={handleClose}
        >
          {'OK'}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButtonAddedList}
          onClick={handleAssignNumbersToSubaccaunt}
          disabled={
            !selectedGroup || !addedNumbers.filter(el => el.checked).length
          }
        >
          {t('assign_to_subaccount')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(AddedListStep))
