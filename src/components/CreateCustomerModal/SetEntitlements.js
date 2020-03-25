import React, { useContext, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import Checkbox from '@material-ui/core/Checkbox'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import CustomTable from './components/CustomTable'

import Input from 'components/Input'

import CreateCustomerStore from 'stores/CreateCustomer'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import setWith from 'lodash/setWith'

import useStyles from './styles'
import TableHeadWithCheckbox from './components/TableHeadWithCheckbox'
import TableBodyWithCheckbox from './components/TableBodyWithCheckbox'

const ENTITLEMENTS = [
  {
    id: 1,
    name: 'Angola - GEO - basic',
    total: 80
  },
  {
    id: 2,
    name: 'South Africa - GEO - ANS basic',
    total: 10
  },
  {
    id: 3,
    name: 'South Africa - GEO - ANS advanced',
    total: 3
  },
  {
    id: 4,
    name: 'Angola - GEO - basic',
    total: 80
  },
  {
    id: 5,
    name: 'South Africa - GEO - ANS basic',
    total: 10
  },
  {
    id: 6,
    name: 'South Africa - GEO - ANS advanced',
    total: 3
  }
]

const columns = [
  {
    id: 'name',
    label: 'Entitlement'
  }
]

const SetEntitlements = props => {
  const { handleClose, t, store } = props
  const classes = useStyles()
  const { changeStep, customer, changeCustomer } = useContext(store)
  const [entitlements, setEntitlements] = useState(ENTITLEMENTS)
  const [selected, setSelected] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [page, setPage] = React.useState(0)

  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = ENTITLEMENTS.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }
  return (
    <React.Fragment>
      <DialogTitle className={classes.title}>
        {t('set_entitlements')}
        <IconButton
          aria-label='close'
          onClick={handleClose}
          className={classes.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.entitlementsDialogContent}>
        {/* <TableContainer>
          <Table>
            <TableHeadWithCheckbox
              columns={columns}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBodyWithCheckbox
              rows={ENTITLEMENTS}
              page={page}
              rowsPerPage={rowsPerPage}
              handleClick={handleClick}
              isSelected={isSelected}
            />
          </Table>
        </TableContainer> */}
        <CustomTable
          classes={classes}
          rows={entitlements}
          // isLoadingData={isLoadingCustomers}
          columns={columns}
          id='tenantId'
          name='name'
        />
      </DialogContent>
      <DialogActions className={classes.dialogActionsSecond}>
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
          onClick={() => changeStep(5)}
        >
          {t('save')}
        </Button>
      </DialogActions>
    </React.Fragment>
  )
}

export default withNamespaces()(observer(SetEntitlements))
