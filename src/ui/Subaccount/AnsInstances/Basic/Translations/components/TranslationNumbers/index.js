import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import CustomTable from 'components/CustomTable'
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

const TranslationNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()

  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])
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
  const [instancesToDeleteString, setInstancesToDeleteString] = useState('')

  const {
    setDefaultValues,
    updateSelectedInstance,
    basicTranslationsNumbers,
    isBasicTranslationsNumbersLoading,
    getBasicTranslationsNumbers,
    deleteANSBasic,
    isDeleting,
    getAvailableNumbersForAddInstance,
    isAvailableNumbersForAddInstanceLoading,
    clearAvailableNumbersForAddInstance,
    clearBasicNumbers
  } = BasicTranslationsStore

  const isLoading =
    isAvailableNumbersForAddInstanceLoading || isBasicTranslationsNumbersLoading

  useEffect(() => {
    getBasicTranslationsNumbers(match.customerId, match.groupId)
    getAvailableNumbersForAddInstance(match.customerId, match.groupId, 1, 10)

    return () => {
      clearAvailableNumbersForAddInstance()
      clearBasicNumbers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setNumbers(basicTranslationsNumbers)
  }, [basicTranslationsNumbers])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  useEffect(() => {
    const instanceNames = instancesForDelete.map(
      instance => `${instance.access_number} ==> ${instance.destination_number}`
    )
    setInstancesToDeleteString(instanceNames.join(' , '))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instancesForDelete.length])

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    getBasicTranslationsNumbers(match.customerId, match.groupId)
    setInstancesForDelete([])
  }

  const handleMultipleDelete = () => {
    setIsDeleteModalOpen(true)
    setInstancesForDelete(numbers.filter(num => num.checked))
  }

  const handleDelete = () => {
    const deleteIds = instancesForDelete.map(instance => instance.ans_id)
    deleteANSBasic(
      match.customerId,
      match.groupId,
      deleteIds,
      handleCloseDeleteModal
    )
  }

  const handleAddInstanceModalClose = () => {
    setIsAddInstanceModalOpen(false)
    setDefaultValues()
    getBasicTranslationsNumbers(match.customerId, match.groupId)
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
                isAnyChecked ? setShowMultipleUpdateANSNumbers(true) : undefined
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
              onClick={isAnyChecked ? handleMultipleDelete : undefined}
            >
              <img
                className={classes.deleteIcon}
                src={deleteIcon}
                alt='delete'
              />
            </IconButton>
            <Typography className={classes.addCustomerTitle}>
              {`${t('delete')} ${t('translation')}`}
            </Typography>
          </Box>
        </Box>
      </Fragment>
    )
  }

  const extraDeleteBlock = (
    <Fragment>
      <span
        className={classes.deleteName}
      >{` (${instancesToDeleteString})? `}</span>
      <span>{`${t('delete_instance_end')}.`}</span>
    </Fragment>
  )

  const columns = () => {
    const handleOpenDeleteModal = row => {
      setIsDeleteModalOpen(true)
      setInstancesForDelete([row])
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
            onClick={() => handleOpenDeleteModal(row)}
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
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isDeleting}
            deleteSubject={`${t('translation').toLowerCase()}${
              instancesForDelete.length > 1 ? 's' : ''
            }`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(TranslationNumbers)
