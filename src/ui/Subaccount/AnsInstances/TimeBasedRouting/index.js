import React, { useState, useEffect } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, Link } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import AddModal from './components/AddModal'

import useStyles from './styles'

const addModalId = 1
const deleteModalId = 2

const TimeBasedRouting = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const { customerId, groupId } = useParams()

  const {
    timeBaseRoutes,
    isLoadingTBR,
    getTimeBasedRoutes
  } = TimeBaseRoutingStore

  const modalsStore = useLocalStore(() => ({
    openedId: null,
    open(modalId) {
      this.openedId = modalId
    },
    close() {
      this.openedId = null
      getRequest()
    }
  }))

  const getRequest = () => {
    const payload = {
      customerId,
      groupId
    }
    getTimeBasedRoutes(payload)
  }

  useEffect(() => {
    getRequest()
  }, [])

  const handleAddButtonClick = () => {
    modalsStore.open(addModalId)
  }

  const titleData = {
    mainText: t('time_base_routing'),
    iconCapture: t('add'),
    Icon: <AddIcon />
  }

  const columns = [
    {
      id: 'name',
      label: t('name'),
      getCellData: row => (
        <Link
          to={`/customers/${customerId}/subaccounts/${groupId}/ans_instances/time_based_routing/${row.name}`}
          className={classes.link}
        >
          {row.name}
        </Link>
      )
    },
    {
      id: 'defaultDestination',
      label: t('default_destination')
    },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <IconButton
        // onClick={() => setIVRForDelete(row)}
        >
          <CloseOutlinedIcon
          //onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          //className={classes.deleteCustomerIcon}
          />
        </IconButton>
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
            classes={classes}
            handleOpen={handleAddButtonClick}
          />
        </CustomContainer>
        {isLoadingTBR ? (
          <Loading />
        ) : (
          <CustomTable
            rows={timeBaseRoutes}
            columns={columns}
            searchCriterias={['name', 'defaultDestination']}
            noAvailableDataMessage={t('no_tbs_available')}
            tableId='time_based_routing_list'
          />
        )}
      </Paper>

      {modalsStore.openedId === addModalId && (
        <AddModal
          open={modalsStore.openedId === addModalId}
          handleClose={modalsStore.close}
        />
      )}
    </div>
  )
}

export default withNamespaces()(observer(TimeBasedRouting))
