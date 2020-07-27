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
// import AddIVR from './AddIVR'
//import DisableEnableIVR from 'components/DeleteModal'
import DeleteModal from 'components/DeleteModal'

import TimeBaseRoutingStore from 'stores/TimeBaseRouting'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import useStyles from './styles'

const TimeBaseRouting = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const {
    timeBaseRouting,
    isLoadingTBR,
    getTimeBaseRouting
  } = TimeBaseRoutingStore
  // const [showAddIVR, setShowAddIVR] = useState(false)
  // const [ivrForSwitchStatus, setIVRForSwitchStatus] = useState(null)
  // const [ivrForDelete, setIVRForDelete] = useState(null)

  useEffect(() => {
    getTimeBaseRouting(match.customerId, match.groupId)
  }, [])

  // const handleDelete = () => {
  //   deleteIVR(
  //     match.customerId,
  //     match.groupId,
  //     ivrForDelete.serviceUserId,
  //     handleClose
  //   )
  // }

  // const handleClose = () => {
  //   setShowAddIVR(false)
  //   setIVRForSwitchStatus(null)
  //   setIVRForDelete(null)
  //   getIVRs(match.customerId, match.groupId)
  //   getCheckLicensesIVR(match.customerId, match.groupId)
  // }

  const titleData = {
    mainText: t('time_base_routing'),
    iconCapture: t('add'),
    Icon: <AddIcon />
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
              `/customers/${match.customerId}/subaccounts/${match.groupId}/ivr/${row.serviceUserId}`
            )
          }
          className={classes.link}
        >
          {row.name}
        </MaterialLink>
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
        <IconButton
        // onClick={() => setIVRForDelete(row)}
        >
          <CloseOutlinedIcon
          //onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          //className={classes.deleteCustomerIcon}
          />
        </IconButton>
      )
    }
  ]

  if (isLoadingTBR) {
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
            //handleOpen={() => setShowAddIVR(true)}
          />
        </CustomContainer>
        <CustomTable
          rows={[]}
          columns={columns}
          searchCriterias={['name']}
          noAvailableDataMessage={t('no_tbs_available')}
          tableId='tbs'
        />
        {/* {showAddIVR && <AddIVR open={showAddIVR} handleClose={handleClose} />}
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
              name: ivrForDelete.name
            }}
          />
        )} */}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(TimeBaseRouting))
