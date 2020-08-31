import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import PolicyIcon from '@material-ui/icons/Policy'

import DestinationGroupsStore from 'stores/DestinationGroups'
import Loading from 'components/Loading'
import Input from 'components/Input'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import POLICY_OPTIONS from 'utils/types/policyOptions'

import useStyles from './styles'

const AddModal = ({ t, open, handleClose }) => {
  const {
    isDestinationGroupPosting,
    postDestinationGroup
  } = DestinationGroupsStore

  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId } = match

  const inputStore = useLocalStore(() => ({
    values: {
      name: '',
      policy: '',
      huntAfterNoAnswer: false,
      noAnswerNumberOfRings: ''
    },
    set(field, value) {
      this.values[field] = value
    },
    get isFieldsFilled() {
      const isRequiredFields =
        this.values.name && this.values.policy && !this.values.huntAfterNoAnswer

      const isOptionalFields =
        this.values.name &&
        this.values.policy &&
        this.values.huntAfterNoAnswer &&
        this.values.noAnswerNumberOfRings

      return isRequiredFields || isOptionalFields
    }
  }))

  const handleAdd = () => {
    const payload = {
      customerId,
      groupId,
      name: inputStore.values.name,
      policy: inputStore.values.policy,
      huntAfterNoAnswer: inputStore.values.huntAfterNoAnswer,
      closeModal: handleClose
    }
    if (inputStore.values.huntAfterNoAnswer) {
      payload.noAnswerNumberOfRings = inputStore.values.noAnswerNumberOfRings
    }
    postDestinationGroup(payload)
  }

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
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

      <DialogContent className={classes.modalContent}>
        {isDestinationGroupPosting ? (
          <Loading />
        ) : (
          <Box className={classes.inputsWrap}>
            <Input
              icon={<PermIdentityOutlined />}
              label={t('name')}
              variant='outlined'
              onChange={e => inputStore.set('name', e.target.value)}
            />
            <Select
              icon={<PolicyIcon />}
              options={POLICY_OPTIONS}
              label={t('policy')}
              onChange={e => inputStore.set('policy', e.target.value)}
            />
            <Box className={classes.noAnswerWrap}>
              <Checkbox
                value={inputStore.values.noAnswerNumberOfRings}
                onChange={e => {
                  inputStore.set('huntAfterNoAnswer', e.target.checked)
                }}
              />
              <Typography className={classes.noAnswerTitle}>
                {t('destination_groups_add_checkbox_title')}
              </Typography>
            </Box>

            {inputStore.values.huntAfterNoAnswer && (
              <Input
                icon={<PermIdentityOutlined />}
                label={t('amount_of_skip')}
                variant='outlined'
                onChange={e =>
                  inputStore.set('noAnswerNumberOfRings', e.target.value)
                }
              />
            )}
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
          disabled={!inputStore.isFieldsFilled}
          onClick={handleAdd}
        >
          {t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AddModal))
