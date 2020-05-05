import React, { useContext, useState, useEffect } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from 'components/Input'
import Select from 'components/Select'
import CustomTable from 'components/CustomTable'
import Loading from 'components/Loading'
import Checkbox from 'components/Checkbox'

import Group3Person from 'source/images/svg/Group3Person.svg'

import SubaccountsStore from 'stores/Subaccounts'
import NumbersStore from 'stores/Numbers'
import AssignedNumbersStore from 'stores/AssignedNumbers'

import capitalize from 'lodash/capitalize'

import useStyles from './styles'

const SecondStep = props => {
  const { t, addedNumbers, postAssignNumbersToSubaccaunt } = props
  const {
    getSubaccounts,
    selectGroups,
    isLoadingSubaccounts
  } = SubaccountsStore
  const { currentEntitlement } = AssignedNumbersStore

  const classes = useStyles()
  const match = useParams()

  useEffect(() => {
    getSubaccounts(match.customerId)
  }, [])

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox
          checked={props.selectAllAddedNumbers}
          onChange={props.handleSelectAll}
        />
      ),
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={e => props.selectNumbers(!row.checked, row.phoneNumber)}
          />
        ) : (
          <div
            className={classes.cursorPointer}
            onClick={e => props.selectNumbers(!row.checked, row.phoneNumber)}
          >
            {i + 1}
          </div>
        ),
      extraHeadProps: {
        className: classes.checkboxCellFNHead
      },
      extraProps: {
        className: classes.checkboxCellFN
      }
    },
    {
      id: 'number',
      label: 'Number',
      isSortAvailable: false,
      getCellData: row => row.phoneNumber,
      extraProps: {
        className: classes.textLeft
      }
    }
  ]

  if (isLoadingSubaccounts) {
    return <Loading />
  }

  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('select_numbers_inv')}
        <IconButton
          aria-label='close'
          onClick={props.handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        <Box className={classes.secondParagraphBox}>
          <div>{t('select_subaccount')}</div>
          <Box>
            <Select
              label={capitalize(t('subaccount'))}
              icon={<img src={Group3Person} alt='Group3Person' />}
              selectStyles={classes.select}
              wrapperStyles={classes.wrapper}
              options={selectGroups}
              value={props.selectedGroup}
              onChange={e => props.setSelectedGroup(e.target.value)}
            />
          </Box>
        </Box>
        <Box className={classes.secondParagraphBox}>
          {currentEntitlement.name}
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          showSearchBar={false}
          showToolBar={false}
          rows={addedNumbers}
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.backButton}
          onClick={props.handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.nextButton}
          disabled={
            !addedNumbers.filter(el => el.checked).length ||
            !props.selectedGroup
          }
          onClick={postAssignNumbersToSubaccaunt}
        >
          {`${t('add')} (${addedNumbers.filter(el => el.checked).length})`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
