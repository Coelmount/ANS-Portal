import React, { useState, useEffect, Fragment } from 'react'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, Link } from 'react-router-dom'
import classnames from 'classnames'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import Checkbox from 'components/Checkbox'
import CheckCell from './components/CheckCell'

import deleteIcon from 'source/images/svg/delete-icon.svg'
import useStyles from './styles'

import { toJS } from 'mobx'

const singleDeleteModalId = 1
const multipleDeleteModalId = 2

const TimeBasedRouting = ({ t }) => {
  const classes = useStyles()
  const history = useHistory()
  const { customerId, groupId } = useParams()

  const {
    areAllNumbersChecked,
    timeBasedRoutes,
    deleteString,
    checkedNumbers,
    isLoadingTBR,
    isDeleting,
    getTimeBasedRoutes,
    handleCheckAll,
    deleteTimeBasedRoutes
  } = TimeBaseRoutingStore

  const modalStore = useLocalStore(() => ({
    openedId: null,
    deleteItem: {},
    open(modalId) {
      this.openedId = modalId
    },
    close() {
      this.openedId = null
      this.deleteItem = {}
      getRequest()
    }
  }))

  const isAnyChecked = checkedNumbers.length
  const singleDeleteModalOpen = modalStore.openedId === singleDeleteModalId
  const deleteSubject = t(
    `translation${singleDeleteModalOpen ? '' : 's'}`
  ).toLowerCase()
  const isDeleteModalOpen =
    modalStore.openedId === singleDeleteModalId ||
    modalStore.openedId === multipleDeleteModalId

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

  // Modal click handlers
  const handleSingleDeleteClick = row => {
    modalStore.open(singleDeleteModalId)
    modalStore.deleteItem = row
  }

  const handleMultipleDeleteClick = () => {
    modalStore.open(multipleDeleteModalId)
  }

  // Delete request trigger
  const handleDelete = () => {
    const payload = {
      customerId,
      groupId,
      callback: modalStore.close,
      singleDeleteItem: modalStore.deleteItem
    }
    deleteTimeBasedRoutes(payload)
  }

  const extraDeleteBlock = (
    <span className={classes.deleteName}>{` ${
      modalStore.openedId === singleDeleteModalId
        ? `'${modalStore.deleteItem.name}'`
        : deleteString
    }? `}</span>
  )

  const extraToolbarBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.addCustomerWrap}>
          <IconButton
            aria-label='deassign icon button'
            component='span'
            className={classnames(classes.mainIconWrap, {
              [classes.disabledButton]: !isAnyChecked
            })}
            onClick={isAnyChecked ? handleMultipleDeleteClick : undefined}
          >
            <img className={classes.deleteIcon} src={deleteIcon} alt='delete' />
          </IconButton>
          <Typography className={classes.addCustomerTitle}>
            {`${t('delete')} ${t('translation')}`}
          </Typography>
        </Box>
      </Box>
    )
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          className={classes.headCheckbox}
          checked={areAllNumbersChecked}
          onChange={handleCheckAll}
        />
      ),
      isSortAvailable: false,
      getCellData: (row, i) => {
        return <CheckCell key={i} row={row} i={i} classes={classes} />
      },
      extraHeadProps: {
        className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
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
        <IconButton onClick={() => handleSingleDeleteClick(row)}>
          <CloseOutlinedIcon className={classes.deleteCustomerIcon} />
        </IconButton>
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {isLoadingTBR ? (
          <Loading />
        ) : (
          <CustomTable
            firstCell={false}
            rows={timeBasedRoutes}
            columns={columns}
            extraToolbarBlock={extraToolbarBlock}
            searchCriterias={['name', 'defaultDestination']}
            noAvailableDataMessage={t('no_translations_available')}
            tableId='time_based_routing_list'
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={modalStore.close}
            handleDelete={handleDelete}
            extraMessageBlock={extraDeleteBlock}
            isDeleting={isDeleting}
            deleteSubject={deleteSubject}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(TimeBasedRouting))
