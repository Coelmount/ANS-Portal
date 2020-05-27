import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import MaterialTable, {
  MTableBody,
  MTableToolbar,
  MTablePagination
} from 'material-table'

import ClearIcon from '@material-ui/icons/Clear'
import editIcon from 'source/images/svg/editIcon.svg'
import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'

import AnnouncementsStore from 'stores/Announcements'

import tableIcons from './tableIcons'
import useStyles from './styles'
import { border } from '@material-ui/system'

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
    { title: '', field: 'count' },
    { title: '', field: 'announcement' },
    { title: '', field: 'size' }
  ]

  const data = [
    { count: '1', announcement: 'test', size: 48 },
    { count: '2', announcement: 'test1', size: 34 },
    { count: '3', announcement: 'test2', size: 56 },
    { count: '4', announcement: 'test3', size: 12 },
    { count: '5', announcement: 'test4', size: 48 },
    { count: '1', announcement: 'test', size: 48 },
    { count: '2', announcement: 'test1', size: 34 },
    { count: '3', announcement: 'test2', size: 56 },
    { count: '4', announcement: 'test3', size: 12 },
    { count: '5', announcement: 'test34', size: 48 },
    { count: '1', announcement: 'test', size: 48 },
    { count: '2', announcement: 'test1', size: 34 },
    { count: '3', announcement: 'test2', size: 56 },
    { count: '4', announcement: 'test23', size: 12 },
    { count: '5', announcement: 'test4', size: 48 },
    { count: '1', announcement: 'test', size: 48 },
    { count: '2', announcement: 'test1', size: 34 },
    { count: '3', announcement: 'test2', size: 56 },
    { count: '4', announcement: 'test3', size: 12 },
    { count: '5', announcement: 'tes32t4', size: 48 },
    { count: '1', announcement: 'test', size: 48 },
    { count: '2', announcement: 'test1', size: 34 },
    { count: '3', announcement: 'test2', size: 56 },
    { count: '4', announcement: 'test3', size: 12 },
    { count: '5', announcement: 'test4', size: 48 }
  ]

  // const data = announcements

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
