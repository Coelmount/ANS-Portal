import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import classnames from 'classnames'

import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import PolicyIcon from '@material-ui/icons/Policy'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import Input from 'components/Input'
import Select from 'components/Select'
import POLICY_OPTIONS from '../../../../policyOptions'

import EditIcon from 'source/images/components/EditIcon'
import useStyles from './styles'

const Settings = ({ t }) => {
  const classes = useStyles()

  const inputStore = useLocalStore(() => ({
    values: {
      isEditMode: false,
      name: '',
      policy: ''
    },
    set(field, value) {
      this.values[field] = value
    },
    get isFieldsFilled() {
      return this.values.name && this.values.policy
    }
  }))

  const handleEditIconClick = () => {
    inputStore.set('isEditMode', !inputStore.values.isEditMode)
  }

  const handleCancelClick = () => {
    inputStore.set('isEditMode', false)
  }

  console.log(inputStore.values.isEditMode, 'inputStore.values.isEditMode')
  return (
    <Box className={classes.wrap}>
      <Box className={classes.contentTitleWrap}>
        <Typography className={classes.title}>{t('settings')}</Typography>
        <Box
          onClick={handleEditIconClick}
          className={classnames(classes.buttonIconsWrapper, {
            [classes.disabledButtonLabel]: inputStore.values.isEditMode
          })}
        >
          <EditIcon className={classes.icon} />
        </Box>
      </Box>
      <Input
        icon={<PermIdentityOutlined />}
        label={t('name')}
        variant='outlined'
        onChange={e => inputStore.set('name', e.target.value)}
        disabled={!inputStore.values.isEditMode}
      />
      <Select
        icon={<PolicyIcon />}
        options={POLICY_OPTIONS}
        label={t('policy')}
        onChange={e => inputStore.set('policy', e.target.value)}
        disabled={!inputStore.values.isEditMode}
      />

      {inputStore.values.isEditMode && (
        <Box className={classes.buttonsWrap}>
          <Box className={classes.buttonBlock}>
            <IconButton
              aria-label='cancel icon button'
              component='span'
              onClick={handleCancelClick}
              className={classnames(
                classes.buttonIconWrap,
                classes.cancelButtonWrap
              )}
            >
              <CloseOutlinedIcon className={classes.cancelIcon} />
            </IconButton>
            <Typography className={classes.buttonLabel}>
              {t('cancel')}
            </Typography>
          </Box>

          <Box className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}>
            <IconButton
              aria-label='save icon button'
              component='span'
              className={classnames(
                classes.buttonIconWrap,
                classes.asignButtonWrap,
                {
                  [classes.disabledButton]: !inputStore.isFieldsFilled
                }
              )}
              // onClick={handleSaveButtonClick}
            >
              <DoneOutlinedIcon className={classes.assignIcon} />
            </IconButton>
            <Typography className={classes.buttonLabel}>{t('save')}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default withNamespaces()(observer(Settings))
