import React, { useState, useEffect, Fragment } from 'react'
import { observer } from 'mobx-react'
import { withNamespaces } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'

import AssignedNumbersStore from 'stores/AssignedNumbers'
import SubaccountsStore from 'stores/Subaccounts'
import Loading from 'components/Loading'
import CustomTable from 'components/CustomTable'
import Checkbox from 'components/Checkbox'

import useStyles from './styles'

const AssignToSubaccountModal = ({ open, t, handleClose }) => {
  const classes = useStyles()
  const match = useParams()

  const [selectedSubaccount, setSelectedSubaccount] = useState(null)

  const [subaccountsList, setSubaccountsList] = useState([])
  // const [searchList, setSearchList] = useState([])
  const { getSubaccounts, rows, isLoadingSubaccounts } = SubaccountsStore
  const { postAssignToSubaccount, isPostAssignNumbers } = AssignedNumbersStore

  useEffect(() => {
    getSubaccounts(match.customerId)
  }, [getSubaccounts])

  useEffect(() => {
    setSubaccountsList(rows)
  }, [rows])

  const selectSubaccount = (checked, id) => {
    const newSelected = subaccountsList.map(item => {
      let result = {}
      if (item.id === id) {
        result = {
          ...item,
          checked: checked,
          hover: false
        }
        setSelectedSubaccount(result)
      } else {
        result = {
          ...item,
          checked: false,
          hover: false
        }
      }
      return result
    })
    setSubaccountsList(newSelected)
  }

  const changeHover = (newHover, id) => {
    const newSelected = [...subaccountsList]
    const index = subaccountsList.findIndex(el => el.id === id)
    newSelected[index].hover = newHover
    setSubaccountsList(newSelected)
  }

  const handleAsignButtonClick = () => {
    postAssignToSubaccount(match.customerId, selectedSubaccount, handleClose)
  }

  const columns = [
    {
      id: 'checkbox',
      label: <Checkbox checked={false} />,
      isSortAvailable: false,
      getCellData: (row, i) =>
        row.checked ? (
          <Checkbox
            checked={row.checked}
            className={classes.checkbox}
            onChange={() => selectSubaccount(!row.checked, row.id)}
          />
        ) : (
          <div
            className={classes.indexHoverCheckbox}
            onClick={() => selectSubaccount(!row.checked, row.id)}
            onMouseLeave={() => changeHover(false, row.id)}
            onMouseEnter={() => changeHover(true, row.id)}
          >
            {row.hover ? (
              <Checkbox
                checked={row.checked}
                className={classes.checkbox}
                onChange={() => selectSubaccount(true, row.id)}
              />
            ) : (
              i + 1
            )}
          </div>
        ),
      extraProps: {
        className: classes.checkboxCell
      },
      extraHeadProps: {
        className: classes.checkboxCell
      }
    },
    {
      id: 'groupId',
      label: 'ID'
    },
    {
      id: 'groupName',
      label: 'name'
    }
  ]

  return (
    <Dialog open={open} onClose={handleClose} className={classes.root}>
      <DialogTitle className={classes.title}>
        {t('assign_numbers_subaccount')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isPostAssignNumbers ? (
          <Loading />
        ) : (
          <Fragment>
            <Box className={classes.subtitle}>
              <Typography className={classes.subtitleText}>
                {t('select_subaccount')}
              </Typography>
            </Box>
            {isLoadingSubaccounts ? (
              <Loading />
            ) : (
              <CustomTable
                classes={classes}
                columns={columns}
                firstCell={false}
                showPagination={true}
                rows={subaccountsList}
                searchCriterias={['groupId', 'groupName']}
                // getSearchList={setSearchList}
                noAvailableDataMessage={t('no_subaccounts_available')}
                isModal={true}
              />
            )}
          </Fragment>
        )}
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          variant='outlined'
          color='primary'
          className={classes.cancelButton}
          onClick={handleClose}
        >
          {t('cancel')}
        </Button>
        <Button
          variant='contained'
          color='primary'
          className={classes.assignButton}
          onClick={handleAsignButtonClick}
          disabled={!subaccountsList.some(item => item.checked === true)}
        >
          {t('assign')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withNamespaces()(observer(AssignToSubaccountModal))
