import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Select from 'components/Select'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import CloseIcon from '@material-ui/icons/Close'
import VolumeUpOutlinedIcon from '@material-ui/icons/VolumeUpOutlined'

import AnnouncementsStore from 'stores/Announcements'
import IVRStore from 'stores/IVR'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const EditGreeting = props => {
  const {
    t,
    open,
    handleClose,
    menuLvl,
    menuType,
    defaultGreeting,
    defaultAudioFile,
    keys,
    announcements
  } = props
  const classes = useStyles()
  const match = useParams()
  const [announcementSelection, setAnnouncementSelection] = useState(
    defaultGreeting
  )
  const [audioFile, setAudioFile] = useState(defaultAudioFile)

  const { isLoadingAnnouncements } = AnnouncementsStore

  const { putUpdateIVRMenu } = IVRStore

  const handleUpdateGreeting = () => {
    let data = {}
    if (announcementSelection === 'Default') {
      data = {
        announcementSelection: 'Default',
        keys: keys
      }
    } else if (announcementSelection === 'Personal') {
      data = {
        announcementSelection: 'Personal',
        keys: keys,
        audioFile: {
          name: audioFile
        }
      }
    }
    putUpdateIVRMenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      menuLvl,
      menuType,
      data,
      handleClose
    )
  }

  if (isLoadingAnnouncements) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        className={classes.rootEditGreeting}
      >
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootEditGreeting}
    >
      <DialogTitle className={classes.title}>
        {t('edit_menu_greeting')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <ModalHelperText title={t('edit_menu_greeting')} />
        <Box>
          <Box>
            <FormControlLabel
              onChange={e => setAnnouncementSelection('Default')}
              checked={announcementSelection === 'Default'}
              control={
                <Radio
                  checkedIcon={<span className={classes.checkedRadioIcon} />}
                  icon={<span className={classes.radioIcon} />}
                />
              }
              label={t('default_greeting')}
            />
          </Box>
          <Box className={classes.personalBox}>
            <FormControlLabel
              onChange={() => setAnnouncementSelection('Personal')}
              checked={announcementSelection === 'Personal'}
              control={
                <Radio
                  checkedIcon={<span className={classes.checkedRadioIcon} />}
                  icon={<span className={classes.radioIcon} />}
                />
              }
              label={t('personal_greeting')}
            />
            <Select
              icon={<VolumeUpOutlinedIcon />}
              selectStyles={classes.select}
              disabled={announcementSelection !== 'Personal'}
              options={announcements.map(el => ({
                value: el.name,
                label: `${el.name}.${el.mediaType}`
              }))}
              value={audioFile}
              onChange={e => setAudioFile(e.target.value)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          disabled={announcementSelection === 'Personal' && !audioFile}
          onClick={handleUpdateGreeting}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditGreeting))
