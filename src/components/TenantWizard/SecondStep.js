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
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CheckIcon from '@material-ui/icons/Check'
import AddOutlinedIcon from '@material-ui/icons/AddOutlined'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import AuthStore from 'stores/Auth'
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const SecondStep = props => {
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
        <div className={classes.helperTextWrap}>
          <ModalHelperText helperText='welcome_to_ans_step_2_tenant' />
        </div>
        <Box className={classes.mainContent}>
          <Box className={classes.stepStyles}>{`${t('step')} ${
            step + 1
          }/3`}</Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.regularText}>{t('go_to_your')}</Box>
            <Box className={classes.iconRoundBox}>
              <PhoneOutlinedIcon />
            </Box>
            <Box className={classes.boldMTNText}>{t('access_numbers')}</Box>
          </Box>
          <Box className={classes.supportText}>
            {t('entitlements_licenses_info')}
          </Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.regularText}>{t('you_can')}</Box>
            <Box className={classes.boldText}>{t('search').toLowerCase()}</Box>
            <Box className={classes.regularText}>
              {t('our_inventory_for').toLowerCase()}
            </Box>
            <Box className={classes.boldText}>{t('numbers').toLowerCase()}</Box>
            <Box className={classes.wrapperBox}>
              <Box className={classes.boldMTNTextSecondary}>
                {t('see_numbers')}
              </Box>
            </Box>
          </Box>
          <Box className={classes.checkInfoBox}>
            <CheckIcon color={'primary'} className={classes.checkIcon} />
            <Box className={classes.boldText}>{t('assign')}</Box>
            <Box className={classes.regularText}>
              {t('them_to_your_account').toLowerCase()}
            </Box>
            <Box className={classes.wrapperBox}>
              <Box className={classes.iconMainRoundBox}>
                <AddOutlinedIcon />
              </Box>
              <Box className={classes.boldMTNText}>{t('add_numbers')}</Box>
            </Box>
          </Box>
          <Box className={classes.supportText}>
            {t('info_to_assign_numbers_to_subaccount')}
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

export default withNamespaces()(observer(SecondStep))
