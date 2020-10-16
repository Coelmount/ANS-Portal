import React from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import Tooltip from '@material-ui/core/Tooltip'

import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'
import ModalHelperText from 'components/ModalHelperText'

import AssignedNumbersStore from 'stores/AssignedNumbers'

import useStyles from './styles'

const SecondStep = props => {
  const {
    t,
    numbers,
    selectAll,
    postAddNumbersToCustomer,
    handleSelectAll,
    selectNumbers,
    changeHover,
    maxRangeSize
  } = props

  const classes = useStyles()
  const { currentEntitlement } = AssignedNumbersStore

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={selectAll} onChange={handleSelectAll} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={e => props.selectNumbers(!row.checked, row.nsn)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectNumbers(!row.checked, row.nsn)}
            onMouseLeave={() => changeHover(false, row.nsn)}
            onMouseEnter={() => changeHover(true, row.nsn)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectNumbers(true, row.nsn)}
              />
            ) : (
              i + 1
            )}
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
      getCellData: row => `${row.country_code} ${row.nsn}`,
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
        <ModalHelperText helperText='select_numbers_inv_step_2' />
        <Box className={classes.secondParagraphBoxFN}>
          {currentEntitlement.name}
        </Box>
        <CustomTable
          classes={classes}
          columns={columns}
          firstCell={false}
          showPagination={false}
          showSearchBar={false}
          showToolBar={false}
          rows={numbers}
          noAvailableDataMessage={t('no_phone_numbers_available')}
          tableId={'access_item_add_numbers_second_step'}
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
        <Tooltip
          title={
            maxRangeSize < numbers.filter(el => el.checked).length
              ? t('out_of_range_amount_numbers_disabled_tooltip', {
                  maxRangeSize
                })
              : ''
          }
        >
          <div>
            <Button
              variant='contained'
              color='primary'
              className={classes.nextButton}
              disabled={
                !numbers.filter(el => el.checked).length ||
                maxRangeSize < numbers.filter(el => el.checked).length
              }
              onClick={() => postAddNumbersToCustomer()}
            >
              {`${t('add')} (${numbers.filter(el => el.checked).length})`}
            </Button>
          </div>
        </Tooltip>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SecondStep))
