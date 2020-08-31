import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import phonesSuccessIcon from 'source/images/svg/phones-success.svg'

import useStyles from './styles'

const SuccesPageSub = props => {
  const { handleClose, t, addedNumbersSub, selectedGroup } = props
  const classes = useStyles()

  return (
    <React.Fragment>
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
            <img src={phonesSuccessIcon} alt='' />
          </Box>
          <Box className={classes.successInfo}>
            {t('success_assigned_numbes_sub', {
              countNumbers: addedNumbersSub.length,
              subaccount: selectedGroup
            })}
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
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SuccesPageSub))
