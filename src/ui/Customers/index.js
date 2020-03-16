import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined'

import CustomersStore from 'stores/Customers'
import CreateCustomerStore from 'stores/CreateCustomer'
import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'

import useStyles from './styles'

const CustomersTable = observer(({ t }) => {
  const classes = useStyles()
  const {
    rows,
    getCustomers,
    deleteCustomer,
    isLoadingCustomers,
    isDeletingCustomer,
    addCustomer
  } = useContext(CustomersStore)

  const { setDefaultValues } = useContext(CreateCustomerStore)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [customerToDelete, setCustomerToDelete] = useState({})
  const [creationType, setCreationType] = useState('')
  const [isOpenCreateCustomer, setIsOpenCreateCustomer] = useState(false)

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  const handleOpenDeleteModal = useCallback((id, name) => {
    setIsDeleteModalOpen(true)
    setCustomerToDelete({ id, name })
  }, [])

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCloseCreateCustomer = () => {
    setIsOpenCreateCustomer(false)
  }

  const handleOpenCreateCustomer = () => {
    setDefaultValues()
    setCreationType('customer')
    setIsOpenCreateCustomer(true)
  }

  const handleCloseCreateCustomerSuccess = () => {
    setIsOpenCreateCustomer(false)
    getCustomers()
  }

  const createSubaccount = () => {
    setCreationType('subaccount')
  }

  const handleDelete = id => {
    const payload = {
      id,
      callback: setIsDeleteModalOpen
    }
    deleteCustomer(payload)
  }

  const columns = useMemo(
    () => [
      {
        id: 'tenantId',
        numeric: false,
        extraProps: {
          scope: 'row'
        },
        label: 'ID',
        getCellData: row => (
          <Link
            to={`/customers/${row.tenantId}/access-numbers`}
            className={classes.link}
          >
            {row.tenantId}
          </Link>
        )
      },
      {
        id: 'name',
        numeric: false,
        label: 'name',
        extraProps: {
          scope: 'row'
        }
      },
      {
        id: 'delete',
        extraProps: {
          className: classes.deleteCell,
          align: 'right'
        },
        getCellData: row => (
          <CloseOutlinedIcon
            onClick={() => handleOpenDeleteModal(row.tenantId, row.name)}
            className={classes.deleteCustomerIcon}
          />
        )
      }
    ],
    [handleOpenDeleteModal]
  )

  const titleData = {
    mainText: t('ans_customers'),
    iconCapture: t('add_customer'),
    Icon: <PersonAddOutlinedIcon />
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Container>
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={handleOpenCreateCustomer}
          />
        </Container>
        <CustomTable
          classes={classes}
          rows={rows}
          isLoadingData={isLoadingCustomers}
          columns={columns}
        />
        {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={customerToDelete}
            isDeleting={isDeletingCustomer}
            deleteSubject={t('customer')}
          />
        )}
        {isOpenCreateCustomer && (
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
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(CustomersTable)
