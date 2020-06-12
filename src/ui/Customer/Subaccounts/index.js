import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'

import SubaccountsStore from 'stores/Subaccounts'
import PhoneNumbersStore from 'stores/PhoneNumbers'
import CreateSubaccountStore from 'stores/CreateSubaccount'
import TitleBlock from 'components/TitleBlock'
import DeleteModal from 'components/DeleteModal'
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
    clearPhoneNumbers
  } = PhoneNumbersStore

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
    return () => {
      getDefaultValues()
      clearPhoneNumbers()
    }
  }, [getDefaultValues])

  useEffect(() => {
    if (transformedPhoneNumbers.length && clickedGroupId) {
      history.push(
        `/customers/${match.customerId}/subaccounts/${clickedGroupId}/ans_instances`
      )
    } else if (clickedGroupId) {
      setIsNoNumbersModalOpen(true)
    }
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

  const handleDelete = groupId => {
    const payload = {
      tenantId: match.customerId,
      groupId,
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
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={subaccountToDelete}
            isDeleting={isDeletingSubaccount}
            deleteSubject={t('subaccount')}
            action={t('to_delete')}
            titleAction={t(`delete`)}
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
