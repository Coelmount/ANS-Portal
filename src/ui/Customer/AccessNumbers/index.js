import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import EntitlementsStore from 'stores/Entitlements'
import CreateCustomerStore from 'stores/CreateCustomer'

import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import EditEntitlements from 'components/EditEntitlements'
import AssignNumbers from 'components/CustomerAssignNumbers'
import Entitlements from 'components/Entitlements'
import Loading from 'components/Loading'
import TenantWizard from 'components/TenantWizard'

import editSvg from 'source/images/svg/edit-blue.svg'
import useStyles from './styles'

import { adminAccessLvl, validateAccessLvl } from 'utils/checkPermissions'

const AccessNumbers = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showEditEntitlements, setShowEditEntitlements] = useState(false)
  const [showAssignNumbers, setShowAssignNumbers] = useState(false)

  const {
    getEntitlements,
    entitlements,
    setDefaultEntitlementsValues,
    isLoadingEntitlements,
    deleteEntitlements,
    setDefaultTableValues
  } = EntitlementsStore
  const { clearCreatedCustomerStore } = CreateCustomerStore

  const [isAddEntitlementsModalOpen, setIsAddEntitlementsModalOpen] = useState(
    false
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [accessNumberToDelete, setAccessNumberToDelete] = useState({})

  useEffect(() => {
    getEntitlements(match.customerId)
    clearCreatedCustomerStore()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setDefaultTableValues()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setAccessNumberToDelete({ name, id })
  }

  const handleAddEntitlementsClick = () => {
    setDefaultEntitlementsValues()
    setIsAddEntitlementsModalOpen(true)
  }

  const handleAddEntitlementsModalClose = () => {
    setIsAddEntitlementsModalOpen(false)
    getEntitlements(match.customerId)
  }

  const handleDelete = accessNumber => {
    deleteEntitlements(match.customerId, accessNumber.id)
      .then(() => setIsDeleteModalOpen(false))
      .then(() => getEntitlements(match.customerId))
  }

  const titleData = {
    mainText: t('access_numbers'),
    iconCapture: validateAccessLvl(localStorage.getItem('ids'), adminAccessLvl)
      ? t('add_entitlements')
      : null,
    Icon: validateAccessLvl(localStorage.getItem('ids'), adminAccessLvl) ? (
      <AddOutlinedIcon />
    ) : null
  }

  const columns = [
    {
      id: 'name',
      label: 'country',
      getCellData: row => (
        <Typography className={classes.countryCellText}>
          {(row.name && row.name.split('-')[0]) || row.countryCode}
        </Typography>
      )
    },
    {
      id: 'number_type',
      label: 'type'
    },
    {
      id: 'service_capabilities',
      label: 'service'
    },
    {
      id: 'counter',
      label: 'selected',
      getCellData: row => (
        <Typography>{row.counter >= 1 ? row.counter : 0}</Typography>
      ),
      extraProps: {
        className: classes.textCenterBlue
      },
      extraHeadProps: {
        className: classes.assignedHeadCell
      }
    },
    {
      id: 'entitlement',
      label: 'entitled',
      extraProps: {
        className: classes.textCenter
      },
      headCellInsideWrapStyles: classes.headCellInsideWrap,
      headIcon: validateAccessLvl(
        localStorage.getItem('ids'),
        adminAccessLvl
      ) ? (
        <img src={editSvg} alt='edit icon' />
      ) : null,
      onIconClick: () => setShowEditEntitlements(true)
    },
    {
      id: 'see_numbers',
      isSortAvailable: false,
      getCellData: row => (
        <Link
          to={`/customers/${match.customerId}/access_numbers/${row.id}/numbers`}
          className={classes.link}
        >
          {t('see_numbers')}
        </Link>
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
          onClick={() =>
            !(row.counter > 0) && handleOpenDeleteModal(row.id, row.name)
          }
          className={classnames(classes.deleteCustomerIcon, {
            [classes.disableDeleteCustomerIcon]: row.counter > 0
          })}
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
            handleOpen={handleAddEntitlementsClick}
          />
        </CustomContainer>
        {isLoadingEntitlements ? (
          <Loading />
        ) : (
          <CustomTable
            classes={classes}
            rows={entitlements}
            columns={columns}
            searchCriterias={['name', 'number_type', 'service_capabilities']}
            noAvailableDataMessage={t('no_access_numbers_available')}
            tableId={'access_numbers'}
          />
        )}

        {showEditEntitlements && (
          <EditEntitlements
            handleClose={() => {
              setShowEditEntitlements(false)
              getEntitlements(match.customerId)
            }}
            open={showEditEntitlements}
          />
        )}
        {showAssignNumbers && (
          <AssignNumbers
            handleClose={() => setShowAssignNumbers(false)}
            open={showAssignNumbers}
          />
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={() => setIsDeleteModalOpen(false)}
            handleDelete={() => handleDelete(accessNumberToDelete)}
            deleteInfo={accessNumberToDelete}
            deleteSubject={t('entitlement')}
            action={t('to_remove')}
            titleAction={t(`remove`)}
          />
        )}
        {isAddEntitlementsModalOpen && (
          <Entitlements
            handleClose={handleAddEntitlementsModalClose}
            open={isAddEntitlementsModalOpen}
          />
        )}
      </Paper>
      <TenantWizard />
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbers))
