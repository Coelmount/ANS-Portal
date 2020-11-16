import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import UpdateMainNumber from './UpdateMainNumber'
import AddSecondaryNumbers from './AddSecondaryNumbers'
import DeleteModal from 'components/DeleteModal'

import EditIcon from 'source/images/svg/edit-blue.svg'
import RemoveIcon from '@material-ui/icons/Clear'
import AddIcon from '@material-ui/icons/Add'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const AccessNumbers = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const [showEditMainNumber, setShowEditMainNumber] = useState(false)
  const [showAddSecondaryNumbers, setShowAddSecondaryNumbers] = useState(false)
  const [deleteNumber, setDeleteNumber] = useState({})
  const [showDeleteNumber, setShowDeleteNumber] = useState(false)

  const {
    getMainNumber,
    getAvailableNumbers,
    availableNumbers,
    isLoadingMainNumber,
    mainNumber,
    isLoadingSecondaryNumbers,
    secondaryNumbers,
    getSecondaryNumber,
    isAddingSecondaryNumbers,
    putAddSecondaryNumbers
  } = IVRStore

  const isAvailableNumbersExist = availableNumbers.length

  useEffect(() => {
    const payload = {
      customerId: match.customerId,
      groupId: match.groupId,
      page: 1,
      rowsPerPage: 1
    }
    getMainNumber(match.customerId, match.groupId, match.ivrId)
    getSecondaryNumber(match.customerId, match.groupId, match.ivrId)
    // Disable Add button if there are no available numbers
    getAvailableNumbers(payload)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCloseDeleteModal = () => {
    setShowDeleteNumber(false)
    getSecondaryNumber(match.customerId, match.groupId, match.ivrId)
  }

  const handleDelete = id => {
    const data = {
      id: id,
      delete: true
    }
    putAddSecondaryNumbers(
      match.customerId,
      match.groupId,
      match.ivrId,
      [data],
      handleCloseDeleteModal
    )
  }

  // const handleChangePriority = (newId, oldId) => {
  //   if (secondaryNumbers.some(el => el.id === newId)) {
  //     const phone = secondaryNumbers.find(el => el.id === oldId)
  //     const swapPhone = secondaryNumbers.find(el => el.id === newId)
  //     const data = [
  //       {
  //         id: oldId,
  //         cc_number: `+${getCC(swapPhone.value)}`,
  //         number: getNSN(swapPhone.value)
  //       },
  //       {
  //         id: newId,
  //         cc_number: `+${getCC(phone.value)}`,
  //         number: getNSN(phone.value)
  //       }
  //     ]
  //     putAddSecondaryNumbers(
  //       match.customerId,
  //       match.groupId,
  //       match.ivrId,
  //       data,
  //       handleCloseDeleteModal
  //     )
  //   } else {
  //     const phone = secondaryNumbers.find(el => el.id === oldId)
  //     const data = [
  //       {
  //         id: oldId,
  //         delete: true
  //       },
  //       {
  //         id: newId,
  //         cc_number: `+${getCC(phone.value)}`,
  //         number: getNSN(phone.value)
  //       }
  //     ]
  //     putAddSecondaryNumbers(
  //       match.customerId,
  //       match.groupId,
  //       match.ivrId,
  //       data,
  //       handleCloseDeleteModal
  //     )
  //   }
  // }

  const mainNumberColumns = [
    {
      id: 'country',
      label: 'country'
    },
    {
      id: 'value',
      label: 'phone_number'
    }
  ]

  const secondaryNumbersColumns = [
    {
      id: 'country',
      label: 'country'
    },
    {
      id: 'value',
      label: 'phone_number'
    },
    // {
    //   id: 'id',
    //   label: 'priority',
    //   getCellData: row => (
    //     <Select
    //       value={row.id}
    //       variant='outlined'
    //       onChange={e => handleChangePriority(e.target.value, row.id)}
    //     >
    //       {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(el => (
    //         <MenuItem key={el} value={el}>
    //           {el}
    //         </MenuItem>
    //       ))}
    //     </Select>
    //   )
    // },
    {
      id: 'delete',
      isSortAvailable: false,
      getCellData: row => (
        <Button
          className={classes.roundButtonEdit}
          onClick={() => {
            setDeleteNumber({ name: row.value, id: row.id })
            setShowDeleteNumber(true)
          }}
        >
          <RemoveIcon />
        </Button>
      )
    }
  ]

  if (isLoadingMainNumber || isLoadingSecondaryNumbers) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <Typography className={classes.mainTitle}>
        {t('main_number')}
        <Button
          className={classes.roundButtonEdit}
          onClick={() => setShowEditMainNumber(true)}
        >
          <img src={EditIcon} alt='EditIcon' />
        </Button>
      </Typography>
      {showEditMainNumber && (
        <UpdateMainNumber
          open={showEditMainNumber}
          handleClose={() => {
            setShowEditMainNumber(false)
            getMainNumber(match.customerId, match.groupId, match.ivrId)
          }}
        />
      )}
      <CustomTable
        firstCell={true}
        rows={mainNumber.value ? [mainNumber] : []}
        columns={mainNumberColumns}
        showSearchBar={false}
        showPagination={false}
        showToolBar={false}
        noAvailableDataMessage={t('no_phone_numbers_available')}
      />

      <Typography className={classes.mainTitle}>
        {t('secondary_numbers')}{' '}
      </Typography>

      <CustomTable
        firstCell={true}
        rows={secondaryNumbers}
        columns={secondaryNumbersColumns}
        showSearchBar={false}
        showPagination={false}
        showToolBar={false}
        noAvailableDataMessage={t('no_phone_numbers_available')}
      />

      {showAddSecondaryNumbers && (
        <AddSecondaryNumbers
          open={showAddSecondaryNumbers}
          handleClose={() => {
            setShowAddSecondaryNumbers(false)
            getSecondaryNumber(match.customerId, match.groupId, match.ivrId)
          }}
        />
      )}
      <Box className={classes.addButtonBox}>
        <Tooltip
          title={isAvailableNumbersExist ? '' : t('no_phone_numbers_available')}
        >
          <div>
            <Button
              variant={'contained'}
              color={'primary'}
              className={classes.roundButton}
              onClick={() => setShowAddSecondaryNumbers(true)}
              disabled={
                secondaryNumbers.length >= 10 || !isAvailableNumbersExist
              }
            >
              <AddIcon />
            </Button>
          </div>
        </Tooltip>
        <Box>{`${t('add')} (max 10)`}</Box>
      </Box>
      {showDeleteNumber && (
        <DeleteModal
          open={showDeleteNumber}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
          isDeleting={isAddingSecondaryNumbers}
          action={t('to_delete')}
          titleAction={t(`delete`)}
          deleteSubject={t('number').toLowerCase()}
          deleteInfo={deleteNumber}
        />
      )}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(AccessNumbers))
