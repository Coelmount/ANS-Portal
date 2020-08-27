import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'

import MaterialTable, { MTableToolbar } from 'material-table'

import AudioPlayer from 'components/AudioPlayer'
import tableIcons from '../tableIcons'

import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'

import CloseIcon from '@material-ui/icons/Close'

import AnnouncementsStore from 'stores/Announcements'

import useStyles from './styles'

let announcementsForPost = []

const SelectMediaFile = props => {
  const { open, handleClose, t } = props
  const match = useParams()
  const {
    defaultAnnouncements,
    isLoadingDefaultAnnouncements,
    getDefaultAnnouncements,
    getDefaultAnnouncementContent,
    postAddAnnouncements
  } = AnnouncementsStore
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getDefaultAnnouncements()
    announcementsForPost = []
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStyles()

  const columns = [
    {
      title: t('announcement_list'),
      field: 'announcement',
      render: rowData => (
        <AudioPlayer
          titleComponent={<div>{rowData.announcement}</div>}
          url={rowData.url}
          isLoading={rowData.isLoading}
          width={'auto'}
          height={50}
          getAnnouncement={rowData.getAnnouncement}
        />
      ),
      cellStyle: { width: '100%' },
      headerStyle: { fontWeight: 600, fontFamily: 'MTN', fontSize: 16 }
    }
  ]

  const data = defaultAnnouncements.map((el, i) => ({
    ...el,
    count: i + 1,
    announcement: `${el.name}`,
    size: `${el.fileSize} KB`,
    getAnnouncement: () => {
      getDefaultAnnouncementContent(el.name)
    }
  }))

  const options = {
    selection: true,
    search: true,
    showTitle: false,
    searchFieldAlignment: 'left',
    stepped: 'stepped',
    searchFieldVariant: 'outlined',
    actionsColumnIndex: -1,
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
    headerStyle: { backgroundColor: '#f9f9f9', paddingLeft: 20 },
    showTextRowsSelected: false,
    emptyRowsWhenPaging: false,
    selectionProps: {
      style: {
        marginLeft: 20,
        marginRight: 20
      }
    }
  }

  const localization = {
    body: {
      emptyDataSourceMessage: t('announcements_not_found')
    }
  }

  const handleAddAnnouncements = () => {
    const promiseArr = []
    announcementsForPost.map(el =>
      promiseArr.push(
        postAddAnnouncements(match.customerId, match.groupId, {
          name: el.name,
          repositoryAnnouncement: el.name
        })
      )
    )
    setIsLoading(true)
    Promise.all(promiseArr).finally(() => {
      setIsLoading(false)
      handleClose()
    })
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('add_announcements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <MaterialTable
          localization={localization}
          icons={tableIcons}
          columns={columns}
          data={data}
          options={options}
          isLoading={isLoadingDefaultAnnouncements}
          style={{
            backgroundColor: '#F9F9F9',
            boxShadow: 'none'
          }}
          onSelectionChange={rows => {
            announcementsForPost = rows
            // return rows
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
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
          disabled={isLoading}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.updateButton}
          onClick={handleAddAnnouncements}
          disabled={isLoading}
        >
          {`${t('add')}`}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(SelectMediaFile))
