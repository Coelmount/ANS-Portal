import React from 'react'
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
import CheckIcon from '@material-ui/icons/Check'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import basicIcon from 'source/images/svg/dashboard_basic_icon.svg'
import advancedIcon from 'source/images/svg/dashboard_advanced_icon.svg'
import timeBasedRoutingIcon from 'source/images/svg/dasboard_tbr_icon.svg'
import ivrIcon from 'source/images/svg/dashboard_ivr_icon.svg'

import AuthStore from 'stores/Auth'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const ThirdStep = props => {
  const { handleClose, t, step } = props
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
        <div className={classes.helperTextWrap}>
          <ModalHelperText helperText='welcome_to_ans_step_3_tenant' />
        </div>
        <Box className={classes.mainContent}>
          <Box className={classes.stepStyles}>{`${t('step')} ${
            step + 1
          }/3`}</Box>
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
              {t('to_that_account').toLowerCase()}
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
          <Box className={classes.instructionBox}>
            <Box>
              <Box className={`${classes.roundBoxTS} ${classes.bottomLine}`}>
                <img src={advancedIcon} alt={`advancedIcon`} />
              </Box>
              <Box className={classes.bottomTextAdvanced}>{t('advanced')}</Box>
            </Box>
            <Box>
              <Box className={classes.topTextTBR}>
                {t('time_based_routing')}
              </Box>
              <Box className={`${classes.roundBoxTS} ${classes.topLine}`}>
                <img src={timeBasedRoutingIcon} alt={`timeBasedRoutingIcon`} />
              </Box>
            </Box>
            <Box>
              <Box className={`${classes.roundBoxTS} ${classes.bottomLine}`}>
                <img src={ivrIcon} alt={`ivrIcon`} />
              </Box>
              <Box className={classes.bottomTextIVR}>{t('ivr')}</Box>
            </Box>
            <Box>
              <Box className={classes.topTextBasic}>{t('basic')}</Box>
              <Box className={`${classes.roundBoxTS} ${classes.topLine}`}>
                <img src={basicIcon} alt={`basicIcon`} />
              </Box>
            </Box>
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
      <DialogActions className={classes.dialogActionsTS}>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleClose}
        >
          {t('start')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(ThirdStep))
