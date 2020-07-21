import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import MaterialTable, { MTableToolbar } from 'material-table'

import TablePagination from '@material-ui/core/TablePagination'

import AnnouncementsStore from 'stores/Announcements'

import AudioPlayer from 'components/AudioPlayer'
import DeleteModal from 'components/DeleteModal'

import tableIcons from './tableIcons'
import ClearIcon from '@material-ui/icons/Clear'

import useStyles from './styles'

const Announcements = props => {
  const { t } = props
  const match = useParams()
  const {
    announcements,
    isLoadingAnnouncements,
    getAnnouncements,
    getAnnouncementContent,
    isDeleting,
    deleteAnnouncement
  } = AnnouncementsStore
  const classes = useStyles()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [announcementForDelete, setAnnouncementForDelete] = useState({})

  useEffect(() => {
    getAnnouncements(match.customerId, match.groupId)
  }, [])

  const columns = [
    {
      title: '',
      field: 'count',
      cellStyle: { width: '10%', textAlign: 'center' }
    },
    {
      title: '',
      field: 'announcement',
      render: rowData => (
        <AudioPlayer
          titleComponent={<div>{rowData.announcement}</div>}
          url={rowData.url}
          isLoading={rowData.isLoading}
          height={50}
          getAnnouncement={rowData.getAnnouncement}
        />
      ),
      cellStyle: { width: '60%' }
    },
    {
      title: '',
      field: 'size',
      cellStyle: { width: '30%', textAlign: 'center' }
    }
  ]

  const data = announcements.map((el, i) => ({
    ...el,
    count: i + 1,
    announcement: `${el.name}.${el.mediaType}`,
    size: `${el.fileSize} KB`,
    getAnnouncement: () => {
      getAnnouncementContent(match.customerId, match.groupId, el.name)
    }
  }))

  const actions = [
    // {
    //   icon: () => (
    //     <img src={editIcon} alt='editIcon' className={classes.editIcon} />
    //   ),
    //   tooltip: 'Edit announcement',
    //   onClick: rowData => {
    //     console.log('edit')
    //   }
    // },
    {
      icon: () => <ClearIcon />,
      tooltip: 'Delete announcement',
      onClick: (event, rowData) => {
        setIsDeleteModalOpen(true)
        setAnnouncementForDelete({ id: rowData.name })
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

  const handleDelete = id => {
    deleteAnnouncement(match.customerId, match.groupId, id).then(() => {
      setIsDeleteModalOpen(false)
      getAnnouncements(match.customerId, match.groupId)
    })
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    getAnnouncements(match.customerId, match.groupId)
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
      {isDeleteModalOpen && (
        <DeleteModal
          open={isDeleteModalOpen}
          handleClose={handleCloseDeleteModal}
          handleDelete={handleDelete}
          deleteInfo={announcementForDelete}
          isDeleting={isDeleting}
          deleteSubject={`${t('announcement').toLowerCase()}`}
          action={t('to_delete')}
          titleAction={t(`delete`)}
        />
      )}
    </React.Fragment>
  )
}

export default withNamespaces()(observer(Announcements))
