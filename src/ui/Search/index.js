import React, { useContext, useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

import SearchIcon from '@material-ui/icons/Search'

import SearchStore from 'stores/Search'
import CustomContainer from 'components/CustomContainer'
import Loading from 'components/Loading'

import useStyles from './styles'

const columnsArr = ['customer_id', 'subaccount_id', 'ans_instance']

const Search = observer(({ t }) => {
  const classes = useStyles()
  const {
    getSearchResult,
    searchResult,
    emptyResult,
    ansInstance,
    isLoading
  } = useContext(SearchStore)

  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchClick = () => {
    getSearchResult(searchQuery)
  }
  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <CustomContainer>
          <Box className={classes.titleWrap}>
            <SearchIcon className={classes.titleSearchIcon} />
            <Typography className={classes.title} id='tableTitle'>
              {t('search')}
            </Typography>
          </Box>
        </CustomContainer>
        <Box className={classes.mainWrap}>
          <Box className={classes.searchWrap}>
            <Box className={classes.searchContent}>
              <input
                className={classes.searchInput}
                placeholder={t('search_input_placeholder')}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Box
                className={classes.searchIconWrap}
                onClick={handleSearchClick}
              >
                <SearchIcon className={classes.searchIcon} />
              </Box>
            </Box>
          </Box>
          <Typography className={classes.alertMessage}>
            {t('please_use_the_whole_phone_number_for_search')}
          </Typography>
        </Box>
        {isLoading ? (
          <Loading />
        ) : (
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
                          to={`/customers/${searchResult.tenantId}/access-numbers`}
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
        )}
      </Paper>
    </Box>
  )
})

export default withNamespaces()(Search)
