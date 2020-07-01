import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'

import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
import AddInstance from '../AddInstance'
import AddMultipleNumbers from '../MultipleANSBasicNumber'
import MultipleUpdateNumbers from '../MultipleUpdateANSBasicNumbers'
import DeleteModal from 'components/DeleteModal'

import BasicTranslationsStore from 'stores/BasicTranslations'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'

const TranslationNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
  const [anchorEl, setAnchorEl] = useState(null)
  const [showAddMultipleANSNumbers, setShowAddMultipleANSNumbers] = useState(
    false
  )
  const [
    showMultipleUpdateANSNumbers,
    setShowMultipleUpdateANSNumbers
  ] = useState(false)

  const [isAddInstanceModalOpen, setIsAddInstanceModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [instancesForDelete, setInstancesForDelete] = useState([])
  const [isUserSubaccount, setIsUserSubaccount] = useState(false)

  const isAddPopoverOpen = Boolean(anchorEl)
  const id = isAddPopoverOpen ? 'simple-popover' : undefined

  const {
    setDefaultValues,
    updateSelectedInstance,
    basicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    getBasicTranslationsNumbers,
    deleteANSBasic,
    isDeleting,
    getAvailableNumbersForAddInstance,
    availableNumbersForAddInstance,
    isAvailableNumbersForAddInstanceLoading,
    clearAvailableNumbersForAddInstance,
    clearBasicNumbers
  } = BasicTranslationsStore

  const isLoading =
    isAvailableNumbersForAddInstanceLoading || isBasicTranslationsNumbersLoading
  const isNumbersForAddInstanceAvailable = availableNumbersForAddInstance.length
  const isNoNumbersNotificationVisible =
    !isNumbersForAddInstanceAvailable && !isLoading && isUserSubaccount

  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
    getAvailableNumbersForAddInstance(match.customerId, match.groupId, 1, 10)

    const ids = JSON.parse(localStorage.getItem('ids'))
    setIsUserSubaccount(Boolean(ids && ids.tenant_id && ids.group_id))

    return () => {
      clearAvailableNumbersForAddInstance()
      clearBasicNumbers()
    }
  }, [])

  useEffect(() => {
    setNumbers(basicTranslationsNumbers)
  }, [basicTranslationsNumbers])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    getBasicTranslationsNumbers(match.customerId, match.groupId)
  }

  const handleMultipleDelete = () => {
    setIsDeleteModalOpen(true)
    setInstancesForDelete(
      numbers.filter(num => num.checked).map(el => el.ans_id)
    )
  }

  const handleDelete = id => {
    deleteANSBasic(match.customerId, match.groupId, id, handleCloseDeleteModal)
  }

  const handleAddInstanceModalOpen = () => {
    setIsAddInstanceModalOpen(true)
    setAnchorEl(null)
  }

  const handleAddInstanceModalClose = () => {
    setIsAddInstanceModalOpen(false)
    setDefaultValues()
    getBasicTranslationsNumbers(match.customerId, match.groupId)
  }

  const handlePopoverOpen = event => {
    if (isNumbersForAddInstanceAvailable) setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const selectNumbers = (checked, id) => {
    const newNumbers = transformOnChange(numbers, checked, id)
    setNumbers(newNumbers)
    handleCheckedStates(newNumbers)
  }

  const handleSelectAll = () => {
    const newNumbers = transformOnCheckAll(searchList, numbers, selectAll)
    handleCheckedStates(newNumbers)
    setNumbers(newNumbers)
    setSelectAll(!selectAll)
    setIsAnyChecked(!selectAll)
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

  const changeHover = (newHover, id) => {
    const newNumbers = transformOnHover(numbers, newHover, id)
    setNumbers(newNumbers)
  }

  const addPopoverItems = [
    {
      id: 1,
      label: t('1_ans_basic_number'),
      onClick: handleAddInstanceModalOpen
    },
    {
      id: 2,
      label: t('multiply_ans_basic_number'),
      onClick: () => {
        setShowAddMultipleANSNumbers(true)
        setAnchorEl(null)
      }
    }
  ]

  const titleData = {
    mainText: t('basic_translations'),
    buttonBlock: (
      <Box className={classes.titleWrap}>
        {isNoNumbersNotificationVisible && (
          <Typography className={classes.titleNotification}>
            <img
              src={notificationIcon}
              className={classes.notificationIcon}
              alt='notification'
            />
            {t('no_numbers_notification')}
          </Typography>
        )}
        <Box className={classes.addCustomerWrap}>
          <Box
            onClick={handlePopoverOpen}
            className={classnames(classes.addIconWrap, {
              [classes.disabledButton]: !isNumbersForAddInstanceAvailable
            })}
          >
            <AddOutlinedIcon />
          </Box>
          <Box className={classes.addTitleWrap}>
            <Typography
              className={classnames(classes.addCustomerTitle, {
                [classes.disabledText]: !isNumbersForAddInstanceAvailable
              })}
            >
              {t('add')}
            </Typography>
            <ArrowDropUpOutlinedIcon className={classes.upArrowIcon} />
            <ArrowDropDownOutlinedIcon className={classes.downArrowIcon} />
          </Box>
          <Popover
            id={id}
            open={isAddPopoverOpen}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
          >
            <Box className={classes.addPopoverWrap}>
              {addPopoverItems.map(item => (
                <MenuItem
                  onClick={item.onClick}
                  value={item.label}
                  key={item.id}
                  className={classes.addPopoverItem}
                >
                  <Typography className={classes.addPopoverItemText}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Box>
          </Popover>
        </Box>
      </Box>
    )
  }

  const toolbarButtonsBlock = () => {
    return (
      <Fragment>
        <Box className={classes.toolbarButtonsBlockWrap}>
          <Box className={classes.updateWrap}>
            <Button
              variant='contained'
              color='primary'
              className={classnames(classes.toolbarButton, {
                [classes.disabledButton]: !isAnyChecked
              })}
              onClick={() =>
                isAnyChecked && setShowMultipleUpdateANSNumbers(true)
              }
            >
              <UpdateIcon className={classes.updateIcon} />
            </Button>
            <Typography className={classes.addCustomerTitle}>
              {t('update')}
            </Typography>
          </Box>
          <Box className={classes.addCustomerWrap}>
            <IconButton
              aria-label='deassign icon button'
              component='span'
              className={classnames(classes.mainIconWrap, {
                [classes.disabledButton]: !isAnyChecked
              })}
              onClick={isAnyChecked && handleMultipleDelete}
            >
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete'
              />
            </IconButton>
            <Typography className={classes.addCustomerTitle}>
              {t('delete')}
            </Typography>
          </Box>
        </Box>
      </Fragment>
    )
  }

  const columns = () => {
    const handleOpenDeleteModal = id => {
      setIsDeleteModalOpen(true)
      setInstancesForDelete([id])
    }
    return [
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
        id: 'access_number',
        label: 'access_number',
        isSortAvailable: false,
        getCellData: row => (
          <Box>
            <Link
              onClick={() => updateSelectedInstance(row)}
              to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/basic/${row.access_number}`}
              className={classes.link}
            >
              {row.access_number}
            </Link>
            <Typography>{row.accessCountry}</Typography>
          </Box>
        ),
        extraHeadProps: {
          className: classes.accessHeadCell
        },
        extraProps: {
          className: classes.accessNumberCell
        }
      },
      {
        id: 'rightArrow',
        isSortAvailable: false,
        getCellData: row => (
          <img
            src={RightArrowIcon}
            className={classes.rightArrowIcon}
            alt='right icon'
          />
        )
      },
      {
        id: 'destination_number',
        label: 'destination_number',
        isSortAvailable: false,
        getCellData: row => (
          <Box>
            <Typography className={classes.destinationNumberText}>
              {row.destination_number}
            </Typography>
            <Typography>{row.destinationCountry}</Typography>
          </Box>
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
          <CloseOutlinedIcon
            className={classes.deleteCustomerIcon}
            onClick={() => handleOpenDeleteModal(row.ans_id)}
          />
        )
      }
    ]
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isLoading ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={false}
            rows={numbers}
            columns={columns()}
            searchCriterias={[
              'accessCountry',
              'destinationCountry',
              'access_number',
              'destination_number'
            ]}
            extraToolbarBlock={toolbarButtonsBlock}
            getSearchList={setSearchList}
            noAvailableDataMessage={t('no_translations_available')}
            tableId={'ans_basic_translations'}
          />
        )}
        {isAddInstanceModalOpen && (
          <AddInstance
            open={isAddInstanceModalOpen}
            handleClose={handleAddInstanceModalClose}
          />
        )}
        {showAddMultipleANSNumbers && (
          <AddMultipleNumbers
            open={showAddMultipleANSNumbers}
            handleClose={() => {
              setShowAddMultipleANSNumbers(false)
              getBasicTranslationsNumbers(match.customerId, match.groupId)
            }}
          />
        )}
        {showMultipleUpdateANSNumbers && (
          <MultipleUpdateNumbers
            open={showMultipleUpdateANSNumbers}
            handleClose={() => {
              setShowMultipleUpdateANSNumbers(false)
              getBasicTranslationsNumbers(match.customerId, match.groupId)
            }}
            numbers={numbers}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={instancesForDelete}
            isDeleting={isDeleting}
            deleteSubject={`${t('basic').toLowerCase()} ${t(
              'phone_numbers'
            ).toLowerCase()}`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(TranslationNumbers)
