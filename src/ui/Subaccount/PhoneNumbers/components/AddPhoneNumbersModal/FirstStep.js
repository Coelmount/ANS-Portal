import React, { useContext } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import sharp from 'source/images/svg/sharp.svg'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import Input from 'components/Input'

import PhoneNumbersStore from 'stores/PhoneNumbers'

import useStyles from './styles'

const FirstStep = (props) => {
  const { handleClose, t } = props
  const { changeStep } = PhoneNumbersStore
  const classes = useStyles()

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        <p>hi</p>
      </DialogTitle>
      <DialogContent>
        <Box className={classes.stepStyles}>{`${t('step')} 1/2`}</Box>
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <p>hi</p>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(FirstStep))
