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
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import AuthStore from 'stores/Auth'

import useStyles from './styles'

const ThirdStep = props => {
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
            1}/3`}</Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.regularText}>
              {t('go_into_one_of_your')}
            </Box>
            <Box className={classes.boldMTNTextSecondary}>
              {`${t('subaccount')} id`}
            </Box>
          </Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.boldText}>{t('assign')}</Box>
            <Box className={classes.regularText}>{t('the').toLowerCase()}</Box>
            <Box className={classes.boldText}>{t('numbers').toLowerCase()}</Box>
            <Box className={classes.regularText}>
              {t('to_the_account').toLowerCase()}
            </Box>
            <Box className={classes.wrapperBox}>
              <Box className={classes.iconMainRoundBox}>
                <AddOutlinedIcon />
              </Box>
              <Box className={classes.boldMTNText}>{t('add_numbers')}</Box>
            </Box>
          </Box>
          <Box className={classes.checkInfoBoxNoIcon}>
            <Box className={classes.boldText}>{t('now')}</Box>
            <Box className={classes.regularText}>
              {t('start_using_them_for_our').toLowerCase()}
            </Box>
            <Box className={classes.boldText}>{t('ans_instances')}:</Box>
          </Box>
        </Box>
        <MobileStepper
          variant='dots'
          steps={3}
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
          onClick={() => changeStep(2)}
        >
          {t('next')}
          <ChevronRightIcon />
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(ThirdStep))
