import React from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'

import MaterialTable, {
  MTableBody,
  MTableToolbar,
  MTablePagination
} from 'material-table'

import tableIcons from './tableIcons'
import useStyles from './styles'

const Announcements = props => {
  const { t } = props
  const classes = useStyles()

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
    { count: '5', announcement: 'test4', size: 48 }
  ]

  const actions = [
    {
      icon: 'Edit',
      tooltip: 'Edit announcement'
    },
    rowData => ({
      icon: 'Delete',
      tooltip: 'Delete announcement'
    })
  ]

  const options = {
    search: true,
    searchFieldAlignment: 'left',
    stepped: 'stepped',
    searchFieldVariant: 'outlined',
    actionsColumnIndex: -1,
    header: false,
    pageSizeOptions: [10, 15, 25, 50, 100],
    pageSize: 10,
    rowStyle: rowData => ({
      height: 70,
      backgroundColor: rowData.count % 2 ? 'white' : '#F9F9F9'
    })
  }

  return (
    <React.Fragment>
      <MaterialTable
        icons={tableIcons}
        columns={columns}
        data={data}
        actions={actions}
        title={false}
        options={options}
        style={{
          backgroundColor: '#F9F9F9',
          boxShadow: 'none'
        }}
      />
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Announcements))
