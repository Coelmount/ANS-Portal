import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import EntitlementsStore from 'stores/Entitlements'

import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import EditEntitlements from 'components/EditEntitlements'
import AssignNumbers from 'components/CustomerAssignNumbers'
import Entitlements from 'components/Entitlements'

import useStyles from './styles'
import editSvg from 'source/images/svg/edit-blue.svg'
import { useEffect } from 'react'

const AccessNumbers = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showEditEntitlements, setShowEditEntitlements] = useState(false)
  const [showAssignNumbers, setShowAssignNumbers] = useState(false)

  const {
    getEntitlements,
    postEntitlements,
    entitlements,
    setDefaultEntitlementsValues,
    isLoadingEntitlements,
    deleteEntitlements
  } = EntitlementsStore

  const [isAddEntitlementsModalOpen, setIsAddEntitlementsModalOpen] = useState(
    false
  )
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [accessNumberToDelete, setAccessNumberToDelete] = useState({})

  useEffect(() => {
    getEntitlements(match.customerId)
  }, [getEntitlements, postEntitlements])

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

  const handleAssignButtonClick = () => {
    setShowAssignNumbers(true)
  }

  const handleDelete = (accessNumber) => {
    deleteEntitlements(match.customerId, accessNumber.id)
      .then(() => setIsDeleteModalOpen(false))
      .then(() => getEntitlements(match.customerId))
  }

  const titleData = {
    mainText: t('access_numbers'),
    iconCapture: t('add_entitlements'),
    Icon: <AddOutlinedIcon />
  }

  const toolbarButtonsBlock = () => {
    return (
      <Box className={classes.toolbarButtonsBlockWrap}>
        <Box className={classes.addCustomerWrap}>
          <Box
            onClick={handleAssignButtonClick}
            className={classes.addIconWrap}
          >
            <DoneOutlinedIcon className={classes.deleteIcon} />
          </Box>
          <Typography className={classes.addCustomerTitle}>
            {t('assign_to_subaccount')}
          </Typography>
        </Box>
      </Box>
    )
  }

  const columns = [
    {
      id: 'name',
      label: 'country',
      getCellData: (row) => <Typography>{row.name.split('-')[0]}</Typography>
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
      id: 'assigned',
      label: 'selected',
      getCellData: (row) => (
        <Typography>{row.assigned >= 1 ? row.assigned : 0}</Typography>
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
      headIcon: () => <img src={editSvg} alt='edit icon' />,
      onIconClick: () => setShowEditEntitlements(true)
    },
    {
      id: 'see_numbers',
      isSortAvailable: false,
      getCellData: (row) => (
        <Link
          to={`/customers/${match.customerId}/access_numbers/${row.name.replace(
            /\s/g,
            ''
          )}`}
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
      getCellData: (row) => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.id, row.name)}
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
            classes={classes}
            handleOpen={handleAddEntitlementsClick}
          />
        </CustomContainer>
        <CustomTable
          // classes={classes}
          rows={entitlements}
          isLoadingData={isLoadingEntitlements}
          columns={columns}
          searchCriterias={['name', 'number_type', 'service_capabilities']}
          extraToolbarBlock={toolbarButtonsBlock}
        />
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
            //isDeleting={isDeletingCustomer}
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
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbers))
