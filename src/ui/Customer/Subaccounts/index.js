import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import SubaccountsStore from 'stores/Subaccounts'
import PhoneNumbersStore from 'stores/PhoneNumbers'
import CreateCustomerStore from 'stores/CreateCustomer'
import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteConfirmModal from 'components/DeleteConfirmModal'
import CustomTable from 'components/CustomTable'
import CreateCustomer from 'components/CreateCustomerModal'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Loading from 'components/Loading'
import NoNumbersModal from './components/NoNumbersModal'

import useStyles from './styles'

const SubaccountsTable = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()

  const {
    rows,
    getSubaccounts,
    deleteSubaccount,
    isLoadingSubaccounts,
    isDeletingSubaccount,
    getDefaultValues
  } = SubaccountsStore

  const {
    getPhoneNumbers,
    transformedPhoneNumbers,
    isPhoneNumbersLoading,
    clearPhoneNumbers,
    isGetPhoneNumbersRequestDone
  } = PhoneNumbersStore

  const {
    setDefaultValues: setDefaultCreateCustomerValues
  } = CreateCustomerStore

  const { setDefaultValues } = CreateSubaccountStore

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [subaccountToDelete, setSubaccountToDelete] = useState({})
  const [isOpenCreateSubaccount, setIsOpenCreateSubaccount] = useState(false)
  const [clickedGroupId, setClickedGroupId] = useState('')
  const [isNoNumbersModalOpen, setIsNoNumbersModalOpen] = useState(false)

  const isLoading =
    isLoadingSubaccounts || (isPhoneNumbersLoading && clickedGroupId)

  useEffect(() => {
    getSubaccounts(match.customerId)
  }, [getSubaccounts, match.customerId])

  useEffect(() => {
    // To clear created customer data, which we use in stepper: create customer => create subaccount for created customer
    setDefaultCreateCustomerValues()

    return () => {
      getDefaultValues()
      clearPhoneNumbers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (transformedPhoneNumbers.length && clickedGroupId) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${clickedGroupId}/ans_instances`
      )
    } else if (clickedGroupId && isGetPhoneNumbersRequestDone === true) {
      setIsNoNumbersModalOpen(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transformedPhoneNumbers])

  const columns = [
    {
      id: 'groupId',
      numeric: false,
      extraProps: {
        scope: 'row'
      },
      label: 'ID',
      getCellData: row => {
        return (
          <Typography
            onClick={() => handleIdClick(row.groupId)}
            className={classes.link}
          >
            {row.groupId}
          </Typography>
        )
      },
      extraHeadProps: {
        padding: 'default'
      }
    },
    {
      id: 'groupName',
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
      isSortAvailable: false,
      getCellData: row => (
        <CloseOutlinedIcon
          onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  const titleData = {
    mainText: 'MTN ANS',
    helperText: 'subaccounts',
    iconCapture: t('add_subaccount'),
    Icon: <AddOutlinedIcon />
  }

  const handleOpenDeleteModal = (id, name) => {
    setIsDeleteModalOpen(true)
    setSubaccountToDelete({ id, name })
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
  }

  const handleCloseCreateSubaccount = () => {
    setIsOpenCreateSubaccount(false)
  }

  const handleOpenCreateSubaccount = () => {
    setDefaultValues()
    setIsOpenCreateSubaccount(true)
  }

  const handleCloseCreateSubaccountSuccess = () => {
    setIsOpenCreateSubaccount(false)
    getSubaccounts(match.customerId)
  }

  const handleDelete = () => {
    const payload = {
      tenantId: match.customerId,
      groupId: subaccountToDelete.id,
      callback: setIsDeleteModalOpen
    }
    deleteSubaccount(payload)
  }

  const handleIdClick = groupId => {
    getPhoneNumbers(match.customerId, groupId, 1, 10)
    setClickedGroupId(groupId)
  }

  const handleCloseNoNumbersModal = () => {
    setIsNoNumbersModalOpen(false)
    getSubaccounts(match.customerId)
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            handleOpen={handleOpenCreateSubaccount}
          />
        </CustomContainer>

        {isLoading ? (
          <Loading />
        ) : (
          <CustomTable
            rows={rows}
            columns={columns}
            searchCriterias={['groupId', 'groupName']}
            noAvailableDataMessage={t('no_subaccounts_available')}
            tableId='subaccounts'
          />
        )}
        {isDeleteModalOpen && (
          <DeleteConfirmModal
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            isLoading={isDeletingSubaccount}
            title='delete_subaccount'
            deleteSubject={t('subaccount')}
            deleteObject={`${subaccountToDelete.name} (id: ${subaccountToDelete.id})`}
          />
        )}
        {isOpenCreateSubaccount && (
          <CreateCustomer
            open={isOpenCreateSubaccount}
            handleClose={handleCloseCreateSubaccount}
            successClose={handleCloseCreateSubaccountSuccess}
            isCreateSubaccount
            store={CreateSubaccountStore}
          />
        )}
        {isNoNumbersModalOpen && (
          <NoNumbersModal
            open={isNoNumbersModalOpen}
            handleClose={handleCloseNoNumbersModal}
            clickedGroupId={clickedGroupId}
          />
        )}
      </Paper>
    </div>
  )
})

export default withNamespaces()(SubaccountsTable)
