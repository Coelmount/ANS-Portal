import React from 'react'
import PropTypes from 'prop-types'
import { withNamespaces } from 'react-i18next'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import SearchIcon from '@material-ui/icons/Search'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Typography } from '@material-ui/core'

const rowsPerPageNumbers = [5, 10, 15, 25, 50, 100]

const CustomTableToolbar = (props) => {
  const {
    classes,
    rowsPerPage,
    setRowsPerPage,
    setQuery,
    t,
    showSearchBar,
    showPagination,
    extraToolbarBlock
  } = props

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setQuery(value)
  }

  return (
    <div className={classes.toolbarWrap}>
      {showSearchBar && (
        <div className={classes.searchWrap}>
          <input
            className={classes.searchInput}
            placeholder={t('search_input_placeholder')}
            onChange={handleSearch}
          />
          <SearchIcon className={classes.searchIcon} />
        </div>
      )}
      {extraToolbarBlock && extraToolbarBlock()}
      {showPagination && (
        <div className={classes.perPageWrap}>
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            IconComponent={ArrowDropDownIcon}
            className={classes.perPageSelect}
          >
            {rowsPerPageNumbers.map((number) => (
              <MenuItem value={number} key={`${number}`}>
                {number}
              </MenuItem>
            ))}
          </Select>
          <Typography className={classes.perPageText}>
            {t('per_page')}
          </Typography>
        </div>
      )}
    </div>
  )
}

CustomTableToolbar.propTypes = {
  showSearchBar: PropTypes.bool,
  showPagination: PropTypes.bool,
  extraToolbarBlock: PropTypes.func
}

CustomTableToolbar.defaultProps = {
  showSearchBar: true,
  showPagination: true,
  extraToolbarBlock: null
}

export default withNamespaces()(CustomTableToolbar)
