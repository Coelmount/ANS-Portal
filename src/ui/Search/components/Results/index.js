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
import getAnsInstanceLink from 'utils/getAnsInstanceLink'

const columnsArr = ['customer_id', 'subaccount_id', 'ans_instance']

const Results = ({ classes, t }) => {
  const { searchResult, emptyResult, ansInstance } = SearchStore
  const { tenantId, groupId } = searchResult || {}
  const subaccountLevelUrl = `/customers/${tenantId}/subaccounts/${groupId}/ans_instances`
  const instanceUrl = getAnsInstanceLink(searchResult, ansInstance)

  const renderHeadCells = () =>
    columnsArr.map(column => (
      <TableCell key={column} className={classes.headCell}>
        {t(column)}
      </TableCell>
    ))

  const renderBodyCells = () => {
    const bodyCells = [
      {
        link: `/customers/${tenantId}/access_numbers`,
        text: tenantId
      },
      {
        link: subaccountLevelUrl,
        text: groupId
      },
      {
        link: `${subaccountLevelUrl}${instanceUrl}`,
        text: groupId ? ansInstance : ''
      }
    ]

    return bodyCells.map(({ link, text }, index) => (
      <TableCell key={`${text}${index}`} className={classes.bodyCell}>
        <Link to={link} className={classes.link}>
          {text}
        </Link>
      </TableCell>
    ))
  }

  return (
    <Fragment>
      {searchResult && emptyResult === null && (
        <TableContainer className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>{renderHeadCells()}</TableRow>
            </TableHead>

            <TableBody>
              <TableRow className={classes.bodyRow}>
                {renderBodyCells()}
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
