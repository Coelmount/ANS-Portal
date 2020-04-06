import React, { useState, useContext } from 'react'
import { withRouter } from 'react-router'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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

import useStyles from './styles'
import editSvg from 'source/images/svg/edit-blue.svg'
import { useEffect } from 'react'

const rows = [
  {
    id: 1,
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'Angola - GEO - ANS basic'
  },
  {
    id: 2,
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'South Africa - GEO - ANS basic'
  },
  {
    id: 3,
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'Angola - GEO - ANS basic'
  },
  {
    id: 4,
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'South Africa - GEO - ANS basic'
  },
  {
    id: 5,
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'Angola - GEO - ANS basic'
  },
  {
    id: 6,
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70',
    name: 'South Africa - GEO - ANS basic'
  }
]

const AccessNumbers = ({ t }) => {
  const match = useParams()
  const classes = useStyles()
  const [showEditEntitlements, setShowEditEntitlements] = useState(false)
  const [showAssignNumbers, setShowAssignNumbers] = useState(false)

  const { getEntitlements, postEntitlements, entitlements } = EntitlementsStore

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [accessNumberToDelete, setAccessNumberToDelete] = useState({})

  useEffect(() => {
    // postEntitlements()
    getEntitlements()
  }, [getEntitlements, postEntitlements])

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setAccessNumberToDelete({ name })
  }

  const titleData = {
    mainText: t('access_numbers'),
    iconCapture: t('add_entitlements'),
    Icon: <AddOutlinedIcon />
  }

  const columns = [
    {
      id: 'name',
      label: 'country',
      getCellData: row => <Typography>{row.name.split('-')[0]}</Typography>
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
      label: 'assigned',
      headIcon: () => <DoneOutlinedIcon className={classes.assignedDoneIcon} />,
      onIconClick: () => setShowAssignNumbers(true)
    },
    {
      id: 'entitled',
      label: 'entitled',
      headIcon: () => <img src={editSvg} alt='edit icon' />,
      onIconClick: () => setShowEditEntitlements(true)
    },
    {
      id: 'see_numbers',
      isSortAvailable: false,
      getCellData: row => (
        <Link
          to={`/customers/${match.customerId}/access_numbers/${row.name.replace(
            /\s/g,
            ''
          )}`}
          className={classes.link}
        >
          {t('see numbers')}
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
            // handleOpen={handleOpenCreateCustomer}
          />
        </CustomContainer>
        <CustomTable
          classes={classes}
          rows={entitlements}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          searchCriterias={['name', 'number_type']}
        />
        {showEditEntitlements && (
          <EditEntitlements
            handleClose={() => setShowEditEntitlements(false)}
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
            //handleDelete={handleDelete}
            deleteInfo={accessNumberToDelete}
            //isDeleting={isDeletingCustomer}
            deleteSubject={t('entitlement')}
            action={t('to_remove')}
            titleAction={t(`remove`)}
          />
        )}
        {/* {isOpenCreateCustomer && (
          <CreateCustomer
            open={isOpenCreateCustomer}
            handleClose={handleCloseCreateCustomer}
            successClose={handleCloseCreateCustomerSuccess}
            store={
              creationType === 'subaccount'
                ? CreateSubaccountStore
                : CreateCustomerStore
            }
            createSubaccount={createSubaccount}
            isCreateSubaccount={creationType === 'subaccount'}
          />
        )} */}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AccessNumbers))
