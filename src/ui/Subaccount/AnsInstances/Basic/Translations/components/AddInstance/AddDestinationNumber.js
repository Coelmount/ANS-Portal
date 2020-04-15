import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import BasicTranslationsStore from 'stores/BasicTranslations'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import useStyles from './styles'

const AddDestinationNumber = ({ handleClose, t }) => {
  const classes = useStyles()

  const { step, changeStep } = BasicTranslationsStore

  const handleNextButtonClick = () => {}

  return (
    <Fragment>
      <DialogTitle className={classes.title}>
        {t('add_ans_basic_instance')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.subtitle}>
          <Typography className={classes.stepStyles}>{`${t(
            'step'
          )} 1/2`}</Typography>
          <Typography className={classes.setEntitlementsTitle}>
            {t('select_access_phone_number')}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          onClick={handleNextButtonClick}
        >
          {t('next')}
        </Button>
      </DialogActions>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddDestinationNumber))
