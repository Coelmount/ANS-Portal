import React, { useState, useEffect } from 'react'
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

import capitalize from 'lodash/capitalize'

import useStyles from './styles'

const SecondStep = props => {
  const { t, numbers, selectAll, fakePost } = props
  const classes = useStyles()
  const match = useParams()

  const columns = [
    {
      id: 'checkbox',
      label: (
        <Checkbox checked={props.selectAll} onChange={props.handleSelectAll} />
      ),
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={e => props.selectNumbers(!row.checked, row.number)}
          />
        ) : (
          <div
            className={classes.cursorPointer}
            onClick={e => props.selectNumbers(!row.checked, row.number)}
          >
            {i + 1}
          </div>
        ),
      extraHeadProps: {
        className: classes.checkboxCell
      },
      extraProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'number',
      label: 'Number',
      isSortAvailable: false,
      getCellData: row => row.number,
      extraProps: {
        className: classes.textLeft
      }
    }
  ]

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
        {/* <Box className={classes.slectGroupBox}>
          <div>{t('select_subaccount')}</div>
          <Box>
            <Select
              label={capitalize(t('subaccount'))}
              icon={<img src={Group3Person} alt='Group3Person' />}
              selectStyles={classes.select}
              wrapperStyles={classes.wrapper}
              options={selectGroups}
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
            />
          </Box>
        </Box> */}
        <Box className={classes.secondParagraphBox}>{match.numbersId}</Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          showSearchBar={false}
          showToolBar={false}
          rows={numbers}
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
          disabled={!numbers.filter(el => el.checked).length}
          onClick={() => fakePost()}
        >
          {`${t('add')} (${numbers.filter(el => el.checked).length})`}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
