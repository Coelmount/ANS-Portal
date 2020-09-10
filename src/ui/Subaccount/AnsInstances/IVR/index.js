import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import MaterialLink from '@material-ui/core/Link'

import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import DeleteModal from 'components/DeleteModal'
import AvailableNumbers from './AvailableNumbers'

import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const IVR = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const location = useLocation()
  const {
    ivrs,
    isLoadingIVRs,
    getIVRs,
    getCheckLicensesIVR,
    deleteIVR,
    isDeletingIVR
  } = IVRStore
  const [ivrForDelete, setIVRForDelete] = useState(null)

  useEffect(() => {
    getIVRs(match.customerId, match.groupId)
    getCheckLicensesIVR(match.customerId, match.groupId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = () => {
    deleteIVR(
      match.customerId,
      match.groupId,
      ivrForDelete.serviceUserId,
      handleClose
    )
  }

  const handleClose = () => {
    setIVRForDelete(null)
    getIVRs(match.customerId, match.groupId)
    getCheckLicensesIVR(match.customerId, match.groupId)
  }

  const titleData = {
    mainText: `${t('IVR')}: ${
      location.hash ? t(location.hash.slice(1)) : t('available_numbers')
    }`
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

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        history.push('#available_numbers')
        break
      case 1:
        history.push('#ivrs')
        break
      default:
        break
    }
  }

  const returnActiveTab = () => {
    switch (location.hash) {
      case '#available_numbers':
        return 0
      case '#ivrs':
        return 1
      default:
        return 0
    }
  }

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
            //handleOpen={() => setShowAddIVR(true)}
          />
        </CustomContainer>
      </Paper>
      <Tabs
        className={classes.tabs}
        value={returnActiveTab()}
        indicatorColor='primary'
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
      >
        <Tab value={0} label={t('available_numbers')} className={classes.tab} />
        <Tab value={1} label={t('IVRs')} className={classes.lastTab} />
      </Tabs>

      <TabPanel value={returnActiveTab()} index={0}>
        <AvailableNumbers />
      </TabPanel>
      <TabPanel value={returnActiveTab()} index={1}>
        <CustomTable
          rows={ivrs.filter(el => el.active)}
          columns={columns}
          searchCriterias={['name']}
          noAvailableDataMessage={t('no_ivrs_available')}
          tableId='ivrs'
        />
      </TabPanel>

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
    </div>
  )
}

const TabPanel = props => {
  const { children, value, index, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={classes.tabs}
      role='tabpanel'
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export default withNamespaces()(observer(IVR))
