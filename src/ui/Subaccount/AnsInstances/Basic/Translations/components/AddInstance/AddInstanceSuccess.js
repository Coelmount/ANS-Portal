import React, { Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useHistory, useParams } from 'react-router-dom'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import addSuccess from 'source/images/svg/basic_instance_add_success.svg'

import BasicTranslationsStore from 'stores/BasicTranslations'

import useStyles from './styles'

const AddInstanceSuccess = ({ handleClose, t }) => {
  const classes = useStyles()
  console.log(handleClose, 'close')
  const { changeStep } = BasicTranslationsStore

  return (
    <Fragment>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        className={classes.successClose}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent className={classes.successDialog}>
        <Box className={classes.successBox}>
          <Box className={classes.successIconBox}>
            <img src={addSuccess} alt='add success' />
          </Box>
          <Box className={classes.successTitle}>
            {t('basic_instance_add_success')}
          </Box>
        </Box>
        <Box className={classes.phoneAddedButtonWrap}>
          <Button
            variant='contained'
            color='primary'
            className={classes.okButton}
            onClick={handleClose}
          >
            {'OK'}
          </Button>
        </Box>
      </DialogContent>
    </Fragment>
  )
}

export default withNamespaces()(observer(AddInstanceSuccess))
