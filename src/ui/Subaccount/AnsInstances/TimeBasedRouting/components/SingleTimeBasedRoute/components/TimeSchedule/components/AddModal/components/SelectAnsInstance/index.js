import React, { useState, useEffect, Fragment } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import PhoneInput from 'react-phone-input-2'

import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'

import TimeSchedulesStore from 'stores/TimeBasedRouting/TimeSchedules'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'
import SingleCheckCell from 'components/SingleCheckCell'
import ModalHelperText from 'components/ModalHelperText'
import {
  ADD_DESTINATION_DEFAULT_ID,
  EDIT_DESTINATION_ID
} from 'utils/types/addDestinationModalStepsId'

import useStyles from '../../searchModalsStyles'

const SelectAnsIntance = ({ t, handleClose }) => {
  const classes = useStyles()
  const match = useParams()
  const { customerId, groupId, tbrName } = match

  const {
    setStep,
    getAdvancedIntances,
    postTimeSchedule,
    putTimeSchedule,
    ansIntances,
    isEditMode,
    isAnsIntancesLoading,
    isTimeScheduleAdding,
    isTimeScheduleEditing
  } = TimeSchedulesStore

  const isLoading =
    isAnsIntancesLoading || isTimeScheduleAdding || isTimeScheduleEditing

  const localStore = useLocalStore(() => ({
    currentCheckedNumber: {
      id: null,
      destination: ''
    },
    setCurrentCheckedNumber(value) {
      this.currentCheckedNumber = value
    }
  }))
  const { currentCheckedNumber, setCurrentCheckedNumber } = localStore

  useEffect(() => {
    const payload = {
      customerId,
      groupId
    }
    getAdvancedIntances(payload)
  }, [])

  // Trigger store POST request
  const handleAddButtonClick = () => {
    const payload = {
      customerId,
      groupId,
      tbrId: tbrName,
      destination: currentCheckedNumber.destination,
      isPhoneNumberChanged: true,
      closeModal: handleClose
    }
    isEditMode ? putTimeSchedule(payload) : postTimeSchedule(payload)
  }

  // Back to first step
  const handleBackButtonClick = () => {
    isEditMode
      ? setStep(EDIT_DESTINATION_ID)
      : setStep(ADD_DESTINATION_DEFAULT_ID)
  }

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox className={classes.headCheckbox} checked={false} disabled />
      ),
      isSortAvailable: false,
      getCellData: (row, i) => (
        <SingleCheckCell
          key={i}
          row={row}
          i={i}
          classes={classes}
          checked={i === currentCheckedNumber.id}
          setCurrentCheckedNumber={setCurrentCheckedNumber}
        />
      ),
      extraHeadProps: {
        className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'name',
      label: 'name',
      extraProps: {
        className: classes.entitlementHeadCell
      }
    },
    {
      id: 'phoneNumber',
      label: 'phone_number',
      extraProps: {
        className: classes.entitlementHeadCell
      }
    }
  ]

  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : (
          <Fragment>
            <DialogTitle className={classes.title}>
              {t('select_ans_advanced_instance')}
              <IconButton
                aria-label='close'
                onClick={handleClose}
                className={classes.closeButton}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent className={classes.dialogContent}>
              <ModalHelperText helperText='select_ans_advanced_instance' />
              <CustomTable
                classes={classes}
                columns={columns}
                firstCell={false}
                showPagination={true}
                rows={ansIntances}
                searchCriterias={['name', 'phoneNumber']}
                noAvailableDataMessage={t('no_ans_advanced_instances_available')}
                isModal={true}
                tableId={'advanced_time_schedule_add_ans_instance'}
              />
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.backButton}
                onClick={handleBackButtonClick}
              >
                {t('cancel')}
              </Button>
              <Button
                variant='contained'
                color='primary'
                className={classes.nextButton}
                disabled={!currentCheckedNumber.destination}
                onClick={handleAddButtonClick}
              >
                {isEditMode ? t('save') : t('add')}
              </Button>
            </DialogActions>
          </Fragment>
        )}
    </Fragment>
  )
}

export default withNamespaces()(observer(SelectAnsIntance))