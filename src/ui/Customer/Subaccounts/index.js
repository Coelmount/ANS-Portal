import React, { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { withRouter } from 'react-router'

import Table from '@material-ui/core/Table'
import TableContainer from '@material-ui/core/TableContainer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import CustomersStore from 'stores/Customers'
import CustomersTableToolbar from './components/CustomersTableToolbar'
import CustomersTableHead from './components/CustomersTableHead'
import CustomersTableBody from './components/CustomersTableBody'
import Pagination from './components/Pagination'
import { withNamespaces } from 'react-i18next'
import CustPhone from 'components/PhoneNumberInput'
import CheckBox from 'components/Checkbox'

import useStyles from './styles'

const Subaccounts = observer(({ t }) => {
  const classes = useStyles()
  const { rows, getCustomers } = useContext(CustomersStore)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('id')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [query, setQuery] = useState('')

  const list = query
    ? rows.filter(
        row =>
          row.tenantId.toLowerCase().includes(query) ||
          row.name.toLowerCase().includes(query)
      )
    : rows

  useEffect(() => {
    getCustomers()
  }, [getCustomers])

  useEffect(() => {
    const pages = Math.floor(list.length / rowsPerPage)
    setTotalPages(pages)
  }, [list.length, rowsPerPage])

  useEffect(() => {
    if (page > totalPages) setPage(0)
  }, [totalPages, page])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = action => {
    if (action === 'increase' && page < totalPages) {
      setPage(page + 1)
    } else if (action === 'decrease' && page > 0) {
      setPage(page - 1)
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box className={classes.titleWrap}>
          <Typography className={classes.title} id='tableTitle'>
            {'MTN ANS'}
          </Typography>
        </Box>
        {/* <CustomersTableToolbar
          classes={classes}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          setQuery={setQuery}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size={'medium'}
            aria-label='enhanced table'
          >
            <CustomersTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              page={page}
            />
            <CustomersTableBody
              classes={classes}
              rowsPerPage={rowsPerPage}
              rows={rows}
              page={page}
              order={order}
              orderBy={orderBy}
              list={list}
            />
          </Table>
        </TableContainer>
        <Pagination
          classes={classes}
          page={page}
          totalPages={totalPages}
          handleChangePage={handleChangePage}
        /> */}
      </Paper>
    </div>
  )
})

export default withNamespaces()(withRouter(Subaccounts))
