import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Popover from '@material-ui/core/Popover'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'

import CustomTable from 'components/CustomTable'

import AddIcon from '@material-ui/icons/Add'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'

import useStyles from './styles'

const IVR = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()

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
          //onClick={() => handleOpenDeleteModal(row.groupId, row.groupName)}
          className={classes.deleteCustomerIcon}
        />
      )
    }
  ]

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} classes={classes} />
        </CustomContainer>
        <CustomTable
          rows={[{ name: 'werterw', type: 'dsafd' }]}
          columns={columns}
          searchCriterias={['name']}
          noAvailableDataMessage={t('no_ivrs_available')}
          tableId='ivrs'
        />
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(IVR))
