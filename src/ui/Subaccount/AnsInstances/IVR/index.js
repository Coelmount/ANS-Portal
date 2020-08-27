import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory } from 'react-router-dom'
import MaterialLink from '@material-ui/core/Link'

import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

//import Switch from 'components/Switch'
import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import AddIVR from './AddIVR'
//import DisableEnableIVR from 'components/DeleteModal'
import DeleteModal from 'components/DeleteModal'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const IVR = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const {
    ivrs,
    isLoadingIVRs,
    getIVRs,
    singleLvl,
    multiLvl,
    getCheckLicensesIVR,
    deleteIVR,
    isDeletingIVR
  } = IVRStore
  const [showAddIVR, setShowAddIVR] = useState(false)
  const [ivrForSwitchStatus, setIVRForSwitchStatus] = useState(null)
  const [ivrForDelete, setIVRForDelete] = useState(null)

  useEffect(() => {
    getIVRs(match.customerId, match.groupId)
    getCheckLicensesIVR(match.customerId, match.groupId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const handleSwitchStatus = () => {
  //   putUpdateIVR(
  //     match.customerId,
  //     match.groupId,
  //     ivrForSwitchStatus.serviceUserId,
  //     {
  //       ivrInstance: {
  //         active: !ivrForSwitchStatus.active,
  //         serviceUserId: ivrForSwitchStatus.serviceUserId
  //       }
  //     },
  //     handleClose
  //   )
  // }

  const handleDelete = () => {
    deleteIVR(
      match.customerId,
      match.groupId,
      ivrForDelete.serviceUserId,
      handleClose
    )
  }

  const handleClose = () => {
    setShowAddIVR(false)
    setIVRForSwitchStatus(null)
    setIVRForDelete(null)
    getIVRs(match.customerId, match.groupId)
    getCheckLicensesIVR(match.customerId, match.groupId)
  }

  const titleData = {
    mainText: 'IVR',
    iconCapture: t('add'),
    Icon: <AddIcon />,
    disabled: !singleLvl && !multiLvl
  }

  const columns = [
    {
      id: 'name',
      numeric: false,
      label: t('name'),
      extraProps: {
        scope: 'row'
      },
      getCellData: row => (
        <MaterialLink
          onClick={() =>
            history.push(
              `/customers/${match.customerId}/subaccounts/${match.groupId}/ans_instances/ivr/${row.serviceUserId}`
            )
          }
          className={classes.link}
        >
          {row.name}
        </MaterialLink>
      )
    },
    {
      id: 'type',
      numeric: false,
      label: t('type'),
      extraProps: {
        scope: 'row'
      },
      getCellData: row => (row.type === 'Basic' ? 'Single level' : 'Multilevel')
    },
    // {
    //   id: 'disEn',
    //   numeric: false,
    //   label: `${t('disable')}/${t('enable')}`,
    //   extraProps: {
    //     scope: 'row'
    //   },
    //   getCellData: row => (
    //     <Switch
    //       checked={row.active}
    //       handleChange={() => setIVRForSwitchStatus(row)}
    //     />
    //   )
    // },
    {
      id: 'delete',
      extraProps: {
        className: classes.deleteCell,
        align: 'right'
      },
      isSortAvailable: false,
      getCellData: row => (
        <IconButton onClick={() => setIVRForDelete(row)}>
          <CloseOutlinedIcon
          //onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          //className={classes.deleteCustomerIcon}
          />
        </IconButton>
      )
    }
  ]

  if (isLoadingIVRs) {
    return <Loading />
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock
            titleData={titleData}
            classes={classes}
            handleOpen={() => setShowAddIVR(true)}
          />
        </CustomContainer>
        <CustomTable
          rows={ivrs.filter(el => el.active)}
          columns={columns}
          searchCriterias={['name']}
          noAvailableDataMessage={t('no_ivrs_available')}
          tableId='ivrs'
        />
        {showAddIVR && <AddIVR open={showAddIVR} handleClose={handleClose} />}
        {/* {ivrForSwitchStatus && (
          <DisableEnableIVR
            open={ivrForSwitchStatus}
            action={
              ivrForSwitchStatus.active ? t('to_disable') : t('to_enable')
            }
            titleAction={ivrForSwitchStatus.active ? t('disable') : t('enable')}
            handleClose={handleClose}
            deleteSubject={t('ans_ivr_instance')}
            extraDeleteSubject={'ANS IVR'}
            deleteInfo={{
              name: `${ivrForSwitchStatus.name}, ${
                ivrForSwitchStatus.type === 'Basic'
                  ? 'Single level'
                  : 'Multilevel'
              }`
            }}
            handleDelete={handleSwitchStatus}
            isDeleting={isUpdatingIVR}
          />
        )} */}
        {ivrForDelete && (
          <DeleteModal
            open={ivrForDelete}
            handleClose={handleClose}
            handleDelete={handleDelete}
            isDeleting={isDeletingIVR}
            action={t('to_delete')}
            titleAction={t(`delete`)}
            deleteSubject={t('ans_ivr_instance')}
            deleteInfo={{
              name: ivrForDelete.name,
              id: ivrForDelete.serviceUserId
            }}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(IVR))
