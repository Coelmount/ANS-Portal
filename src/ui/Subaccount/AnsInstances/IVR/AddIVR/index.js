import React, { useState, useEffect } from 'react'
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
import Box from '@material-ui/core/Box'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

import CloseIcon from '@material-ui/icons/Close'
import NameIVRIcon from 'source/images/svg/nameIVRIcon.svg'

import IVRStore from 'stores/IVR'

import useStyles from './styles'

const AddIVR = props => {
  const { t, open, handleClose } = props
  const classes = useStyles()
  const match = useParams()
  const {
    singleLvl,
    multiLvl,
    getCheckLicensesIVR,
    isLoadingLicenses,
    postAddIVR,
    addIVR
  } = IVRStore
  const [type, setType] = useState(
    !singleLvl && multiLvl ? 'Standard' : 'Basic'
  )
  const [serviceUserId, setServiceUserId] = useState(
    `${match.groupId}_ivr${(Math.floor(Math.random() * 10000) + 10000)
      .toString()
      .substring(1)}`
  )
  const [name, setName] = useState('')

  useEffect(() => {
    getCheckLicensesIVR(match.customerId, match.groupId)
  }, [])

  const handleAddIVR = () => {
    postAddIVR(match.customerId, match.groupId, {
      serviceUserId,
      templateName: 'ANS_IVR',
      type,
      serviceInstanceProfile: { name }
    })
  }

  if (isLoadingLicenses) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <Loading />
      </Dialog>
    )
  }

  return (
    <Dialog
      open={open}
      onClose={!addIVR && handleClose}
      className={classes.root}
    >
      <DialogTitle className={classes.title}>
        {t('add_ivr_instance')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
          disabled={addIVR}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.contentWrapper}>
          <Input
            icon={<img src={NameIVRIcon} alt='NameIVRIcon' />}
            label={t('name')}
            variant='outlined'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Box className={classes.radioBoxWrapper}>
            <Box className={classes.radioLabel}>{t('type')}:</Box>
            <RadioGroup
              name='type'
              row
              value={type}
              onChange={e => setType(e.target.value)}
            >
              <FormControlLabel
                value='Basic'
                control={
                  <Radio
                    checkedIcon={<span className={classes.checkedRadioIcon} />}
                    icon={<span className={classes.radioIcon} />}
                  />
                }
                label={t('single_lvl')}
              />
              <FormControlLabel
                value='Standard'
                control={
                  <Radio
                    checkedIcon={<span className={classes.checkedRadioIcon} />}
                    icon={<span className={classes.radioIcon} />}
                  />
                }
                label={t('multi_lvl')}
              />
            </RadioGroup>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          disabled={addIVR}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          onClick={handleAddIVR}
          disabled={!name || addIVR}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddIVR))
