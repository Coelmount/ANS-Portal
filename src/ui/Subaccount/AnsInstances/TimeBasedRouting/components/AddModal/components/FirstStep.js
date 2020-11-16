import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'

import TimeBaseRoutingStore from 'stores/TimeBasedRouting'
import Input from 'components/Input'
import ModalHelperText from 'components/ModalHelperText'
import Loading from 'components/Loading'

import useStyles from '../styles'

const FirstStep = ({ t, handleClose }) => {
  const classes = useStyles()
  const { customerId, groupId } = useParams()
  const history = useHistory()

  const { postTimeBasedRoute, isTimeBasedRoutePosting } = TimeBaseRoutingStore

  const inputStore = useLocalStore(() => ({
    name: '',
    numberType: '',
    set(field, value) {
      this[field] = value
    },
    get isFieldsValid() {
      return this.name
    }
  }))

  const handleNextButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      history,
      name: inputStore.name
    }
    postTimeBasedRoute(payload)
  }

  if (isTimeBasedRoutePosting) return <Loading />
  return (
    <>
      <DialogTitle className={classes.title}>
        {t('add_tbr_instance')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <div className={classes.helperTextWrap}>
          <ModalHelperText helperText='add_tbr_instance_tbr_step_1' />
        </div>
        <Box className={classes.inputsWrap}>
          <Input
            icon={<PermIdentityOutlined />}
            label={t('name')}
            variant='outlined'
            onChange={e => inputStore.set('name', e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions className={classes.dialogActions}>
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
          disabled={!inputStore.isFieldsValid}
          onClick={handleNextButtonClick}
        >
          {t('Add')}
        </Button>
      </DialogActions>
    </>
  )
}

export default withNamespaces()(observer(FirstStep))
