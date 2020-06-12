import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import Switch from 'components/Switch'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import CustomTable from 'components/CustomTable'
import AddIVR from './AddIVR'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const IVR = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const {
    ivrs,
    isLoadingIVRs,
    getIVRs,
    singleLvl,
    multiLvl,
    getCheckLicensesIVR,
    isLoadingLicenses
  } = IVRStore
  const [showAddIVR, setShowAddIVR] = useState(true)

  useEffect(() => {
    getIVRs(match.customerId, match.groupId)
    getCheckLicensesIVR(match.customerId, match.groupId)
  }, [])

  const titleData = {
    mainText: 'IVR',
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
      }
    },
    {
      id: 'type',
      numeric: false,
      label: t('type'),
      extraProps: {
        scope: 'row'
      }
    },
    {
      id: 'disEn',
      numeric: false,
      label: `${t('disable')}/${t('enable')}`,
      extraProps: {
        scope: 'row'
      },
      getCellData: row => (
        <Switch
          checked={row.active}
          // handleChange={e =>
          //   setSelectedStatus(
          //     e.target.checked === true ? item.name : ''
          //   )
          // }
        />
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
        <IconButton>
          <CloseOutlinedIcon
          //onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          //className={classes.deleteCustomerIcon}
          />{' '}
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
          rows={ivrs}
          columns={columns}
          searchCriterias={['name']}
          noAvailableDataMessage={t('no_ivrs_available')}
          tableId='ivrs'
        />
        {showAddIVR && (
          <AddIVR
            open={showAddIVR}
            handleClose={() => {
              setShowAddIVR(false)
              getIVRs(match.customerId, match.groupId)
            }}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(IVR))
