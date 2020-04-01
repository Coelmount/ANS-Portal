import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

import SearchStore from 'stores/Search'

const columnsArr = ['customer_id', 'subaccount_id', 'ans_instance']

const Results = ({ classes, t }) => {
  const { searchResult, emptyResult, ansInstance } = SearchStore

  return (
    <Fragment>
      {searchResult && emptyResult === null && (
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                {columnsArr.map(column => (
                  <TableCell key={column} className={classes.headCell}>
                    {t(column)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow className={classes.bodyRow}>
                <TableCell className={classes.bodyCell}>
                  <Link
                    to={`/customers/${searchResult.tenantId}/access_numbers`}
                    className={classes.link}
                  >
                    {searchResult.tenantId}
                  </Link>
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  <Link
                    to={`/customers/${searchResult.tenantId}/subaccounts/${searchResult.groupId}/ans_instances`}
                    className={classes.link}
                  >
                    {searchResult.groupId}
                  </Link>
                </TableCell>
                <TableCell className={classes.bodyCell}>
                  <Link
                    to={`/customers/${searchResult.tenantId}/subaccounts/${searchResult.groupId}/ans_instances/basic/translations`}
                    className={classes.link}
                  >
                    {ansInstance}
                  </Link>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {emptyResult && (
        <Typography className={classes.noResultMessage}>
          {t('no_search_result')}
        </Typography>
      )}
    </Fragment>
  )
}

export default withNamespaces()(observer(Results))
