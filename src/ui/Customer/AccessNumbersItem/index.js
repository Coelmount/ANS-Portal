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
// import CustomTable from 'components/CustomTable'
import CustomTable from './CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import useStyles from './styles'
import editSvg from 'source/images/svg/edit-blue.svg'
import { useEffect } from 'react'

const rows = [
  {
    phone_numbers: '+24440300011',
    subaccount_id: '10440_01',
    status: 'in use'
  },
  {
    phone_numbers: '+24440300012',
    subaccount_id: '10440_01',
    status: 'in use'
  },
  {
    phone_numbers: '+24440300013',
    subaccount_id: '10440_01',
    status: 'in use'
  },
  {
    phone_numbers: '+24440300014',
    subaccount_id: '10440_01',
    status: 'in use'
  },
  {
    phone_numbers: '+24440300015',
    subaccount_id: '10440_01',
    status: 'available'
  },
  {
    phone_numbers: '+24440300016',
    subaccount_id: '10440_01',
    status: 'available'
  }
]

const AccessNumbersItem = ({ t }) => {
  const match = useParams()
  console.log(match, 'match')
  const classes = useStyles()

  // const { getEntitlements, postEntitlements, entitlements } = useContext(
  //   EntitlementsStore
  // )

  useEffect(() => {
    // postEntitlements()
    // getEntitlements()
  }, [])

  const handleOpenDeleteModal = (id, name) => {
    console.log('delete')
    // setIsDeleteModalOpen(true)
    // setSubaccountToDelete({ id, name })
  }

  const titleData = {
    mainText: match.numbersId,
    iconCapture: t('add_numbers'),
    Icon: <AddOutlinedIcon />
  }

  const columns = [
    {
      id: 'phone_numbers',
      label: 'phone_numbers'
    },
    {
      id: 'subaccount_id',
      label: 'subaccount_id'
    },
    {
      id: 'status',
      label: 'status'
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
          isFullVersion={true}
          rowsColor={true}
          withFilters={true}
          classes={classes}
          columns={columns}
          rows={rows}
        />
        {/* <CustomTable
          classes={classes}
          rows={rows}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          id='tenantId'
          name='name'
        /> */}
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

export default withNamespaces()(observer(AccessNumbersItem))
