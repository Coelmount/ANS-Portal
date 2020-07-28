import React, { Fragment } from 'react'
import classnames from 'classnames'
import { observer, useLocalStore } from 'mobx-react-lite'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import PolicyIcon from '@material-ui/icons/Policy'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'

import AdvancedAccessNumbersStore from 'stores/AdvancedAccessNumbers'
import Input from 'components/Input'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import POLICY_OPTIONS from 'utils/types/policyOptions'

import EditIcon from 'source/images/components/EditIcon'
import useStyles from './styles'

const AddModal = ({ t, open, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, destinationGroupName } = match
  const { postAccessNumber, isAccessNumberPosting } = AdvancedAccessNumbersStore

  const inputStore = useLocalStore(() => ({
    values: {
      name: '',
      policy: '',
      huntAfterNoAnswer: false,
      amountSkipRings: ''
    },
    set(field, value) {
      this.values[field] = value
    },
    get isFieldsFilled() {
      const isMainFields = this.values.name && this.values.policy
      const isOptionalFields =
        this.values.huntAfterNoAnswer && this.values.amountSkipRings

      return (
        (isMainFields && !this.values.huntAfterNoAnswer) ||
        (isMainFields && isOptionalFields)
      )
    }
  }))

  const isAddButtonDisabled = !inputStore.isFieldsFilled

  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      addData: inputStore.values
    }
    postAccessNumber(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      {isAccessNumberPosting ? (
        <Loading />
      ) : (
        <Fragment>
          <DialogTitle className={classes.title}>
            {t('add_group_destination')}
            <IconButton
              aria-label='close'
              onClick={handleClose}
              className={classes.closeButton}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent className={classes.dialogContent}>
            <Input
              icon={<PermIdentityOutlined />}
              label={t('name')}
              variant='outlined'
              value={inputStore.values.name}
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <Select
              icon={<PolicyIcon />}
              options={POLICY_OPTIONS}
              label={t('policy')}
              value={inputStore.values.policy}
              onChange={e => inputStore.set('policy', e.target.value)}
            />
            <Box className={classes.noAnswerWrap}>
              <Checkbox
                checked={inputStore.values.huntAfterNoAnswer}
                onChange={e => {
                  inputStore.set('huntAfterNoAnswer', e.target.checked)
                  inputStore.set('amountSkipRings', '')
                }}
              />
              <Typography className={classes.noAnswerTitle}>
                {t('destination_groups_add_checkbox_title')}
              </Typography>
            </Box>
            {inputStore.values.huntAfterNoAnswer && (
              <Box className={classes.amountSkipRingsWrap}>
                <span className={classes.amountSkipRingsLeftTitle}>
                  {t('skip_after')}
                </span>
                <Input
                  icon={<PhoneForwardedIcon />}
                  type='number'
                  label='x'
                  variant='outlined'
                  value={inputStore.values.amountSkipRings}
                  onChange={e =>
                    inputStore.set('amountSkipRings', e.target.value)
                  }
                />
                <span className={classes.amountSkipRingsRightTitle}>
                  {t('rings')}
                </span>
              </Box>
            )}
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
              onClick={handleAddButtonClick}
              disabled={isAddButtonDisabled}
            >
              {t('add')}
            </Button>
          </DialogActions>
        </Fragment>
      )}
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
