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
import DeleteModal from 'components/DeleteModal'

import DestinationGroupsStore from 'stores/DestinationGroups'

import useStyles from './styles'
import RightArrowIcon from 'source/images/svg/right-arrow.svg'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'

const addModal = 1
const deleteModal = 2

const DestinationGroups = observer(({ t }) => {
  const {
    destinationGroups,
    isDestinationGroupsLoading,
    getDestinationGroups,
    deleteDestinationGroup,
    deleteDestinations
  } = DestinationGroupsStore

  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const mock = [
    {
      name: 'name1',
      routingPolicy: 'regular',
      treatment: 'no hunt',
      destinations: 5
    },
    {
      name: 'name2',
      routingPolicy: 'circular',
      treatment: 'hunt after x sec',
      destinations: 10
    }
  ]
  const [numbers, setNumbers] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isAnyChecked, setIsAnyChecked] = useState(false)
  const [searchList, setSearchList] = useState([])

  const openedModal = useLocalStore(() => ({
    id: null,
    open(modalId) {
      this.id = modalId
    },
    close() {
      this.id = null
      const payload = {
        customerId,
        groupId
      }
      getDestinationGroups(payload)
    }
  }))

  const modals = useLocalStore(() => ({
    data: '',
    setData(value, modalId) {
      this.data = value
      openedModal.open(modalId)
    }
  }))

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getDestinationGroups(payload)
  }, [])

  useEffect(() => {
    setNumbers(destinationGroups)
  }, [destinationGroups])

  useEffect(() => {
    handleCheckedStates(searchList)
  }, [searchList])

  // Checkboxes handlers ----
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
  // -----------

  // Trigger delete actions in store ----
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      destinationId: modals.data.userId,
      closeModal: openedModal.close
    }
    deleteDestinationGroup(payload)
  }

  const handleMultipleDelete = () => {
    const payload = {
      customerId,
      groupId,
      closeModal: openedModal.close
    }
    deleteDestinations(payload)
  }
  // --------

  const titleData = {
    mainText: `${t('advanced')}: ${t('destination_groups')}`,
    iconCapture: t('add'),
    Icon: <AddOutlinedIcon />
  }

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${modals.data.name}?`}</span>
  )

  const columns = [
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <Link
          to={`/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/advanced/destination_groups/${row.name}`}
          className={classes.link}
        >
          {row.name}
        </Link>
      )
    },
    {
      id: 'routingPolicy',
      label: 'routingPolicy'
    },
    // {
    //   id: 'treatment',
    //   label: 'treatment'
    // },
    {
      id: 'destinations',
      label: 'destinations'
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
          onClick={() => modals.setData(row, deleteModal)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

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
        {isDestinationGroupsLoading ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={true}
            rows={numbers}
            columns={columns}
            searchCriterias={['name', 'phoneNumber']}
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
        {openedModal.id === deleteModal && (
          <DeleteModal
            classes={classes}
            open={openedModal.id === deleteModal}
            handleClose={() => openedModal.close()}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={false}
            deleteSubject={`${t('destination_group').toLowerCase()}`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(DestinationGroups)
