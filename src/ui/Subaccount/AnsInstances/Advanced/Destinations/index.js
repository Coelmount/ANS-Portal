import React, { useEffect, useState, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
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
import AddModal from './components/AddModal'
// import AddMultipleNumbers from '../MultipleANSBasicNumber'
// import MultipleUpdateNumbers from '../MultipleUpdateANSBasicNumbers'
import DeleteModal from 'components/DeleteModal'

import BasicTranslationsStore from 'stores/BasicTranslations'
import DestinationsStore from 'stores/Destionations'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'

const addModal = 1
const deleteModal = 2

const Destinations = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])

  const [
    showMultipleUpdateANSNumbers,
    setShowMultipleUpdateANSNumbers
  ] = useState(false)

  // const [isAddModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [instancesForDelete, setInstancesForDelete] = useState([])

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
    }
  }))

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

  const { destinations, getDestinations } = DestinationsStore
  console.log(destinations, 'destinations')
  const isLoading = false

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    // getDestinations(payload)
  }, [])

  useEffect(() => {
    setNumbers(destinations)
  }, [destinations])

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

  // const handleAddInstanceModalOpen = () => {
  //   setIsAddInstanceModalOpen(true)
  // }

  // const handleAddInstanceModalClose = () => {
  //   setIsAddInstanceModalOpen(false)
  //   setDefaultValues()
  //   getBasicTranslationsNumbers(match.customerId, match.groupId)
  // }

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

  const titleData = {
    mainText: `${t('advanced')}: ${t('destinations')}`,
    iconCapture: t('add'),
    Icon: <AddOutlinedIcon />
  }

  const toolbarButtonsBlock = () => {
    return (
      <Fragment>
        <Box className={classes.toolbarButtonsBlockWrap}>
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
        id: 'ans_id',
        label: 'name'
      },
      {
        id: 'access_number',
        label: 'phone_number'
      }
    ]
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            handleOpen={() => openedModal.open(addModal)}
          />
        </CustomContainer>
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
            noAvailableDataMessage={t('no_destinations_available')}
            tableId={'ans_advanced_destinations'}
          />
        )}
        {openedModal.id === addModal && (
          <AddModal
            open={openedModal.id === addModal}
            handleClose={openedModal.close}
          />
        )}
        {/* {showAddMultipleANSNumbers && (
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
        )} */}
      </Paper>
    </div>
  )
})

export default withNamespaces()(Destinations)
