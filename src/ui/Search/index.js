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
import ModalHelperText from 'components/ModalHelperText'

import useStyles from './styles'

const Search = ({ t }) => {
  const classes = useStyles()
  const { getSearchResult, isLoading, clearSearchResult } = SearchStore
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => clearSearchResult, [clearSearchResult])

  const handleSearchClick = () => {
    getSearchResult(searchQuery)
  }

  const handleSearchInputChange = e => {
    const value = e.target.value
    // Starts from + or number then only numbers
    const reg = /^[+]([\d-.\s()]*)$/

    if (value.length > 30) return
    if (reg.test(value) || value === '') {
      setSearchQuery(value)
    }
  }

  return (
    <Box className={classes.root}>
      <Paper className={classes.paper}>
        <div className={classes.containerWrap}>
          <CustomContainer>
            <Box className={classes.titleWrap}>
              <SearchIcon className={classes.titleSearchIcon} />
              <Typography className={classes.title} id='tableTitle'>
                {t('search')}
              </Typography>
            </Box>
            <div className={classes.helperTextWrap}>
              <ModalHelperText helperText='search' />
            </div>
          </CustomContainer>
        </div>
        <Box className={classes.mainWrap}>
          <Box className={classes.searchWrap}>
            <Box className={classes.searchContent}>
              <input
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder={t('search_input_placeholder')}
                className={classes.searchInput}
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
