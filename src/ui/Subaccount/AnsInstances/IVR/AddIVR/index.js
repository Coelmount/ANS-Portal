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

import CloseIcon from '@material-ui/icons/Close'
import NameIVRIcon from 'source/images/svg/nameIVRIcon.svg'

import IVRStore from 'stores/IVR'
import CustomersStore from 'stores/Customers'
import ConfigStore from 'stores/Config'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const AddIVR = props => {
  const { t, open, handleClose, number } = props
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
  const { getCustomer, isLoadingCustomer } = CustomersStore
  const { getConfig, isLoadingConfig, config } = ConfigStore
  const [type, setType] = useState(
    !singleLvl && multiLvl ? 'Standard' : 'Basic'
  )
  const [name, setName] = useState('')

  useEffect(() => {
    getCheckLicensesIVR(match.customerId, match.groupId)
    getCustomer(match.customerId)
    getConfig()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddIVR = () => {
    postAddIVR(match.customerId, match.groupId, {
      ivrInstance: {
        //serviceUserId: `${match.groupId}_ivr${name}@${customer.defaultDomain}`,
        templateName: config.templates.ivr,
        type,
        serviceInstanceProfile: {
          cliFirstName: 'IVR',
          cliLastName: name,
          name,
          phoneNumber: number
        }
      }
    }).then(() => handleClose())
  }

  if (isLoadingLicenses || isLoadingCustomer || isLoadingConfig || addIVR) {
    return (
      <Dialog open={open} onClose={handleClose}>
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
          <div className={classes.loadingModal}>
            <Loading />
          </div>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            variant='outlined'
            color='primary'
            className={classes.cancelButton}
            disabled={addIVR}
            onClick={handleClose}
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
        <div className={classes.helperTextWrap}>
          <ModalHelperText title={t('add_ivr_instance')} />
        </div>
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
              {singleLvl && (
                <FormControlLabel
                  value='Basic'
                  control={
                    <Radio
                      checkedIcon={
                        <span className={classes.checkedRadioIcon} />
                      }
                      icon={<span className={classes.radioIcon} />}
                    />
                  }
                  label={t('single_lvl')}
                />
              )}
              {multiLvl && (
                <FormControlLabel
                  value='Standard'
                  control={
                    <Radio
                      checkedIcon={
                        <span className={classes.checkedRadioIcon} />
                      }
                      icon={<span className={classes.radioIcon} />}
                    />
                  }
                  label={t('multi_lvl')}
                />
              )}
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
          onClick={handleClose}
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
