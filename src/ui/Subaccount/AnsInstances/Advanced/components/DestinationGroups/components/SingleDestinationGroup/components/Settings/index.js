import React, { useEffect, Fragment } from 'react'
import classnames from 'classnames'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams, useHistory } from 'react-router-dom'

import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined'
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined'
import PolicyIcon from '@material-ui/icons/Policy'
import PhoneForwardedIcon from '@material-ui/icons/PhoneForwarded'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import SettingsStore from 'stores/DestinationGroups/Settings'
import Input from 'components/Input'
import Select from 'components/Select'
import Checkbox from 'components/Checkbox'
import Loading from 'components/Loading'
import POLICY_OPTIONS from 'utils/types/policyOptions'

import EditIcon from 'source/images/components/EditIcon'
import useStyles from './styles'

const Settings = ({ t }) => {
  const classes = useStyles()
  const match = useParams()
  const history = useHistory()
  const { customerId, groupId, destinationGroupName } = match

  const {
    getSettings,
    settings,
    isSettingsLoading,
    updateSettings,
    isSettingsUpdating
  } = SettingsStore
  const isLoading = isSettingsLoading || isSettingsUpdating

  const inputStore = useLocalStore(() => ({
    values: {
      isEditMode: false,
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

  const getRequest = () => {
    const payload = {
      customerId,
      groupId,
      destinationGroupName
    }
    getSettings(payload)
  }

  useEffect(() => {
    getRequest()
  }, [])

  useEffect(() => {
    const settingsKeys = settings ? Object.keys(settings) : []
    settingsKeys.forEach(key => {
      inputStore.set(key, settings[key])
    })

    if (settings && settings.policy)
      inputStore.set('policy', settings.policy.toLowerCase())
  }, [settings])

  const handleEditIconClick = () => {
    if (!inputStore.values.isEditMode) {
      inputStore.set('isEditMode', !inputStore.values.isEditMode)
    }
  }

  // Action buttons handlers  ------
  const handleCancelClick = () => {
    inputStore.set('isEditMode', false)
    getRequest()
  }

  const handleSaveButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      updatedSettings: inputStore.values
    }
    updateSettings(payload)
    inputStore.set('isEditMode', false)
    history.push(
      `/customers/${customerId}/subaccounts/${groupId}/ans_instances/advanced/destination_groups/${inputStore.values.name}#settings`
    )
  }
  // -----------

  return (
    <Box className={classes.wrap}>
      {isLoading ? (
        <Loading />
      ) : (
        <Fragment>
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
            value={inputStore.values.name}
            onChange={e => inputStore.set('name', e.target.value)}
            disabled={!inputStore.values.isEditMode}
          />
          <Select
            icon={<PolicyIcon />}
            options={POLICY_OPTIONS}
            label={t('policy')}
            value={inputStore.values.policy}
            onChange={e => inputStore.set('policy', e.target.value)}
            disabled={!inputStore.values.isEditMode}
          />
          <Box
            className={classnames(classes.noAnswerWrap, {
              [classes.disabledBlock]: !inputStore.values.isEditMode
            })}
          >
            <Checkbox
              checked={inputStore.values.huntAfterNoAnswer}
              onChange={e => {
                inputStore.set('huntAfterNoAnswer', e.target.checked)
              }}
              disabled={!inputStore.values.isEditMode}
            />
            <Typography className={classes.noAnswerTitle}>
              {t('destination_groups_add_checkbox_title')}
            </Typography>
          </Box>
          {inputStore.values.huntAfterNoAnswer && (
            <Box className={classes.amountSkipRingsWrap}>
              <span
                className={classnames(classes.amountSkipRingsLeftTitle, {
                  [classes.disabledBlock]: !inputStore.values.isEditMode
                })}
              >
                {t('skip_after')}
              </span>
              <Input
                icon={<PhoneForwardedIcon />}
                type='number'
                label={t('X')}
                variant='outlined'
                value={inputStore.values.amountSkipRings}
                onChange={e =>
                  inputStore.set('amountSkipRings', e.target.value)
                }
                disabled={!inputStore.values.isEditMode}
              />
              <span
                className={classnames(classes.amountSkipRingsRightTitle, {
                  [classes.disabledBlock]: !inputStore.values.isEditMode
                })}
              >
                {/* rings */}
                {t('rings')}
              </span>
            </Box>
          )}

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

              <Box
                className={`${classes.buttonBlock} ${classes.doneButtonBlock}`}
              >
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
                  onClick={handleSaveButtonClick}
                >
                  <DoneOutlinedIcon className={classes.assignIcon} />
                </IconButton>
                <Typography className={classes.buttonLabel}>
                  {t('save')}
                </Typography>
              </Box>
            </Box>
          )}
        </Fragment>
      )}
    </Box>
  )
}

export default withNamespaces()(observer(Settings))
