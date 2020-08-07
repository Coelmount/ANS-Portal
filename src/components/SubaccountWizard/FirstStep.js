import React, { useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import MobileStepper from '@material-ui/core/MobileStepper'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CheckIcon from '@material-ui/icons/Check'
import SettingsPhoneOutlinedIcon from '@material-ui/icons/SettingsPhoneOutlined'
import basicIcon from 'source/images/svg/dashboard_basic_icon.svg'
import advancedIcon from 'source/images/svg/dashboard_advanced_icon.svg'
import timeBasedRoutingIcon from 'source/images/svg/dasboard_tbr_icon.svg'
import ivrIcon from 'source/images/svg/dashboard_ivr_icon.svg'

import AuthStore from 'stores/Auth'

import useStyles from './styles'

const FirstStep = props => {
  const { handleClose, t, changeStep, step } = props
  const classes = useStyles()
  const { user } = AuthStore

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        <Box className={classes.titleContent}>
          <Box>{t('welcome_to_ans')}!</Box>
          <AccountCircleIcon
            color={'primary'}
            className={classes.accountIcon}
          />
          <Box className={classes.adminName}>
            {user.username ? user.username : ''}
          </Box>
        </Box>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box className={classes.mainContent}>
          <Box className={classes.stepStyles}>{`${t('step')} ${step +
            1}/4`}</Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.regularText}>{t('go_to_your')}</Box>
            <Box className={classes.iconRoundBox}>
              <SettingsPhoneOutlinedIcon />
            </Box>
            <Box className={classes.boldMTNText}>{t('ans_instances')}</Box>
          </Box>
          <Box className={classes.ansInstanceBox}>
            <Box className={`${classes.instanceBox} ${classes.borderInstance}`}>
              <img
                src={basicIcon}
                alt={`basicIcon`}
                className={classes.iconsInstance}
              />
              <Box className={classes.textInstance}>{t('basic')}</Box>
            </Box>
            <Box className={classes.instanceBox}>
              <img
                src={advancedIcon}
                alt={`advancedIcon`}
                className={classes.iconsInstance}
              />
              <Box className={classes.textInstance}>{t('advanced')}</Box>
            </Box>
            <Box className={classes.instanceBox}>
              <img
                src={ivrIcon}
                alt={`ivrIcon`}
                className={classes.iconsInstance}
              />
              <Box className={classes.textInstance}>{t('ivr')}</Box>
            </Box>
            <Box className={classes.instanceBox}>
              <img
                src={timeBasedRoutingIcon}
                alt={`timeBasedRoutingIcon`}
                className={classes.iconsInstance}
              />
              <Box className={classes.textInstance}>
                {t('time_based_routing')}
              </Box>
            </Box>
          </Box>
        </Box>
        <MobileStepper
          variant='dots'
          steps={4}
          position='static'
          activeStep={step}
          className={classes.stepper}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
        >
          {t('skip')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={() => changeStep(1)}
        >
          {t('next')}
          <ChevronRightIcon />
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
