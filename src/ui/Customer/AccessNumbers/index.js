import React, { useContext } from 'react'
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

import useStyles from './styles'
import editSvg from 'source/images/svg/edit-blue.svg'
import { useEffect } from 'react'

const rows = [
  {
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  },
  {
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  },
  {
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  },
  {
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  },
  {
    country: 'Angola',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  },
  {
    country: 'South Africa',
    type: 'geographic',
    service: 'basic',
    assigned: '10',
    entitled: '70'
  }
]

const AccessNumbers = ({ t }) => {
  const match = useParams()
  const classes = useStyles()

  const { getEntitlements, postEntitlements, entitlements } = useContext(
    EntitlementsStore
  )

  useEffect(() => {
    // postEntitlements()
    getEntitlements()
  }, [getEntitlements, postEntitlements])

  const handleOpenDeleteModal = (id, name) => {
    console.log('delete')
    // setIsDeleteModalOpen(true)
    // setSubaccountToDelete({ id, name })
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
      headIcon: () => <DoneOutlinedIcon className={classes.assignedDoneIcon} />
    },
    {
      id: 'entitled',
      label: 'entitled',
      headIcon: () => <img src={editSvg} alt='edit icon' />
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
          onClick={() => handleOpenDeleteModal(row.country)}
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
          id='name'
          name='number_type'
        />
        {/* {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={customerToDelete}
            isDeleting={isDeletingCustomer}
            deleteSubject={t('customer')}
          />
        )} */}
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
