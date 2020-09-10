import React, { useEffect, useState } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import AddModal from './components/AddModal'
import DeleteModal from 'components/DeleteModal'

import DestinationGroupsStore from 'stores/DestinationGroups'

import useStyles from './styles'

const addModal = 1
const deleteModal = 2

const DestinationGroups = observer(({ t }) => {
  const {
    destinationGroups,
    isDestinationGroupsLoading,
    isDestinationGroupDeleting,
    getDestinationGroups,
    deleteDestinationGroup
  } = DestinationGroupsStore

  const classes = useStyles()
  const { customerId, groupId } = useParams()

  const [numbers, setNumbers] = useState([])

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setNumbers(destinationGroups)
  }, [destinationGroups])

  // Trigger delete actions in store ----
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      destinationId: modals.data.ans_id,
      closeModal: openedModal.close
    }
    deleteDestinationGroup(payload)
  }
  // --------

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${modals.data.name}?`}</span>
  )

  const columns = [
    {
      id: 'name',
      label: 'name',
      getCellData: row => (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/advanced/destination_groups/${row.ans_id}`}
          className={classes.link}
        >
          {row.name}
        </Link>
      )
    },
    {
      id: 'routingPolicy',
      label: 'routing_policy'
    },
    {
      id: 'mainNumber',
      label: 'main_number'
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
        {isDestinationGroupsLoading ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={true}
            rows={numbers}
            columns={columns}
            searchCriterias={['name', 'routingPolicy', 'mainNumber']}
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
            isDeleting={isDestinationGroupDeleting}
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
