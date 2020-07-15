import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import UpdateMainNumber from './UpdateMainNumber'
// import AddInstance from '../AddInstance'
// import DeleteModal from 'components/DeleteModal'

import EditIcon from 'source/images/svg/edit-blue.svg'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const AccessNumbers = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const [showEditMainNumber, setShowEditMainNumber] = useState(false)

  const {
    getMainNumber,
    isLoadingMainNumber,
    mainNumber,
    isLoadingSecondaryNumbers,
    secondaryNumbers,
    getSecondaryNumber
  } = IVRStore

  useEffect(() => {
    getMainNumber(match.customerId, match.groupId, match.ivrId)
    getSecondaryNumber(match.customerId, match.groupId, match.ivrId)
  }, [])

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
    }
  ]

  if (isLoadingMainNumber) {
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
          handleClose={() => setShowEditMainNumber(false)}
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

      {/* {isAddInstanceModalOpen && (
          <AddInstance
            open={isAddInstanceModalOpen}
            handleClose={handleAddInstanceModalClose}
          />
        )} */}
      {/* {isDeleteModalOpen && (
          <DeleteModal
            classes={classes}
            open={isDeleteModalOpen}
            handleClose={handleCloseDeleteModal}
            handleDelete={handleDelete}
            deleteInfo={instancesForDelete}
            isDeleting={isDeleting}
            deleteSubject={`${t('translation').toLowerCase()}(s)`}
            action={t('to_delete')}
            titleAction={t(`delete`)}
          />
        )} */}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(AccessNumbers))
