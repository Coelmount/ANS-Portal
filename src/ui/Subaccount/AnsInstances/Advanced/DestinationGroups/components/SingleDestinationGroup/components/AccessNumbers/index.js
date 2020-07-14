import React, { useEffect, useState, Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams, Link } from 'react-router-dom'
import classnames from 'classnames'

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import UpdateIcon from '@material-ui/icons/Update'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'

import TitleBlock from 'components/TitleBlock'
import CustomTable from 'components/CustomTable'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import transformOnChange from 'utils/tableCheckbox/transformOnChange'
import transformOnCheckAll from 'utils/tableCheckbox/transformOnCheckAll'
import transformOnHover from 'utils/tableCheckbox/transformOnHover'
// import AddInstance from '../AddInstance'
// import DeleteModal from 'components/DeleteModal'

import AccessNumbersStore from 'stores/DestinationGroups/AccessNumbers'

import useStyles from './styles'
import deleteIcon from 'source/images/svg/delete-icon.svg'
import notificationIcon from 'source/images/svg/no-numbers-notification.svg'

const AccessNumbers = observer(({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, destinationGroupName } = match

  const {
    getMainNumber,
    getSecondaryNumbers,
    mainNumber,
    secondaryNumbers,
    isMainNumberLoading
  } = AccessNumbersStore

  useEffect(() => {
    const payload = {
      customerId,
      groupId,
      destinationGroupName
    }
    getMainNumber(payload)
    getSecondaryNumbers(payload)
  }, [])

  const columns = [
    { id: 'country', label: 'country' },
    {
      id: 'value',
      label: 'phone_number'
    }
  ]
  const isLoading = false
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography className={classes.mainTitle}>
          {t('main_number')}
        </Typography>
        {isMainNumberLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <CustomTable
              firstCell={true}
              rows={[mainNumber]}
              columns={columns}
              showSearchBar={false}
              showPagination={false}
              classes={classes}
              searchCriterias={['value', 'country']}
              noAvailableDataMessage={t('no_translations_available')}
              tableId={'ans_basic_translations'}
            />
          </Fragment>
        )}

        <Typography className={classes.secondaryNumbersTitle}>
          {t('secondary_numbers')}
        </Typography>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            <CustomTable
              firstCell={true}
              rows={secondaryNumbers}
              columns={columns}
              showSearchBar={false}
              showPagination={false}
              classes={classes}
              searchCriterias={['value', 'country']}
              noAvailableDataMessage={t('no_translations_available')}
              tableId={'ans_basic_translations'}
            />
          </Fragment>
        )}

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
      </Paper>
    </div>
  )
})

export default withNamespaces()(AccessNumbers)
