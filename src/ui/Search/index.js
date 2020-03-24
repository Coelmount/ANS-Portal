import React, { useContext, useState, Fragment } from 'react'
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

const columnsArr = ['Customer ID', 'Subaccount ID', 'ANS instance']

const Search = observer(({ t }) => {
  const classes = useStyles()
  const { getSearchResult, searchResult, emptyResult, isLoading } = useContext(
    SearchStore
  )
  const [searchQuery, setSearchQuery] = useState('')
  console.log(searchResult, 'searchResult in comp')

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
            Please use the whole phone number for search
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
                          {column}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className={classes.bodyRow}>
                      <TableCell className={classes.bodyCell}>
                        {searchResult.tenantId}
                      </TableCell>
                      <TableCell align='left' className={classes.bodyCell}>
                        {searchResult.groupId}
                      </TableCell>
                      <TableCell className={classes.bodyCell}>
                        {searchQuery}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {emptyResult && (
              <Typography className={classes.noResultMessage}>
                No search result
              </Typography>
            )}
          </Fragment>
        )}
      </Paper>
    </Box>
  )
})

export default withNamespaces()(Search)
