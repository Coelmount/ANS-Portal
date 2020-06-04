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

import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import ArrowDropUpOutlinedIcon from '@material-ui/icons/ArrowDropUpOutlined'
import ArrowDropDownOutlinedIcon from '@material-ui/icons/ArrowDropDownOutlined'

import Loading from 'components/Loading'
import TitleBlock from 'components/TitleBlock'
import CustomContainer from 'components/CustomContainer'
import CustomBreadcrumbs from 'components/CustomBreadcrumbs'
import Announcements from './Announcemnents'
import UploadMediaFile from './UploadMediaFile'
import SelectFromLibrary from './SelectFromLibrary'
import RecordAudio from './RecordAudio'

import AnnouncementsStore from 'stores/Announcements'

import useStyles from './styles'

const AnnouncementsPage = props => {
  const { t } = props
  const classes = useStyles()
  const match = useParams()
  const [anchorEl, setAnchorEl] = useState(null)
  const [showUploadMedia, setShowUploadMedia] = useState(false)
  const [showSelectMedia, setShowSelectMedia] = useState(false)
  const [showRecordAudio, setShowRecordAudio] = useState(true)

  const { getAnnouncements } = AnnouncementsStore

  const isAddPopoverOpen = Boolean(anchorEl)
  const id = isAddPopoverOpen ? 'simple-popover' : undefined

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const addPopoverItems = [
    {
      id: 1,
      label: t('upload_media_file'),
      onClick: () => {
        setShowUploadMedia(true)
        setAnchorEl(null)
      }
    },
    {
      id: 2,
      label: t('record_announcements'),
      onClick: () => {
        setShowRecordAudio(true)
        setAnchorEl(null)
      }
    },
    {
      id: 3,
      label: t('select_from_our_library'),
      onClick: () => {
        setShowSelectMedia(true)
        setAnchorEl(null)
      }
    }
  ]

  const titleData = {
    mainText: t('announcements'),
    buttonBlock: (
      <Box className={classes.addCustomerWrap}>
        <Button
          onClick={handlePopoverOpen}
          className={classes.addIconButton}
          variant='contained'
          color='primary'
        >
          <AddOutlinedIcon />
        </Button>
        <Box className={classes.addTitleWrap}>
          <Typography className={classes.addCustomerTitle}>
            {t('add')}
          </Typography>
          <ArrowDropUpOutlinedIcon className={classes.upArrowIcon} />
          <ArrowDropDownOutlinedIcon className={classes.downArrowIcon} />
        </Box>
        <Popover
          id={id}
          open={isAddPopoverOpen}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'right'
          }}
        >
          <Box className={classes.addPopoverWrap}>
            {addPopoverItems.map(item => (
              <MenuItem
                onClick={item.onClick}
                value={item.label}
                key={item.id}
                className={classes.addPopoverItem}
              >
                <Typography>{item.label}</Typography>
              </MenuItem>
            ))}
          </Box>
        </Popover>
      </Box>
    )
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <CustomBreadcrumbs />
          <TitleBlock titleData={titleData} classes={classes} />
        </CustomContainer>
        <Announcements />
        {showUploadMedia && (
          <UploadMediaFile
            open={showUploadMedia}
            handleClose={() => {
              setShowUploadMedia(false)
              getAnnouncements(match.customerId, match.groupId)
            }}
          />
        )}
        {showSelectMedia && (
          <SelectFromLibrary
            open={showSelectMedia}
            handleClose={() => {
              setShowSelectMedia(false)
              getAnnouncements(match.customerId, match.groupId)
            }}
          />
        )}
        {showRecordAudio && (
          <RecordAudio
            open={showRecordAudio}
            handleClose={() => {
              setShowRecordAudio(false)
              getAnnouncements(match.customerId, match.groupId)
            }}
          />
        )}
      </Paper>
    </div>
  )
}

export default withNamespaces()(observer(AnnouncementsPage))
