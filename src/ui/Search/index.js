import React, { useState, useEffect } from 'react'

import { withNamespaces } from 'react-i18next'
import { observer } from 'mobx-react'

import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import SearchIcon from '@material-ui/icons/Search'

import SearchStore from 'stores/Search'
import CustomContainer from 'components/CustomContainer'
import Results from './components/Results'
import Loading from 'components/Loading'

import useStyles from './styles'

const Search = ({ t }) => {
  const classes = useStyles()
  const { getSearchResult, isLoading, clearSearchResult } = SearchStore

  const [searchQuery, setSearchQuery] = useState(null)

  const handleSearchClick = () => {
    getSearchResult(searchQuery)
  }

  useEffect(() => clearSearchResult, [clearSearchResult])

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
          <Results classes={classes} searchQuery={searchQuery} />
        )}
      </Paper>
    </Box>
  )
}

export default withNamespaces()(observer(Search))
