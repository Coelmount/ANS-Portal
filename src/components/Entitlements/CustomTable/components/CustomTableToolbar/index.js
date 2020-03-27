import React from 'react'
import { withNamespaces } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Typography } from '@material-ui/core'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomTableToolbar = props => {
  const {
    classes,
    rowsPerPage,
    setRowsPerPage,
    setQuery,
    isFullVersion,
    t
  } = props

  const handleSearch = e => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }
  return (
    <div className={classes.toolbarWrap}>
      {isFullVersion && (
        <div className={classes.searchWrap}>
          <input
            className={classes.searchInput}
            placeholder={t('search_input_placeholder')}
            onChange={handleSearch}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
      )}
    </div>
  )
}

export default withNamespaces()(CustomTableToolbar)