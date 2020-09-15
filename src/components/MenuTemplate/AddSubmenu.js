import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Loading from 'components/Loading'
import Input from 'components/Input'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'
import NameIVRIcon from 'source/images/svg/nameIVRIcon.svg'

import IVRStore from 'stores/IVR'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const EditGreeting = props => {
  const { t, open, handleClose, setSubmenu, config } = props
  const classes = useStyles()
  const match = useParams()
  const [submenuName, setSubmenuName] = useState('')

  const { postAddSubmenu, isAddingSubmenu } = IVRStore

  const successClose = () => {
    setSubmenu(submenuName)
    handleClose()
  }

  const handleAddSubmenu = () => {
    const data = {
      submenuId: submenuName,
      announcementSelection: 'Default',
      keys: config.group.default_keys_submenu
    }

    postAddSubmenu(
      match.customerId,
      match.groupId,
      match.ivrId,
      data,
      //{

      // keys: [
      //   { key: '8', action: 'Repeat Menu', description: 'Repeat Menu' },
      //   { key: '9', action: 'Exit', description: 'Exit' }
      // ]
      //},
      successClose
    )
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.rootEditGreeting}
    >
      <DialogTitle className={classes.title}>
        {t('add_ivr_submenu')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
          disabled={isAddingSubmenu}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <ModalHelperText title={t('add_ivr_submenu')} />
        {isAddingSubmenu ? (
          <Loading />
        ) : (
          <Input
            icon={<img src={NameIVRIcon} alt='NameIVRIcon' />}
            value={submenuName}
            label={t('name')}
            onChange={e => setSubmenuName(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
          disabled={isAddingSubmenu}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          onClick={handleAddSubmenu}
          disabled={isAddingSubmenu}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(EditGreeting))
