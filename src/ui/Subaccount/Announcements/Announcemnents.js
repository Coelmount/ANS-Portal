import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import MaterialTable, { MTableToolbar, MTableBody } from 'material-table'

import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

import AnnouncementsStore from 'stores/Announcements'

import AudioPlayer from 'components/AudioPlayer'

import tableIcons from './tableIcons'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ClearIcon from '@material-ui/icons/Clear'
import editIcon from 'source/images/svg/editIcon.svg'
import ImagineDragonsWarrior from 'source/Imagine-dragons-warrior.mp3'

import useStyles from './styles'

const Announcements = props => {
  const { t } = props
  const match = useParams()
  const {
    announcements,
    isLoadingAnnouncements,
    getAnnouncements
  } = AnnouncementsStore
  const classes = useStyles()

  useEffect(() => {
    getAnnouncements(match.customerId, match.groupId)
  }, [])

  const columns = [
    {
      title: '',
      field: 'count',
      cellStyle: { width: 50, textAlign: 'center' }
    },
    {
      title: '',
      field: 'announcement',
      render: rowData => <AudioPlayer url={ImagineDragonsWarrior} />
    },
    {
      title: '',
      field: 'size',
      cellStyle: { width: 300, textAlign: 'center' }
    }
  ]

  const data = announcements.map((el, i) => ({
    count: i + 1,
    announcement: `${el.name}.${el.mediaType}`,
    size: el.fileSize
  }))

  const actions = [
    {
      icon: () => (
        <img src={editIcon} alt='editIcon' className={classes.editIcon} />
      ),
      tooltip: 'Edit announcement',
      onClick: rowData => {
        console.log('edit')
      }
    },
    {
      icon: () => <ClearIcon />,
      tooltip: 'Delete announcement',
      onClick: rowData => {
        console.log('delete')
      }
    }
  ]

  const options = {
    emptyRowsWhenPaging: false,
    search: true,
    showTitle: false,
    searchFieldAlignment: 'left',
    stepped: 'stepped',
    searchFieldVariant: 'outlined',
    actionsColumnIndex: -1,
    header: false,
    pageSizeOptions: [10, 15, 25, 50, 100],
    pageSize: 10,
    showFirstLastPageButtons: false,
    rowStyle: rowData => ({
      height: 70,
      backgroundColor: rowData.count % 2 ? 'white' : '#F9F9F9'
    }),
    cellStyle: {
      border: 'none'
    },
    searchFieldStyle: {
      width: 360
    },
    actionsCellStyle: {
      border: 'none'
    }
  }

  const localization = {
    body: {
      emptyDataSourceMessage: t('announcements_not_found')
    }
  }

  return (
    <React.Fragment>
      <MaterialTable
        localization={localization}
        icons={tableIcons}
        columns={columns}
        data={data}
        actions={actions}
        options={options}
        isLoading={isLoadingAnnouncements}
        style={{
          backgroundColor: '#F9F9F9',
          boxShadow: 'none'
        }}
        components={{
          Toolbar: props => (
            <div
              style={{
                paddingLeft: 0
              }}
            >
              <MTableToolbar
                {...props}
                classes={{
                  root: classes.rootToolbar
                }}
              />
            </div>
          ),
          Pagination: props => (
            <TablePagination
              {...props}
              classes={{
                root: classes.rootPagination
              }}
              labelRowsPerPage=''
              labelDisplayedRows={() => {}}
            />
          )
        }}
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Announcements))
